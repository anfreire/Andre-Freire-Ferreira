import React, { useEffect, useCallback, useState } from "react";
import { FieldErrors } from "react-hook-form";
import { ExchangeFormData } from ".";

interface ErrorToastProps {
	errors: FieldErrors<ExchangeFormData>;
}

const getErrorMessage = (errors: FieldErrors<ExchangeFormData>) => {
	if (errors.from?.currency) return "Invalid currency";
	if (errors.to?.currency) return "Invalid currency";
	if (errors.from?.amount) return "Invalid amount";
	return null;
};

const ErrorToast = ({ errors }: ErrorToastProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		const newErrorMessage = getErrorMessage(errors);
		if (newErrorMessage) {
			setErrorMessage(newErrorMessage);
			setIsVisible(true);
			const timer = setTimeout(() => setIsVisible(false), 5000);
			return () => clearTimeout(timer);
		}
	}, [errors.from, errors.to]);

	return (
		<div
			className="fixed transition-opacity duration-300 ease-in-out bottom-4 right-4 toast"
			style={{ opacity: isVisible ? 1 : 0 }}
		>
			<div className="flex items-center p-4 alert alert-error">
				<span>{errorMessage}</span>
			</div>
		</div>
	);
};

export default ErrorToast;
