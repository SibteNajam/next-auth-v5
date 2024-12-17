"use client";
import React, { useState } from "react";
import { Card, Button, Form, Nav } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ConnectDBR } from "@/resolver/ConnectDataBaseResolver";
import "./styles.css";
interface IFormInput {
  hostname: string;
  username: string;
  password: string;
  portnumber: string;
}

const ConnectDataBase = () => {
  const steps = [
    { id: 1, label: "Configure Settings" },
    { id: 2, label: "Select DataBase" },
    { id: 3, label: "Review & Finish" },
  ];
  const [currentStep, setCurrentStep] = useState(1);
  // State to track the completion of each step

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
  const goToNextStep = () => {
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
  return (
    <>
      <Card className="cd-card">
        <h1>Lets Connect to Database</h1>
        <Nav variant="tabs" activeKey={currentStep}>
          {steps.map((step) => (
            <Nav.Item key={step.id}>
              <Nav.Link eventKey={step.id} disabled={currentStep !== step.id}>
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
                    {...register("hostname")}
                  />
                  {errors.hostname && (
                    <div className="invalid-feedback">
                      {errors.hostname.message}
                    </div>
                  )}
                </Form.Group>

                {/* Username Input */}
                <Form.Group className="input-container">
                  <Form.Control
                    className="text-input"
                    type="text"
                    placeholder="Enter username"
                    {...register("username")}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">
                      {errors.username.message}
                    </div>
                  )}
                </Form.Group>
                <Form.Group className="input-container">
                  <Form.Control
                    className="text-input"
                    type="text"
                    placeholder="Port Number"
                    {...register("portnumber")}
                  />
                  {errors.portnumber && (
                    <div className="invalid-feedback">
                      {errors.portnumber.message}
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
                    as="select"
                    className="text-input"
                    // {...register("database")}
                  >
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
              </div>
            )}
            {currentStep === 3 && (
              <div className="mt-3">
                <h4>Review & Finish</h4>
                <p>Review your entries and finish the process.</p>
                {generatedSQL && (
                  <div className="mt-3">Generated SQL: {generatedSQL}</div>
                )}
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
