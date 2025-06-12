import { parseNested, toNested } from "@/lib/nested";
import { useToast } from "@/service/toast";
import type { FormErrors, FormValue, FormValues } from "@/types/form";
import {
  FormProps as HeroUIFormProps,
  Form as HeroUIForm,
} from "@heroui/react";
import { ValidationError } from "next/dist/compiled/amphtml-validator";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Validation = () => void;
export type Validations = Record<string, Validation>;
export type Getter = () => FormValue | FormValue[] | undefined;
export type Getters = Record<string, Getter>;

export interface FormProps extends HeroUIFormProps {
  children?: React.ReactNode;
  initialData?: FormValues;
  onSubmit?: (values: FormValues) => void;
}

export interface FormProviderProps {
  formId: string;
  values?: FormValues;
  errors: FormErrors;
  setError: (address: string, error: ValidationError) => void;
}

const FormProvider = createContext<FormProviderProps | undefined>(undefined);

export const Form: React.FC<FormProps> = ({
  id,
  children,
  onSubmit,
  initialData,
  validationErrors,
  ...props
}) => {
  const toast = useToast();
  const [formId, setFormId] = useState("");
  useEffect(() => {
    if (id) {
      setFormId(id);
      return;
    }
    setFormId(`form-${Math.random().toString(36).substring(2, 9)}`);
  }, [id]);

  const [values, setValues] = useState<FormValues>(
    parseNested(initialData ?? {})
  );

  const [errors, setErrors] = useState<FormErrors>(validationErrors ?? {});

  const notifyError = useCallback(() => {
    if (Object.keys(errors).length > 0) {
      toast.error({
        description: "Please fix the errors in the form.",
      });
    }
  }, [errors, toast]);

  const setError = useCallback((address: string, error?: ValidationError) => {
    setErrors((prevErrors: FormErrors) => {
      const newErrors = { ...prevErrors };
      if (error === undefined) {
        delete newErrors[address];
      } else {
        newErrors[address] = error;
      }
      return newErrors;
    });
  }, []);

  const onSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasErrors = Object.keys(errors).length > 0;
    if (!hasErrors) {
      const formData = Object.fromEntries(new FormData(event.currentTarget));
      const nestedData = {
        ...toNested({ ...formData, ...values }),
      };

      onSubmit?.(nestedData);
      return;
    }
    notifyError();
  };

  useEffect(() => {
    if (validationErrors) {
      setErrors(validationErrors);
    }
  }, [validationErrors]);

  useEffect(() => {
    if (initialData) {
      setValues(parseNested(initialData));
    }
  }, [initialData]);

  return (
    <>
      <FormProvider.Provider
        value={{
          formId,
          errors,
          values,
          setError,
        }}
      >
        <HeroUIForm
          onSubmit={onSubmitHandle}
          onInvalid={() => {
            notifyError();
          }}
          validationErrors={errors}
          {...props}
          id={formId}
        >
          {children}
        </HeroUIForm>
      </FormProvider.Provider>
    </>
  );
};

export const useForm = (): FormProviderProps | undefined => {
  return useContext(FormProvider);
};
