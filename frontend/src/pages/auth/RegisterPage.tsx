import AuthTitle from "@/components/auth/AuthTitle";
import AuthTab from "@/components/auth/AuthTab";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { InputRow } from "@/components/common";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import type { RegisterCredentials } from "@/types/auth";
import { useState } from "react";
import { validatePassword } from "@/validation/passwordRules";
import PasswordRequirements from "@/components/auth/PasswordRequirements";

const RegisterPage = () => {
  const { register, isLoading, error } = useAuth();
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useForm<RegisterCredentials>(
      {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      {
        password: (pasword) => {
          if (!pasword) return "Password is required";
          if (!validatePassword(pasword))
            return "Password does not meet requirements";
          return null;
        },
      },
      (formData) => register(formData),
    );

  return (
    <section className="flex flex-col items-center mt-5">
      <div className="w-[90%] max-w-100">
        <AuthTitle />
        <AuthTab activePage="Register" />
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <InputRow
            name="username"
            inputType="text"
            labelText="Username"
            placeholderText="johndoe"
            value={values.username}
            onChange={handleChange}
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <InputRow
              name="firstName"
              inputType="text"
              labelText="First Name"
              placeholderText="John"
              value={values.firstName}
              onChange={handleChange}
              required
            />
            <InputRow
              name="lastName"
              inputType="text"
              labelText="Last Name"
              placeholderText="Doe"
              value={values.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <InputRow
            name="email"
            inputType="email"
            labelText="Email"
            placeholderText="john@example.com"
            value={values.email}
            onChange={handleChange}
            required
          />
          <InputRow
            name="password"
            inputType="password"
            labelText="Password"
            placeholderText="********"
            value={values.password}
            onFocus={() => setShowPasswordRequirements(true)}
            onChange={handleChange}
            onBlur={(e) => {
              handleBlur(e);

              if (!validatePassword(values.password)) {
                setShowPasswordRequirements(true);
              } else {
                setShowPasswordRequirements(false);
              }
            }}
            error={touched.password ? errors.password : undefined}
            required
          />
          <PasswordRequirements
            password={values.password}
            show={showPasswordRequirements}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="mt-5 p-5 bg-blue-700 text-white text-lg hover:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
        <div className="flex items-center justify-center gap-2 mt-2">
          <p>Already have an account?</p>
          <Link
            to={"/login"}
            className="text-blue-700 font-bold hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
};
export default RegisterPage;
