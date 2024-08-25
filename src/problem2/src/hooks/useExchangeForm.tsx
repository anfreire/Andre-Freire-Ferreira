import { useState, useCallback, useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { ExchangeFormData } from "@/types/exchangeForm";
import { tokenPrices } from "@/data/tokens";

export function useExchangeForm(): UseFormReturn<ExchangeFormData> & {
  isLoading: boolean;
  handleExchange: () => Promise<void>;
  swapCurrencies: () => void;
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
    try {
      const { from, to } = form.getValues();
      const fromPrice = tokenPrices[from.currency];
      const toPrice = tokenPrices[to.currency];

      if (!fromPrice || !toPrice) {
        throw new Error("Invalid currency");
      }

      const rate = toPrice / fromPrice;
      const fromAmount = parseFloat(from.amount);

      if (isNaN(fromAmount)) {
        throw new Error("Invalid amount");
      }

      const toAmount = fromAmount * rate;
      form.setValue("to.amount", toAmount.toFixed(6).replace(/\.?0+$/, ""));
    } catch (error) {
      throw new Error("Failed to exchange");
    } finally {
      setIsLoading(false);
    }
  }, [form]);

  const swapCurrencies = useCallback(() => {
    form.setValue("from", form.getValues("to"));
    form.setValue("to", { ...form.getValues("from"), amount: "" });
  }, [form]);

  return {
    ...form,
    isLoading,
    handleExchange,
    swapCurrencies,
  };
}
