import React from "react";
import { TokenOptions } from "@/data/tokens";
import { currencyDropdownStyle } from "@/styles/currencyDropdown";
import { ExchangeFieldData } from "@/types/exchangeForm";
import ReactSelect from "react-select";

interface CurrencyDropdownProps {
  value: ExchangeFieldData["currency"];
  onChange: (...event: any[]) => void;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  value,
  onChange,
}) => {
  return (
    <ReactSelect
      value={value}
      onChange={onChange}
      placeholder=""
      styles={currencyDropdownStyle}
      isSearchable={false}
      className="w-16 border-0"
      options={TokenOptions}
      components={{
        SingleValue: ({ data }) => (
          <div className="flex items-center gap-0">
            <img src={data.image} alt={data.label} className="w-6 h-6" />
          </div>
        ),
      }}
      formatOptionLabel={(option) => (
        <div className="flex items-center gap-2 overflow-x-hidden">
          <img src={option.image} alt={option.label} className="w-6 h-6" />
          <label>{option.label}</label>
        </div>
      )}
    />
  );
};

export default CurrencyDropdown;
