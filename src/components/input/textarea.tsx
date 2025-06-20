"use client";
import {
  TextAreaProps as HeroUITextAreaProps,
  Textarea as HeroUITextarea,
  cn,
} from "@heroui/react";

export interface TextAreaProps extends HeroUITextAreaProps {
  taggableVisibility?: boolean;
}

export const Textarea: React.FC<TextAreaProps> = ({
  className,
  disabled,
  ...props
}) => {
  return (
    <HeroUITextarea
      classNames={{
        base: "!relative",
        label: "!translate-y-[4.5px] start-0 text-foreground",
        helperWrapper: "!absolute !-bottom-[20px] !-left-0.5 max-w-full",
        errorMessage: "!truncate",
        input: "!transition-colors !duration-100",
        inputWrapper: "!transition-colors !duration-100",
      }}
      labelPlacement="outside"
      variant="bordered"
      className={cn(
        "text-gray-700 dark:text-gray-200 transition-colors duration-100",
        className,
        disabled && "opacity-50 pointer-events-none"
      )}
      {...props}
      disabled={disabled}
    />
  );
};
