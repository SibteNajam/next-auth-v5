"use client";
import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import "./dashboard.css";

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
          <Form.Group className="input-container">
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
              {generatedSQL || "Generated SQL will appear here..."}
            </Card.Body>
          </Card>
        </Col>

        {/* Second Column for Chart */}
        <Col md={6} className="mb-3">
          <div className="chart-placeholder">
            <h5 className="text-center">Chart Integration Here</h5>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default DashBoard;
