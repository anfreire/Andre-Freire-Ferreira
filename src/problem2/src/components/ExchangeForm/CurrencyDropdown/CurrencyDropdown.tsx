import React, { useMemo } from "react";
import ReactSelect, { ActionMeta, StylesConfig } from "react-select";
import { tokens } from "@/data/tokens";
import SingleValueComponent from "./SingleValueComponent";
import OptionLabelFormat from "./OptionLabelFormat";
import { CurrencyOption } from ".";

interface CurrencyDropdownProps {
	value: string;
	onChange: (
		newValue: string,
		actionMeta: ActionMeta<CurrencyOption>,
	) => void;
}

const options: CurrencyOption[] = tokens.map((token) => ({
	value: token,
	label: token,
}));

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
	value,
	onChange,
}) => {
	const selectedOption = useMemo(
		() => options.find((option) => option.value === value),
		[value],
	);

	return (
		<ReactSelect<CurrencyOption>
			value={selectedOption}
			onChange={(newValue, actionMeta) =>
				newValue && onChange(newValue.value, actionMeta)
			}
			placeholder=""
			styles={currencyDropdownStyle}
			isSearchable={false}
			className="w-16 border-0"
			options={options}
			components={{
				SingleValue: SingleValueComponent,
			}}
			formatOptionLabel={OptionLabelFormat}
		/>
	);
};

const currencyDropdownStyle: StylesConfig<CurrencyOption, false> = {
	control: (provided) => ({
		...provided,
		backgroundColor: "oklch(var(--b1))",
		border: "none",
		boxShadow: "none",
		width: "50px",
		transition: "background-color 0.2s",
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isFocused
			? "oklch(var(--b2))"
			: "oklch(var(--b1))",
		color: "inherit",
		":active": {
			backgroundColor: "oklch(var(--b3))",
		},
	}),
	menu: (provided) => ({
		...provided,
		backgroundColor: "oklch(var(--b1))",
		width: "160px",
	}),
	singleValue: (provided) => ({
		...provided,
		color: "inherit",
	}),
	indicatorSeparator: () => ({
		display: "none",
	}),
	dropdownIndicator: (provided) => ({
		...provided,
		color: "oklch(var(--nc))",
		padding: "0",
	}),
	valueContainer: (provided) => ({
		...provided,
		padding: "0",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	}),
};

export default CurrencyDropdown;
