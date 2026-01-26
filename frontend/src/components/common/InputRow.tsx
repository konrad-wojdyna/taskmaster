import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputRowProps {
  labelText: string;
  inputType: string;
  placeholderText?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  required?: boolean;
  error?: string;
}

const InputRow = ({
  labelText,
  inputType = "text",
  placeholderText,
  value,
  onChange,
  onBlur,
  onFocus,
  name,
  required = false,
  error,
}: InputRowProps) => {
  return (
    <div className="flex flex-col p-2">
      <Label className="mb-1 text-lg" htmlFor={name}>
        {labelText}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={inputType}
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        required={required}
        className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
      />
      {error && (
        <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
export default InputRow;
