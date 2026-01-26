import { useState, type ChangeEvent, type FormEvent } from "react";

type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => string | null;
};

type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export const useForm = <T extends object>(
  initialValues: T,
  validationRules: ValidationRules<T>,
  onSubmit: (values: T) => void,
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<{ [K in keyof T]?: boolean }>({});

  const validateField = (name: keyof T, value: T[keyof T]): string | null => {
    const validator = validationRules[name];
    if (!validator) return null;
    return validator(value);
  };

  const validateAll = (): boolean => {
    const newErrors: ValidationErrors<T> = {};
    let isValid = true;

    for (const name in values) {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: ChangeEvent<FormElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof T;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[fieldName]) {
      const error = validateField(fieldName, value as T[keyof T]);
      setErrors((prev) => ({
        ...prev,
        [name]: error || undefined,
      }));
    }
  };

  const handleBlur = (e: ChangeEvent<FormElement>) => {
    const { name } = e.target;
    const fieldName = name as keyof T;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(fieldName, values[fieldName]);
    setErrors((prev) => ({
      ...prev,
      [name]: error || undefined,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {},
    );
    setTouched(allTouched);

    if (!validateAll()) {
      return;
    }

    onSubmit(values);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    reset,
  };
};
