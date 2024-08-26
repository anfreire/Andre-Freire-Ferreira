import { useState, useCallback, useMemo } from "react";
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
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleExchange = useCallback(async () => {
		setIsLoading(true);
		const { from, to } = form.getValues();
		await new Promise((resolve) =>
			setTimeout(resolve, Math.random() * 2000),
		);
		try {
			const fromPrice = tokenPrices[from.currency];
			const toPrice = tokenPrices[to.currency];

			if (!fromPrice) {
				throw new Error("from.currency");
			}
			if (!toPrice) {
				throw new Error("to.currency");
			}

			const fromAmount = parseFloat(from.amount);
			if (isNaN(fromAmount)) {
				throw new Error("from.amount");
			}

			const rate = toPrice / fromPrice;
			const toAmount = fromAmount * rate;
			form.setValue(
				"to.amount",
				toAmount.toFixed(6).replace(/\.?0+$/, ""),
			);
		} catch (error) {
			if (error instanceof Error) {
				switch (error.message) {
					case "from.currency":
						form.setError("from.currency", {
							message: "Invalid currency",
						});
						break;
					case "to.currency":
						form.setError("to.currency", {
							message: "Invalid currency",
						});
						break;
					case "from.amount":
						form.setError("from.amount", {
							message: "Invalid amount",
						});
						break;
				}
			}
		} finally {
			setIsLoading(false);
		}
	}, [form, tokenPrices, setIsLoading]);

	const swapCurrencies = useCallback(
		(event: React.MouseEvent) => {
			event.preventDefault();
			const fromCurrency = form.getValues("from").currency;
			if (!fromCurrency) {
				form.setError("from.currency", {
					message: "Invalid currency",
				});
				return;
			}
			const toCurrency = form.getValues("to").currency;
			if (!toCurrency) {
				form.setError("to.currency", {
					message: "Invalid currency",
				});
				return;
			}
			form.setValue("from.currency", toCurrency);
			form.setValue("to.currency", fromCurrency);
		},
		[form],
	);

	return {
		...form,
		isLoading,
		handleExchange,
		swapCurrencies,
	};
}
