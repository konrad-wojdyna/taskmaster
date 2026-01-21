import { useState, type ChangeEvent, type FormEvent } from "react";

export const useForm = <T extends object>(
  initialValues: T,
  onSubmit: (values: T) => void,
) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const reset = () => {
    setValues(initialValues);
  };

  return { values, handleChange, handleSubmit, reset };
};
