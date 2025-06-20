import { useApp } from "@/contexts/app-context";
import {
  InputOtpProps as HeroUIInputOptProps,
  InputOtp as HeroUIInputOtp,
} from "@heroui/react";
import { useForm } from "../form/form";
import { useCallback } from "react";

export interface InputOtpProps extends HeroUIInputOptProps {
  length: number;
  queryCollectable?: boolean;
}

export const InputOtp: React.FC<InputOtpProps> = ({
  name,
  queryCollectable = false,
  ...props
}) => {
  const { query } = useApp();
  const form = useForm();

  const getFieldValue = useCallback(() => {
    if (!name) return "";
    if (form && form.values[name]) {
      return String(form.values[name]);
    }
    const value = query[name];
    return String(value ?? "");
  }, [name, query, form]);

  return (
    <HeroUIInputOtp
      name={name}
      defaultValue={getFieldValue()}
      classNames={{
        input: "w-12 h-12 text-center text-2xl",
        helperWrapper:
          "absolute min-w-max -bottom-[12px] -translate-x-1/2 left-1/2 flex justify-center text-danger text-tiny text-start truncate",
      }}
      {...props}
      data-query-collectable={queryCollectable ? "true" : "false"}
    />
  );
};
