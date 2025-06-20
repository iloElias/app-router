"use client";
import {
  cn,
  Button as HeroUIButton,
  ButtonProps as HeroUIButtonProps,
  PressEvent,
  useDisclosure,
} from "@heroui/react";
import ConfirmActionModal, {
  ConfirmActionModalMessages,
} from "./ux/confirm-action-modal";
import { useForm } from "./form/form";

export interface ButtonProps extends HeroUIButtonProps {
  confirmAction?: boolean;
  confirmActionInfo?: ConfirmActionModalMessages;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type,
  confirmAction = false,
  confirmActionInfo,
  disabled,
  disableAnimation,
  onPress,
  ...props
}: ButtonProps) => {
  const form = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const newProps = confirmAction
    ? {
        type: "button",
        onPress: onOpen,
      }
    : { onPress };

  return (
    <>
      {confirmAction && (
        <ConfirmActionModal
          isOpen={isOpen}
          onClose={onClose}
          onClick={(e: PressEvent) => {
            onPress?.(e);
            if (type === "submit") {
              if (form) {
                const formElement = document.querySelector(
                  `#${form.formId}`
                ) as HTMLFormElement | null;
                formElement?.requestSubmit();
                return;
              }
              document.querySelector("form")?.requestSubmit();
            }
          }}
          {...confirmActionInfo}
        />
      )}
      <HeroUIButton
        {...props}
        {...newProps}
        disabled={disabled}
        className={cn(
          className,
          disabled && "opacity-80 cursor-not-allowed"
        )}
        disableAnimation={disableAnimation || disabled}
        type={confirmAction ? "button" : type}
        data-type={type}
      >
        {children}
      </HeroUIButton>
    </>
  );
};
