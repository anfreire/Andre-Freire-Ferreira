import { ExchangeFormData } from "@/types/exchangeForm";
import { useEffect, useMemo, useState } from "react";
import { FieldErrors } from "react-hook-form";

interface ErrorToastProps {
  errors: FieldErrors<ExchangeFormData>;
  clearErrors: () => void;
}

const ErrorToast = (props: ErrorToastProps) => {
  const opacity = useMemo(
    () => (Object.keys(props.errors).length === 0 ? 0 : 1),
    [props.errors]
  );

  console.log(props.errors);

  return (
    <div
      className="toast transition-opacity duration-300 ease-in-out"
      style={{ opacity: opacity }}
    >
      <div className="alert alert-error">
        <span>New message arrived.</span>
      </div>
    </div>
  );
};

ErrorToast.displayName = "ErrorToast";

export default ErrorToast;
