import { useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";
import { ExchangeFormData } from ".";

interface ErrorToastProps {
	errors: FieldErrors<ExchangeFormData>;
}

const ErrorToast = ({ errors }: ErrorToastProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	console.log(errors);
	useEffect(() => {
		const newErrorMessage = getFirstErrorMessage(errors);
		if (newErrorMessage) {
			setErrorMessage(newErrorMessage);
			setIsVisible(true);
			const timer = setTimeout(() => setIsVisible(false), 5000);
			return () => clearTimeout(timer);
		} else {
			setIsVisible(false);
		}
	}, [
		errors.from?.currency,
		errors.to?.currency,
		errors.from?.amount,
		errors.to?.amount,
	]);

	const getFirstErrorMessage = (
		errors: FieldErrors<ExchangeFormData>,
	): string | null => {
		if (errors.from?.currency?.message) return errors.from.currency.message;
		if (errors.to?.currency?.message) return errors.to.currency.message;
		if (errors.from?.amount?.message) return errors.from.amount.message;
		if (errors.to?.amount?.message) return errors.to.amount.message;
		return null;
	};

	if (!isVisible) return null;

	return (
		<div
			role="alert"
			aria-live="assertive"
			className="fixed transition-opacity duration-300 ease-in-out bottom-4 right-4 toast"
		>
			<div className="flex items-center p-4 alert alert-error">
				<span>{errorMessage}</span>
			</div>
		</div>
	);
};

ErrorToast.displayName = "ErrorToast";

export default ErrorToast;
