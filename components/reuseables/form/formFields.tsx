"use client";
import React, { ChangeEvent } from "react";
import { Input } from "@nextui-org/react";

import { cn } from "@/lib";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  type: string;
  id: string;
  variant: string;
  isInvalid: boolean;
  errorMessage: string;
  size?: "sm" | "md" | "lg" | undefined;
  startcnt?: React.ReactNode | string;
  placeholder: string;
  reqValue?: string;
  value?: any | "";
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
  radius?: "none" | "lg" | "sm" | "md" | "full" | undefined;
  readonly?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  type,
  id,
  isInvalid,
  errorMessage,
  placeholder,
  startcnt,
  onChange,
  reqValue,
  required,
  radius,
  className,
  size,
  readonly,
  value,
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label className={cn("mb-0.5 text-sm", className)} htmlFor={htmlFor}>
        {label} <sup className="text-danger">{reqValue}</sup>
      </Label>
      <Input
        classNames={{
          input: [
            cn("appearance-none focus:outline-none user-select-none text-sm"),
          ],
          inputWrapper: [
            "data-[hover=true]:border-primary data-[has-start-content=true]:ps-3 group-data-[focus=true]:border-primary user-select-none",
          ],
          innerWrapper: ["px-2 data-[has-start-content=true]:ps-3"],
        }}
        id={id}
        isInvalid={isInvalid}
        isRequired={required}
        placeholder={placeholder}
        radius={radius}
        readOnly={readonly}
        size={size || "lg"}
        startContent={startcnt}
        type={type}
        value={value}
        variant="bordered"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
      {isInvalid && <div className="text-red-500 text-xs">{errorMessage}</div>}
    </div>
  );
};

export default FormField;
