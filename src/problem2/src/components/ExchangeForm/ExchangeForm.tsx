import React from "react";
import { useExchangeForm } from "@/hooks/useExchangeForm";
import Field from "./Field";
import SwapButton from "./SwapButton";
import SubmitButton from "./SubmitButton";
import ErrorToast from "./ErrorToast";

const ExchangeForm: React.FC = () => {
	const {
		register,
		control,
		handleSubmit,
		isLoading,
		formState: { errors },
		handleExchange,
		swapCurrencies,
	} = useExchangeForm();

	return (
		<form
			onSubmit={handleSubmit(handleExchange)}
			className="flex flex-col items-center"
		>
			<div className="flex flex-col items-center p-8 shadow-xl card">
				<h2 className="mt-4 mb-6 card-title">Swap</h2>

				<Field
					field="from"
					register={register}
					control={control}
					errors={errors.from}
				/>
				<SwapButton onClick={swapCurrencies} />
				<Field
					field="to"
					register={register}
					control={control}
					errors={errors.to}
				/>
				<SubmitButton isLoading={isLoading} />
				<ErrorToast errors={errors} />
			</div>
		</form>
	);
};

export default ExchangeForm;
