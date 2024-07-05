"use client";
import React, { useState, ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@nextui-org/react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib";

interface PasswordInputProps {
  PasswordText: string;
  placheolderText: string;
  passwordError: string | null;
  handlePasswordChange: (value: string) => void;
  required?: boolean;
  className?: string;
  radius?: "none" | "lg" | "sm" | "md" | "full" | undefined;
  size?: "lg" | "sm" | "md" | undefined;

  isInvalid: boolean;
  errorMessage: string;
  value?: string;
}

const PasswordField: React.FC<PasswordInputProps> = ({
  passwordError,
  handlePasswordChange,
  PasswordText,
  placheolderText,
  required,
  className,
  radius,
  size,

  isInvalid,
  errorMessage,
  value,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex flex-col space-y">
      <Label className="mb-0.5" htmlFor={PasswordText}>
        {PasswordText}
      </Label>
      <Input
        className={cn(
          "w-full py-2 hover:bg-transparent focus:outline-none bg-transparent",
          className
        )}
        classNames={{
          input: [
            cn("appearance-none focus:outline-none user-select-none text-sm"),
          ],
          inputWrapper: [
            "data-[hover=true]:border-primary data-[has-start-content=true]:ps-3 group-data-[focus=true]:border-primary user-select-none",
          ],
          innerWrapper: ["px-2 data-[has-start-content=true]:ps-3"],
        }}
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
        isInvalid={!!passwordError}
        placeholder={placheolderText}
        radius={radius}
        required={required}
        size={size || "lg"}
        type={isVisible ? "text" : "password"}
        value={value}
        variant="bordered"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handlePasswordChange(e.target.value)
        }
      />
      {isInvalid && <div className="text-red-500">{errorMessage}</div>}
    </div>
  );
};

export default PasswordField;
