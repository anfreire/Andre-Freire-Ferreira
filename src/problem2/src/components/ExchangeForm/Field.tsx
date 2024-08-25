import React from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { ExchangeField, ExchangeFormData } from "@/types/exchangeForm";
import { ExchangeFormTitles } from "@/data/exchangeForm";
import CurrencyDropdown from "./CurrencyDropdown";

interface FieldProps {
  field: ExchangeField;
  register: UseFormRegister<ExchangeFormData>;
  control: Control<ExchangeFormData>;
}

const Field: React.FC<FieldProps> = ({ field, register, control }) => {
  const inputID = `input-${field}`;

  return (
    <div className="flex flex-col items-center gap-2 my-2">
      <label htmlFor={inputID}>{ExchangeFormTitles[field]}</label>
      <label className="flex items-center gap-2 p-2 input input-bordered input-primary">
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

export default Field;