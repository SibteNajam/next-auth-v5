import { NextResponse } from "next/server";
import { Client } from "pg";

// Connect to the database using provided credentials.
async function connectToDb(
  host: string,
  user: string,
  password: string,
  dbname: string = "postgres"
): Promise<Client> {
  const client = new Client({
    host,
    user,
    password,
    database: dbname,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  return client;
}

// Fetch the list of databases.
async function fetchDatabases(client: Client): Promise<string[]> {
  const res = await client.query(
    "SELECT datname FROM pg_database WHERE datistemplate = false;"
  );
  return res.rows.map((row) => row.datname);
}

// Fetch schema information from the connected database.
async function fetchSchema(client: Client): Promise<Record<string, string[]>> {
  const query = `
    SELECT table_name, column_name, data_type, is_nullable, column_default
    FROM information_schema.columns
    WHERE table_schema = 'public'
    ORDER BY table_name, ordinal_position;
  `;
  const res = await client.query(query);
  const schema: Record<string, string[]> = {};
  for (const row of res.rows) {
    const { table_name, column_name, data_type, is_nullable, column_default } =
      row;
    const colInfo =
      `${column_name} ${data_type}` +
      (is_nullable === "NO" ? " NOT NULL" : "") +
      (column_default ? ` DEFAULT ${column_default}` : "");
    if (!schema[table_name]) {
      schema[table_name] = [];
    }
    schema[table_name].push(colInfo);
  }
  return schema;
}

// Generate a schema prompt from the fetched schema.
function generateSchemaPrompt(schemaData: Record<string, string[]>): string {
  let prompt = "The SQL database schema includes the following tables:\n\n";
  for (const table in schemaData) {
    prompt += `**${table}**: Contains the following columns:\n`;
    for (const column of schemaData[table]) {
      prompt += `- ${column}\n`;
    }
    prompt += "\n";
  }
  prompt += `Instructions:
- Generate only valid SQL commands.
- Do not include backticks (\`), sql, or any extra text.
- The output should be plain SQL ready to execute in the provided schema.
- Be careful about case sensitivity.
- If there is no table or attribute in the database, return: "Your database schema does not contain the table or attribute you are looking for."`;
  return prompt;
}

// Call the Google Gemini API to generate SQL from the natural language question.
async function getGeminiResponse(
  question: string,
  prompt: string
): Promise<string> {
  const apiKey = process.env.GOOGLE_API_KEY;
  console.log("Google API Key:", apiKey);

  // Concatenate the schema prompt and the user's question.
  const fullPrompt = `${prompt}\n${question}`;

  // Build the payload using the structure required by Gemini.
  const payload = {
    contents: [
      {
        parts: [
          {
            text: fullPrompt,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 256,
      topP: 0.95,
      topK: 40,
    },
  };

  // Use the v1beta endpoint and pass the API key as a query parameter.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Gemini API error response:", errorData);
    throw new Error(`Gemini API request failed: ${JSON.stringify(errorData)}`);
  }
  const data = await response.json();
  // Return the generated SQL. Adjust this extraction based on Gemini's actual response.
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
}

// Execute the generated SQL query.
async function executeQuery(
  client: Client,
  sqlQuery: string
): Promise<
  { rows: any[]; fields: string[] } | { command: string; rowCount: number }
> {
  try {
    const res = await client.query(sqlQuery);
    if (res.command === "SELECT") {
      const fields = res.fields.map((field) => field.name);
      return { rows: res.rows, fields };
    } else {
      return { command: res.command, rowCount: res.rowCount };
    }
  } catch (error: any) {
    throw new Error(`Query execution failed: ${error.message}`);
  }
}

// Main API route handler.
export async function POST(req: Request) {
  let client;
  try {
    const body = await req.json();
    const { action } = body;
    if (!action) {
      return NextResponse.json(
        { error: "Missing action in request body" },
        { status: 400 }
      );
    }

    // Common DB connection parameters.
    const host = body.host;
    const user = body.user;
    const password = body.password;
    const dbname = body.dbname || "postgres";

    if (!host || !user || !password) {
      return NextResponse.json(
        { error: "Missing database connection parameters" },
        { status: 400 }
      );
    }

    if (action === "list_databases") {
      client = await connectToDb(host, user, password, "postgres");
      const databases = await fetchDatabases(client);
      return NextResponse.json({ databases });
    } else if (action === "fetch_schema") {
      if (!body.dbname) {
        return NextResponse.json(
          { error: "Missing dbname for fetch_schema action" },
          { status: 400 }
        );
      }
      client = await connectToDb(host, user, password, dbname);
      const schemaData = await fetchSchema(client);
      return NextResponse.json({ schema: schemaData });
    } else if (action === "ask_question") {
      const { question } = body;
      if (!question || !body.dbname) {
        return NextResponse.json(
          { error: "Missing question or dbname for ask_question action" },
          { status: 400 }
        );
      }
      client = await connectToDb(host, user, password, dbname);
      const schemaData = await fetchSchema(client);
      const schemaPrompt = generateSchemaPrompt(schemaData);
      const generatedSQL = await getGeminiResponse(question, schemaPrompt);
      const result = await executeQuery(client, generatedSQL.trim());
      return NextResponse.json({ generatedSQL, result });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Error in /api/askdb:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (client) {
      await client.end();
    }
  }
}
