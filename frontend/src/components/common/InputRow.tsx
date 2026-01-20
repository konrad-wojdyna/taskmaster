import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputRowType {
  labelText: string;
  inputType: string;
  placeholderText?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  required?: boolean;
}

const InputRow = ({
  labelText,
  inputType = "text",
  placeholderText,
  value,
  onChange,
  name,
  required = false,
}: InputRowType) => {
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
        required={required}
      />
    </div>
  );
};
export default InputRow;
