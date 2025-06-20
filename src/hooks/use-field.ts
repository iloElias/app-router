"use client";
import { useForm } from "@/components/form/form";
import { ValidationError } from "next/dist/compiled/amphtml-validator";
import { useEffect, useId, useState, useCallback } from "react";

export interface UseFieldOptions<T> {
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  ignoreForm?: boolean;
  getFromQuery?: boolean;
  validate?: (value: T) => boolean | string | Promise<boolean | string>;
  parse?: (value: T) => T;
  format?: (value: T) => T;
  getFromQueryFn?: () => T;
}

export interface UseFieldProps<T> {
  id?: string;
  name?: string;
  value?: T;
  onChange?: (newValue: T) => void;
  error?: ValidationError | undefined;
  options?: UseFieldOptions<T>;
}

export const useField = <T = string>({
  id,
  name,
  value,
  onChange,
  error,
  options,
}: UseFieldProps<T>) => {
  const reactId = useId();

  const {
    disabled,
    required,
    readOnly,
    ignoreForm,
    getFromQuery,
    validate,
    parse,
    format,
    getFromQueryFn,
  } = {
    disabled: false,
    required: false,
    readOnly: false,
    ignoreForm: false,
    getFromQuery: false,
    validate: () => true,
    parse: (value: T) => value,
    format: (value: T) => value,
    getFromQueryFn: undefined,
    ...options,
  };

  const form = useForm();
  const [inputValue, setInputValue] = useState<T>(value || ("" as T));
  const [inputError, setInputError] = useState<ValidationError | undefined>(error);
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  const handleChange = useCallback(
    (newValue: T) => {
      if (disabled || readOnly) {
        return;
      }
      if (validate && !validate(newValue)) {
        console.error(`Validation failed for field ${name}:`, newValue);
        return;
      }
      if (parse) {
        newValue = parse(newValue);
      }
      if (format) {
        newValue = format(newValue);
      }
      if (newValue === inputValue) {
        return;
      }
      setInputValue(newValue);
      onChange?.(newValue);
    },
    [disabled, readOnly, validate, parse, format, inputValue, onChange, name]
  );

  const getValueFromQuery = useCallback(() => {
    if (hasMounted) {
      setHasMounted(true);
      return;
    }
    if (getFromQueryFn) {
      return getFromQueryFn();
    }
    if (typeof window !== "undefined" && name) {
      const urlParams = new URLSearchParams(window.location.search);
      const queryValue = urlParams.get(name);
      return queryValue !== null ? (queryValue as T) : undefined;
    }
    return undefined;
  }, [getFromQueryFn, name, hasMounted]);

  useEffect(() => {
    if (getFromQuery) {
      const queryValue = getValueFromQuery();
      if (queryValue !== undefined && queryValue !== inputValue) {
        setInputValue(queryValue);
      }
    }
  }, [getFromQuery, getValueFromQuery, inputValue]);

  useEffect(() => {
    if (form && !ignoreForm) {
      const formValue = form.values[name || reactId];
      if (formValue !== undefined || formValue !== inputValue) {
        setInputValue(formValue);
      }
    }
  }, [form, ignoreForm, name, reactId, inputValue]);

  useEffect(() => {
    if (form && !ignoreForm) {
      const formError = form.errors[name || reactId];
      if (formError !== undefined && formError !== inputError) {
        setInputError(formError);
      }
    }
  }, [form, ignoreForm, name, reactId, inputError]);

  return {
    id: id || reactId,
    name: name,
    value: inputValue,
    onChange: handleChange,
    error: inputError,
    options: {
      disabled: disabled,
      required: required,
      readOnly: readOnly,
      ignoreForm: ignoreForm,
      getFromQuery: getFromQuery,
      validate: validate,
      parse: parse,
      format: format,
      getFromQueryFn: getFromQueryFn,
    },
  };
};
