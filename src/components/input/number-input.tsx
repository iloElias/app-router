"use client";
import { useApp } from "@/contexts/app-context";
import {
  cn,
  NumberInputProps as HeroUINumberInputProps,
  NumberInput as HeroUINumberInput,
} from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "../form/form";

export interface NumberInputProps extends HeroUINumberInputProps {
  className?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  name,
  className,
  disabled,
  onValueChange,
  ...props
}) => {
  const { query } = useApp();
  const form = useForm();

  const [inputValue, setInputValue] = useState<number>();

  const getFieldValue = useCallback(() => {
    if (!name) return undefined;
    if (form && form.values[name]) {
      return Number(form.values[name]);
    }
    const value = query[name];
    return Number(value ?? undefined);
  }, [name, query, form]);

  useEffect(() => {
    setInputValue(getFieldValue());
  }, [getFieldValue]);

  return (
    <HeroUINumberInput
      classNames={{
        base: "!relative",
        label: "!top-6 !-translate-y-[3.25em] start-0",
        helperWrapper: "!absolute !-bottom-[24px] !-left-0.5 max-w-full",
        errorMessage: "!truncate",
        input: "!transition-colors !duration-100",
        inputWrapper: "!transition-colors !duration-100 shadow-xs",
      }}
      value={inputValue}
      onValueChange={(value) => {
        setInputValue(value);
        if (onValueChange) {
          onValueChange(value);
        }
        if (name && form) {
          form.setValue(name, value);
        }
      }}
      labelPlacement="outside"
      variant="bordered"
      className={cn(
        "text-gray-700 dark:text-gray-200 transition-colors duration-100",
        className,
        disabled && "opacity-50 pointer-events-none"
      )}
      {...props}
      disabled={disabled}
    />
  );
};
