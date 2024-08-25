import { useState, useCallback, useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { ExchangeFormData } from "@/types/exchangeForm";

export function useExchangeForm(): UseFormReturn<ExchangeFormData> & {
  isLoading: boolean;
  handleExchange: () => Promise<void>;
  swapCurrencies: () => void;
} {
  const form = useForm<ExchangeFormData>();
  const [isLoading, setIsLoading] = useState(false);

  const handleExchange = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = form.getValues();
      // Perform exchange logic here
      const { from, to } = data;
      const rate = from.currency.price / to.currency.price;
      const fromAmount = parseFloat(from.amount);
      const toAmount = fromAmount * rate;
      form.setValue("to.amount", toAmount.toFixed(6).replace(/\.?0+$/, ""));
    } catch (error) {
      console.error("Exchange error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [form]);

  const swapCurrencies = useCallback(() => {
    const { from, to } = form.getValues();
    form.setValue("from.currency", to.currency);
    form.setValue("to.currency", from.currency);
    form.setValue("to.amount", "");
  }, [form]);

  return {
    ...form,
    isLoading,
    handleExchange,
    swapCurrencies,
  };
}
