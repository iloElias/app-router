"use client";
import React from "react";
import {
  cn,
  DatePicker as HeroUIDatePicker,
  DatePickerProps as HeroUIDatePickerProps,
} from "@heroui/react";

export type DatePickerValue = HeroUIDatePickerProps["value"];

export interface DatePickerProps extends HeroUIDatePickerProps {
  required?: boolean;
  label?: string;
  queryCollectable?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  className,
  queryCollectable = false,
  ...props
}) => {
  return (
    <HeroUIDatePicker
      className={cn("w-full max-h-10", className)}
      classNames={{
        base: "relative gap-1 !pb-0",
        label: "top-6 !translate-y-[0.30em] w-max pr-2",
        helperWrapper: "absolute -bottom-[20px] -left-0.5 min-w-max p-0",
        input: "!transition-colors !duration-100 ",
        inputWrapper: "!transition-colors !duration-100",
        selectorButton: "rounded-lg left-0.5",
      }}
      labelPlacement="outside"
      variant="bordered"
      {...props}
      data-query-collectable={queryCollectable ? "true" : "false"}
    />
  );
};
