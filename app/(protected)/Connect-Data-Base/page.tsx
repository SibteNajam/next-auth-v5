"use client";
import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "../Dashboard/dashboard.css";
const ConnectDataBase = () => {
  const [inputText, setInputText] = useState("");
  const [generatedSQL, setGeneratedSQL] = useState("");

  return (
    <>
      <Card className="card">
        <h1 className="animated-header">Lets Connect to Database</h1>

        {/* Input for text */}
        <Form.Group className="input-container">
          <Form.Control
            type="text"
            placeholder="Enter your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="text-input"
          />
          <Button className="generate-button">Connect</Button>
        </Form.Group>

        {/* Display Generated SQL */}
        <Card className="output-box">
          <Card.Body>
            <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
              {generatedSQL ||
                `CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Position VARCHAR(50),
    Salary DECIMAL(10, 2)
);

INSERT INTO Employees (EmployeeID, FirstName, LastName, Position, Salary) 
VALUES (1, 'John', 'Doe', 'Manager', 75000.00),
       (2, 'Jane', 'Smith', 'Developer', 65000.00),
       (3, 'Sam', 'Brown', 'Designer', 60000.00);

SELECT * FROM Employees WHERE Salary > 60000;

UPDATE Employees SET Salary = 80000 WHERE EmployeeID = 1;

DELETE FROM Employees WHERE EmployeeID = 3;
INSERT INTO Employees (EmployeeID, FirstName, LastName, Position, Salary) 
VALUES (1, 'John', 'Doe', 'Manager', 75000.00),
       (2, 'Jane', 'Smith', 'Developer', 65000.00),
       (3, 'Sam', 'Brown', 'Designer', 60000.00);

SELECT * FROM Employees WHERE Salary > 60000;

UPDATE Employees SET Salary = 80000 WHERE EmployeeID = 1;

DELETE FROM Employees WHERE EmployeeID = 3;`}
            </pre>
          </Card.Body>
        </Card>
      </Card>
      ;
    </>
  );
};
export default ConnectDataBase;
