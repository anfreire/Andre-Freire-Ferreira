import { useMemo } from "react";
import {
	Control,
	Controller,
	FieldError,
	FieldErrors,
	FieldErrorsImpl,
	Merge,
	UseFormRegister,
} from "react-hook-form";
import CurrencyDropdown from "./CurrencyDropdown";
import { ExchangeField, ExchangeFieldData, ExchangeFormData } from "./types";

const ExchangeFormTitles: Record<ExchangeField, string> = {
	from: "Amount to send",
	to: "Amount to receive",
};

interface FieldProps {
	field: ExchangeField;
	register: UseFormRegister<ExchangeFormData>;
	control: Control<ExchangeFormData, any>;
	errors?: Merge<FieldError, FieldErrorsImpl<ExchangeFieldData>>;
}

const Field = ({ field, register, control, errors }: FieldProps) => {
	const inputID = useMemo(() => `input-${field}`, [field]);

	const inputErrorClass = useMemo(() => {
		if (errors?.amount || errors?.currency) {
			return "input-error";
		}
		return "";
	}, [errors]);

	return (
		<div className="flex flex-col items-center gap-2 my-2">
			<label htmlFor={inputID}>{ExchangeFormTitles[field]}</label>
			<label
				className={`flex items-center gap-2 p-1 input input-bordered input-primary ${inputErrorClass}`}
			>
				<Controller
					name={`${field}.currency`}
					control={control}
					render={({ field: { value, onChange } }) => (
						<CurrencyDropdown value={value} onChange={onChange} />
					)}
				/>
				<input
					id={inputID}
					type="number"
					step="0.000001"
					min="0"
					readOnly={field === "to"}
					className="w-40 pr-2"
					{...register(`${field}.amount`)}
				/>
			</label>
		</div>
	);
};

Field.displayName = "Field";

export default Field;
