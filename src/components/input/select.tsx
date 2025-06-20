"use client";

import {
  SelectProps as HeroUISelectProps,
  Select as HeroUISelect,
  SelectItem as HeroUISelectItem,
  cn,
} from "@heroui/react";
import { Options } from "@/types/options";
import { useApp } from "@/contexts/app-context";
import { useForm } from "../form/form";
import { useCallback } from "react";

export type SelectProps = {
  children?: HeroUISelectProps["children"];
  options?: Options;
} & Omit<HeroUISelectProps, "children">;

export const Select: React.FC<SelectProps> = ({
  name,
  className,
  options,
  disabled,
  children,
  multiple,
  ...props
}) => {
  const { query } = useApp();
  const form = useForm();

  const getFieldValue = useCallback((): Set<string> => {
    if (!name) return new Set();
    let valueStr = undefined;
    if (form && form.values[name] != null) {
      valueStr = String(form.values[name]);
    } else {
      valueStr = String(query[name] ?? "");
    }
    return new Set<string>(valueStr.split(","));
  }, [name, query, form]);

  return (
    <HeroUISelect
      name={name}
      classNames={{
        base: "relative max-h-10",
        label: "top-6 !-translate-y-[3.10em] text-foreground",
        helperWrapper: "absolute -bottom-[20px] -left-0.5 max-w-full",
        errorMessage: "truncate",
        listbox: "!transition-colors !duration-100 ",
        listboxWrapper: "!transition-colors !duration-100",
      }}
      defaultSelectedKeys={getFieldValue()}
      labelPlacement="outside"
      variant="bordered"
      selectionMode={multiple ? "multiple" : "single"}
      onSelectionChange={(keys) => {
        if (!name) return;
        form?.setValue(name, Array.from(keys).join(","));
      }}
      className={cn(
        "text-gray-700 dark:text-gray-200 transition-colors duration-100 select",
        className,
        disabled && "opacity-50 pointer-events-none"
      )}
      {...props}
    >
      {options
        ? options.map((option) => (
            <HeroUISelectItem
              key={option.value}
              textValue={option.label}
              description={option.description}
            >
              {option.label}
            </HeroUISelectItem>
          ))
        : children ?? null}
    </HeroUISelect>
  );
};

export const SelectItem = HeroUISelectItem;
