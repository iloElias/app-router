"use client";
import {
  InputProps as HeroUIInputProps,
  Input as HeroUIInput,
  cn,
} from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PasswordVisibilityToggle } from "../ux/password-visibility-toggle";
import { useForm } from "../form/form";
import { useApp } from "@/contexts/app-context";

export interface InputProps extends HeroUIInputProps {
  taggableVisibility?: boolean;
}

export const Input: React.FC<InputProps> = ({
  name,
  className,
  taggableVisibility,
  isDisabled,
  onValueChange,
  ...props
}) => {
  const { query } = useApp();
  const form = useForm();

  const ref = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState<string>();

  const [isPassVisible, setIsPassVisible] = useState(false);
  const togglePassVisibility = () => setIsPassVisible((prev) => !prev);

  const getFieldValue = useCallback(() => {
    if (!name) return "";
    if (form && form.values[name]) {
      return String(form.values[name]);
    }
    const value = query[name];
    return String(value ?? "");
  }, [name, query, form]);

  useEffect(() => {
    setInputValue(getFieldValue());
  }, [getFieldValue]);

  return (
    <HeroUIInput
      ref={ref}
      name={name}
      classNames={{
        base: "!relative",
        label: "!top-6 !-translate-y-[3.25em] start-0 text-foreground",
        helperWrapper: "!absolute !-bottom-[20px] !-left-0.5 max-w-full",
        errorMessage: "!truncate",
        input: "!transition-colors !duration-100",
        inputWrapper: "!transition-colors !duration-100",
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
        isDisabled && "opacity-50 pointer-events-none"
      )}
      endContent={
        taggableVisibility &&
        props.type === "password" && (
          <PasswordVisibilityToggle
            isPassVisible={isPassVisible}
            togglePassVisibility={() => {
              ref.current?.focus();
              togglePassVisibility();
            }}
          />
        )
      }
      {...props}
      type={isPassVisible ? "text" : props.type}
      disabled={isDisabled}
      isDisabled={isDisabled}
    />
  );
};
