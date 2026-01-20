import AuthTitle from "@/components/auth/AuthTitle";
import AuthTab from "@/components/auth/AuthTab";
import { Button } from "@/components/ui/button";
import { Square, CheckSquare } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { InputRow } from "@/components/common";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import type { LoginCredentails } from "@/types/auth";

const LoginPage = () => {
  const [isRememberMeSelected, setIsRememberMeSelected] = useState(false);

  const { isLoading, error, login } = useAuth();

  const { values, handleChange, handleSubmit } = useForm<LoginCredentails>(
    {
      usernameOrEmail: "",
      password: "",
    },
    (formData) => login(formData),
  );

  return (
    <section className="flex flex-col items-center mt-5">
      <div className="w-[90%] max-w-100">
        <AuthTitle />
        <AuthTab activePage="Login" />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <InputRow
            name="usernameOrEmail"
            inputType="text"
            labelText="Email or Username"
            placeholderText="john@example.com or johndoe"
            value={values.usernameOrEmail}
            onChange={handleChange}
            required
          />
          <InputRow
            name="password"
            inputType="password"
            labelText="Password"
            placeholderText="********"
            value={values.password}
            onChange={handleChange}
            required
          />
          <div className="flex justify-between mt-2">
            <div className="flex items-center gap-2">
              {!isRememberMeSelected ? (
                <Square
                  size={20}
                  onClick={() => setIsRememberMeSelected(true)}
                  className="cursor-pointer"
                />
              ) : (
                <CheckSquare
                  size={20}
                  onClick={() => setIsRememberMeSelected(false)}
                  className="cursor-pointer"
                />
              )}
              <span>Remember me</span>
            </div>
            <p className="cursor-pointer hover:text-blue-800">
              Forgot password?
            </p>
          </div>
          <Button
            type="submit"
            className="mt-5 p-5 bg-blue-700 text-white text-lg hover:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="flex items-center justify-center gap-2 mt-2">
          <p>Don't have an account?</p>
          <Link
            to={"/register"}
            className="text-blue-700 font-bold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
};
export default LoginPage;
