"use client";
import {
  Autocomplete as HeroUIAutocomplete,
  AutocompleteProps as HeroUIAutocompleteProps,
  AutocompleteItem as HeroUIAutocompleteItem,
  cn,
} from "@heroui/react";
import { Option, Options } from "@/types/options";
import { useAsyncList } from "@react-stately/data";
import { useApp } from "@/contexts/app-context";
import { useCallback } from "react";
import { useForm } from "../form/form";

export type AutocompleteProps = {
  options?: Options;
  children?: HeroUIAutocompleteProps["children"];
} & Omit<HeroUIAutocompleteProps, "items" | "children" | "inputValue">;

export const Autocomplete: React.FC<AutocompleteProps> = ({
  name,
  options,
  className,
  required,
  isRequired,
  ...props
}) => {
  const { query } = useApp();
  const form = useForm();
  const isFieldRequired = required ?? isRequired ?? false;

  const list = useAsyncList<Option>({
    load: async ({ filterText }) => {
      if (!filterText) {
        return { items: options ?? [] };
      }
      return {
        items:
          options?.filter(
            (item) =>
              item.label.toLowerCase().includes(filterText.toLowerCase()) ||
              (item.description &&
                item.description
                  .toLowerCase()
                  .includes(filterText.toLowerCase()))
          ) ?? [],
      };
    },
  });

  const getFieldValue = useCallback(() => {
    if (!name) return new Set();
    if (form && form.values[name]) {
      return new Set([form.values[name]]);
    }
    return new Set([query[name]]);
  }, [name, query, form]);

  return (
    <HeroUIAutocomplete
      labelPlacement="outside"
      variant="bordered"
      isLoading={list.isLoading}
      inputValue={list.filterText}
      items={list.items}
      onInputChange={list.setFilterText}
      onSelectionChange={(key) => {
        if (!name) return;
        form?.setValue(name, key);
      }}
      classNames={{
        base: "relative max-h-10 mb-6",
        listbox: "!transition-colors !duration-100",
        listboxWrapper: "!transition-colors !duration-100",
      }}
      defaultSelectedKey={Array.from(getFieldValue())[0]}
      className={cn(
        "text-gray-700 dark:text-gray-200 transition-colors duration-100 autocomplete",
        className
      )}
      isRequired={isFieldRequired}
      {...props}
    >
      {(item) => {
        const opt = item as Option;
        return (
          <HeroUIAutocompleteItem key={opt.value} description={opt.description}>
            {opt.label}
          </HeroUIAutocompleteItem>
        );
      }}
    </HeroUIAutocomplete>
  );
};

export const AutocompleteItem = HeroUIAutocompleteItem;
