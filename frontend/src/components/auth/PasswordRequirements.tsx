import { passwordRequirements } from "@/validation/passwordRules";
import { Check, X } from "lucide-react";

interface PasswordRequirementsProps {
  password: string;
  show: boolean;
}

const PasswordRequirements = ({
  password,
  show,
}: PasswordRequirementsProps) => {
  if (!show) return;

  return (
    <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-sm font-medium text-gray-700 mb-2">
        Password must contain:
      </p>
      <ul className="space-y-1">
        {passwordRequirements.map((requirement) => {
          const isValid = requirement.validator(password);
          return (
            <li
              key={requirement.id}
              className={`flex items-center gap-2 text-sm
                                ${isValid ? "text-green-600" : "text-red-600"}`}
            >
              {isValid ? (
                <Check size={16} className="shrink-0" />
              ) : (
                <X size={16} className="shrink-0" />
              )}
              <span>{requirement.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default PasswordRequirements;
