import type React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { AlertCircle } from "lucide-react";

interface TextareaRowProps {
  labelText: string;
  placeholderText?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  required?: boolean;
  error?: string;
  rows?: number;
  maxLength?: number;
}

const TextareaRow = ({
  labelText,
  placeholderText,
  value,
  onChange,
  onBlur,
  name,
  required = false,
  error,
  rows = 4,
  maxLength,
}: TextareaRowProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>
        {labelText}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Textarea
        id={name}
        name={name}
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
      />
      {maxLength && (
        <small className="text-gray-500 text-right">
          {value.length}/{maxLength}
        </small>
      )}
      {error && (
        <div className="flex items-center gap-1 text-sm text-red-600">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
export default TextareaRow;
