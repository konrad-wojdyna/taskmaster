import { Link } from "react-router";
import { cn } from "@/lib/utils";

type ActivePage = "Login" | "Register";

interface AuthTabType {
  activePage: ActivePage;
}

const AuthTab = ({ activePage }: AuthTabType) => {
  return (
    <div className="flex w-[80%] justify-center mx-auto mt-5 bg-gray-200 rounded-lg">
      <Link
        to={"/login"}
        className={cn(
          "flex-1 m-2 cursor-pointer text-center font-bold text-blue-600 rounded-lg p-2",
          activePage === "Login" && "bg-white",
        )}
      >
        Login
      </Link>
      <Link
        to={"/register"}
        className={cn(
          "flex-1 m-2 cursor-pointer text-center font-bold text-blue-600 rounded-lg p-2",
          activePage === "Register" && "bg-white",
        )}
      >
        Register
      </Link>
    </div>
  );
};
export default AuthTab;
