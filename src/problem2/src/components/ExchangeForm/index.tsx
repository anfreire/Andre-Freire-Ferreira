import React from "react";
import { useExchangeForm } from "@/hooks/useExchangeForm";
import Field from "./Field";
import SwapButton from "./SwapButton";

const ExchangeForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    isLoading,
    handleExchange,
    swapCurrencies,
  } = useExchangeForm();

  return (
    <form
      onSubmit={handleSubmit(handleExchange)}
      className="flex flex-col items-center"
    >
      <div className="flex flex-col items-center p-8 shadow-xl card">
        <h2 className="card-title mt-4 mb-6">Swap</h2>

        <Field field="from" register={register} control={control} />
        <SwapButton onClick={swapCurrencies} />
        <Field field="to" register={register} control={control} />
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary mt-8 w-40 transition-all duration-150 ease-in-out"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-md" />
          ) : (
            "CONFIRM SWAP"
          )}
        </button>
      </div>
    </form>
  );
};

export default ExchangeForm;
