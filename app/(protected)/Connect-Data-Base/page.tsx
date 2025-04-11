"use client";
import React, { useState } from "react";
import { Card, Button, Form, Nav } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ConnectDBR } from "@/resolver/ConnectDataBaseResolver";
import "./styles.css";
interface IFormInput {
  host: string;
  user: string;
  password: string;
}
interface QueryResult {
  rows?: any[];
  fields?: string[];
}
const ConnectDataBase = () => {
  const [host, setHost] = useState(
    "ep-withered-rain-a595ly2w.us-east-2.aws.neon.tech"
  );
  const [user, setUser] = useState("fyptest_owner");
  const [password, setPassword] = useState("7sAdmzHq1xJp");
  const [databases, setDatabases] = useState<string[]>([]);
  const [selectedDb, setSelectedDb] = useState<string>("");
  const [schema, setSchema] = useState<any>(null);
  const [question, setQuestion] = useState("");

  const [queryResult, setQueryResult] = useState<
    QueryResult | { command: string; rowCount: number } | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const steps = [
    { id: 1, label: "Configure Settings" },
    { id: 2, label: "Select DataBase" },
    { id: 3, label: "Review & Finish" },
  ];
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(ConnectDBR),
  });

  const [generatedSQL, setGeneratedSQL] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("Form Data:", data);
    // goToNextStep();
  };
  const goToNextStep = async () => {
    if (currentStep === 1) {
      const isValid = await handleSubmit(async () => {
        await listDatabases(); // Call API to list databases
        setCurrentStep((prev) => prev + 1); // Move to next step after fetching
      })();
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Function to handle going to the previous step
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const listDatabases = async () => {
    try {
      const res = await fetch("/api/askdb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "list_databases",
          host,
          user,
          password,
        }),
      });
      const data = await res.json();
      if (res.ok) setDatabases(data.databases);
      else setError(data.error);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchSchema = async () => {
    setError("");
    if (!selectedDb) return setError("Please select a database.");
    try {
      const res = await fetch("/api/askdb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "fetch_schema",
          host,
          user,
          password,
          dbname: selectedDb,
        }),
      });
      const data = await res.json();
      if (res.ok) setSchema(data.schema);
      else setError(data.error);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const askQuestion = async () => {
    setError("");
    setGeneratedSQL("");
    setQueryResult(null);
    if (!question || !selectedDb)
      return setError("Please enter a question and select a database.");
    setLoading(true);
    try {
      const res = await fetch("/api/askdb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "ask_question",
          host,
          user,
          password,
          dbname: selectedDb,
          question,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setGeneratedSQL(data.generatedSQL);
        setQueryResult(data.result);
        console.log("datadsssssssss", data);
      } else setError(data.error);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };
  return (
    <>
      <Card className="cd-card">
        <h1>Lets Connect to Database</h1>
        <Nav variant="tabs" activeKey={currentStep}>
          {steps.map((step) => (
            <Nav.Item key={step.id}>
              <Nav.Link
                eventKey={step.id}
                disabled={currentStep !== step.id}
                className={currentStep === step.id ? "active-tab" : ""}
              >
                {step.label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Form onSubmit={handleSubmit(onSubmit)} className="Form">
          {/* Host Name Input */}

          <div className="form-inputs">
            {currentStep === 1 && (
              <>
                <Form.Group className="input-container">
                  <Form.Control
                    className="text-input"
                    type="text"
                    placeholder="Enter host name"
                    {...register("host")}
                  />
                  {errors.host && (
                    <div className="invalid-feedback">
                      {errors.host.message}
                    </div>
                  )}
                </Form.Group>

                {/* Username Input */}
                <Form.Group className="input-container">
                  <Form.Control
                    className="text-input"
                    type="text"
                    placeholder="Enter username"
                    {...register("user")}
                  />
                  {errors.user && (
                    <div className="invalid-feedback">
                      {errors.user.message}
                    </div>
                  )}
                </Form.Group>
                {/* Password Input */}
                <Form.Group className="input-container">
                  <Form.Control
                    className="text-input"
                    type="password"
                    placeholder="Enter password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="invalid-feedback">
                      {errors.password.message}
                    </p>
                  )}
                </Form.Group>
              </>
            )}
            {currentStep === 2 && (
              <div className="mt-3">
                <Form.Group className="input-container">
                  <Form.Label>Select Database</Form.Label>
                  <Form.Control
                    value={selectedDb}
                    onChange={(e) => setSelectedDb(e.target.value)}
                    as="select"
                    className="text-input"
                    // {...register("database")}
                  >
                    {databases.map((db) => (
                      <option key={db} value={db}>
                        {db}
                      </option>
                    ))}
                    <option value="">-- Select Database --</option>
                    <option value="retailshop">retail shop</option>
                    <option value="HMS">HMS</option>
                    <option value="database1">database1</option>
                    <option value="LMS">LMS</option>
                  </Form.Control>
                  {/* {errors.database && (
                    <div className="invalid-feedback">
                      {errors.database.message}
                    </div>
                  )} */}
                </Form.Group>
                <button
                  onClick={fetchSchema}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                  Fetch Schema
                </button>
                {schema && (
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                      Database Schema
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(schema).map(([table, attributes]) => (
                        <div
                          key={table}
                          className="bg-gray-50 p-4 rounded-lg shadow"
                        >
                          <h3 className="text-lg font-semibold text-blue-600">
                            {table}
                          </h3>
                          <ul className="list-disc pl-5 text-gray-700">
                            {attributes.map((attr: string, index: number) => (
                              <li key={index}>{attr}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {currentStep === 3 && (
              <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter your question..."
                  className="w-full border rounded-lg py-3 px-4 focus:ring focus:border-blue-400"
                />
                <button
                  onClick={askQuestion}
                  disabled={loading}
                  className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
                >
                  {loading ? "Processing..." : "Ask"}
                </button>
                {/* <button
                  onClick={() => setShowGraph(!showGraph)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
                >
                  {showGraph ? "Hide Graph" : "Show Graph"}
                </button> */}
              </div>
            )}

            {/* Submit Button */}
            {/* Navigation Buttons */}
            <div className="d-flex justify-content-end mt-4">
              {currentStep !== 1 && (
                <Button
                  type="button"
                  className="form-btn"
                  onClick={goToPreviousStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
              )}
              {currentStep < steps.length ? (
                <Button
                  type="button"
                  className="form-btn"
                  onClick={goToNextStep}
                >
                  Next
                </Button>
              ) : (
                <Button type="submit" className="form-btn">
                  Finish
                </Button>
              )}
            </div>
          </div>
        </Form>
        {/* Display Generated SQL (or form data, for now) */}
      </Card>
    </>
  );
};

export default ConnectDataBase;
