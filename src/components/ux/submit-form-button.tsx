import { cn } from "@heroui/react";
import { Button, ButtonProps } from "../button";

export const SubmitFormButton: React.FC<ButtonProps> = ({
  className,
  children,
  confirmActionInfo,
  ...props
}) => {
  return (
    <Button
      className={cn("justify-self-end px-16", className)}
      color="primary"
      type="submit"
      confirmAction
      confirmActionInfo={{
        actionConfirmButtonColor: "primary",
        ...confirmActionInfo,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
