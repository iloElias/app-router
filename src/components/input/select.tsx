"use client";

import {
  SelectProps as HeroUISelectProps,
  Select as HeroUISelect,
  SelectItem as HeroUISelectItem,
  cn,
} from "@heroui/react";
import { Options } from "@/types/options";
import { useField } from "@/hooks/use-field";

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
  onSelectionChange,
  ...props
}) => {
  const field = useField<SelectProps["selectedKeys"]>({
    id: props.id,
    name,
    value: props.selectedKeys,
    onChange: (value) => {
      onSelectionChange?.(new Set(value));
    },
    ignoreForm: !name,
    error: props.errorMessage,
  });

  return (
    <HeroUISelect
      classNames={{
        base: "relative max-h-10",
        label: "top-6 !-translate-y-[3.10em] text-foreground",
        helperWrapper: "absolute -bottom-[20px] -left-0.5 max-w-full",
        errorMessage: "truncate",
        listbox: "!transition-colors !duration-100 ",
        listboxWrapper: "!transition-colors !duration-100",
      }}
      labelPlacement="outside"
      variant="bordered"
      selectionMode={multiple ? "multiple" : "single"}
      className={cn(
        "text-gray-700 dark:text-gray-200 transition-colors duration-100 select",
        className,
        disabled && "opacity-50 pointer-events-none"
      )}
      {...props}
      id={field.id}
      name={field.name}
      // selectedKeys={new Set(field.value)}
      // onSelectionChange={field.onChange}
      errorMessage={field.error}
      // onBlur={field.onBlur}
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
