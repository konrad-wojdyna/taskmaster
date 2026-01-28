import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { AlertCircle } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectRowProps {
  labelText: string;
  value: string;
  onChange: (value: string) => void;
  name: string;
  required?: boolean;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const SelectRow = ({
  labelText,
  value,
  onChange,
  name,
  required = false,
  error,
  options,
  placeholder = "Select an option",
}: SelectRowProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {labelText}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select value={value} onValueChange={onChange} name={name}>
        <SelectTrigger
          className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && (
        <div className="flex items-center gap-1 text-sm text-red-600">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
export default SelectRow;
