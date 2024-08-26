import { useState, useCallback } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { tokenPrices } from "@/data/tokens";
import { ExchangeFormData } from "@/components/ExchangeForm";

export function useExchangeForm(): UseFormReturn<ExchangeFormData> & {
	isLoading: boolean;
	handleExchange: () => Promise<void>;
	swapCurrencies: React.MouseEventHandler<HTMLButtonElement>;
} {
	const form = useForm<ExchangeFormData>({
		defaultValues: {
			from: { currency: "", amount: "" },
			to: { currency: "", amount: "" },
		},
		mode: "onChange",
	});

	const [isLoading, setIsLoading] = useState(false);

	const handleExchange = useCallback(async () => {
		setIsLoading(true);
		const { from, to } = form.getValues();

		try {
			await new Promise((resolve) =>
				setTimeout(resolve, Math.random() * 2000),
			);

			const fromPrice = tokenPrices[from.currency];
			const toPrice = tokenPrices[to.currency];

			if (!fromPrice) throw new Error("from.currency");
			if (!toPrice) throw new Error("to.currency");

			const fromAmount = parseFloat(from.amount);
			if (isNaN(fromAmount) || fromAmount < 0)
				throw new Error("from.amount");

			const rate = toPrice / fromPrice;
			const toAmount = fromAmount * rate;
			form.setValue(
				"to.amount",
				toAmount.toFixed(6).replace(/\.?0+$/, ""),
			);
		} catch (error) {
			handleExchangeError(error as Error);
		} finally {
			setIsLoading(false);
		}
	}, [form]);

	const handleExchangeError = useCallback(
		(error: Error) => {
			switch (error.message) {
				case "from.currency":
					form.setError("from.currency", {
						message: "Please select a valid currency to send",
					});
					break;
				case "to.currency":
					form.setError("to.currency", {
						message: "Please select a valid currency to receive",
					});
					break;
				case "from.amount":
					form.setError("from.amount", {
						message: "Please enter a valid amount to send",
					});
					break;
				default:
					form.setError("from.amount", {
						message: "An unexpected error occurred",
					});
			}
		},
		[form],
	);

	const swapCurrencies = useCallback<
		React.MouseEventHandler<HTMLButtonElement>
	>(
		(event) => {
			event.preventDefault();
			const { from, to } = form.getValues();

			if (!from.currency) {
				form.setError("from.currency", {
					message: "Please select a valid currency to send",
				});
				return;
			}
			if (!to.currency) {
				form.setError("to.currency", {
					message: "Please select a valid currency to receive",
				});
				return;
			}
			const oldFromCurrency = from.currency;

			form.setValue("from.currency", to.currency);
			form.setValue("to.currency", oldFromCurrency);
		},
		[form],
	);

	return { ...form, isLoading, handleExchange, swapCurrencies };
}
