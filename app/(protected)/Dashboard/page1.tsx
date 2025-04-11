"use client";
import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import "./dashboard.css";
import ChartComponent from "../_components/Chart";

const DashBoard = () => {
  const [inputText, setInputText] = useState("");
  const [generatedSQL, setGeneratedSQL] = useState("");

  return (
    <Card className="card">
      <Row>
        {/* First Column */}
        <Col md={6} className="col1">
          <h1 className="header">
            <span>TEXT TO SQL</span>
          </h1>
          <Form.Group className="db-input-container">
            <Form.Control
              type="text"
              placeholder="Enter your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="text-input"
            />
            <Button className="generate-button">Generate SQL</Button>
          </Form.Group>

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
        </Col>

        {/* Second Column for Chart */}
        <Col md={6} className="mb-3">
          <div className="chart-placeholder">
            <ChartComponent />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default DashBoard;
