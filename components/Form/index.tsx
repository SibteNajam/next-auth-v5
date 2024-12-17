import React from "react";
import { Form as BootstrapForm } from "react-bootstrap";
import { UseFormReturn, FieldValues, SubmitHandler } from "react-hook-form";

interface FormProps {
  useFormReturn: UseFormReturn<FieldValues>;
  onSubmit: SubmitHandler<FieldValues>;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Form: React.FC<FormProps> = ({
  useFormReturn,
  onSubmit,
  children,
  className,
  id,
}) => {
  const { handleSubmit } = useFormReturn;

  return (
    <BootstrapForm
      id={id}
      onSubmit={handleSubmit(onSubmit)}
      className={className}
    >
      {children}
    </BootstrapForm>
  );
};

Form.displayName = "Form";

interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  placeholder,
  required,
}) => {
  return (
    <BootstrapForm.Group className="mb-3">
      <BootstrapForm.Label>{label}</BootstrapForm.Label>
      <BootstrapForm.Control
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </BootstrapForm.Group>
  );
};

Input.displayName = "Input";

export default Form;
