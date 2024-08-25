import React from "react";
import { currencyDropdownStyle } from "@/styles/currencyDropdown";
import { ExchangeFieldData } from "@/types/exchangeForm";
import ReactSelect, { ActionMeta } from "react-select";
import { tokens, tokenImages } from "@/data/tokens";

interface CurrencyDropdownProps {
  value: ExchangeFieldData["currency"];
  onChange: (newValue: any, actionMeta: ActionMeta<string[]>) => void;
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
      options={tokens}
      components={{
        SingleValue: ({ option }) => (
          <div className="flex items-center gap-0">
            <img src={tokenImages[option]} alt={option} className="w-6 h-6" />
          </div>
        ),
      }}
      formatOptionLabel={(option) => (
        <div className="flex items-center gap-2 overflow-x-hidden">
          <img src={tokenImages[option]} alt={option} className="w-6 h-6" />
          <label>{option}</label>
        </div>
      )}
    />
  );
};

export default CurrencyDropdown;
