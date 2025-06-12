import { addToast } from "@heroui/react";

interface ToastParams {
  title?: string;
  description: string;
}

interface Toast {
  success: (params: ToastParams) => void;
  error: (params: ToastParams) => void;
  warning: (params: ToastParams) => void;
  info: (params: ToastParams) => void;
}

export const useToast = (): Toast => {
  const success = ({ title, description }: ToastParams) => {
    addToast({
      title: title || "Success",
      description,
      color: "success",
    });
  };

  const error = ({ title, description }: ToastParams) => {
    addToast({
      title: title || "Error",
      description,
      color: "danger",
    });
  };

  const warning = ({ title, description }: ToastParams) => {
    addToast({
      title: title || "Warning",
      description,
      color: "warning",
    });
  };

  const info = ({ title, description }: ToastParams) => {
    addToast({
      title: title || "Info",
      description,
      color: "secondary",
    });
  };

  return { success, error, warning, info };
};
