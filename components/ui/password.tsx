import { Input } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { MutableRefObject, useRef, useState } from "react";

export default function Password({
  password,
  setPassword,
  className,
  label,
  name,
  d_ref,
  required,

  readOnly,
  disabled,
}: {
  password?: string | undefined;
  setPassword: (value: string) => void;
  className?: string;
  label?: string;
  name: string;
  d_ref?: MutableRefObject<HTMLInputElement>;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
}) {
  const fallbackRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      ref={d_ref || fallbackRef}
      className={className}
      disabled={disabled}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeOff className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <Eye className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      label={label}
      labelPlacement={"outside"}
      name={name}
      placeholder=" "
      radius="sm"
      readOnly={readOnly}
      required={required}
      size="lg"
      type={isVisible ? "text" : "password"}
      value={password || ""}
      variant="bordered"
      onChange={(e) => {
        setPassword(e.currentTarget.value);
      }}
    />
  );
}
