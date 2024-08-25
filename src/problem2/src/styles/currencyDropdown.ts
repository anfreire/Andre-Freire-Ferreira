import { TokenOption } from "@/data/tokens";
import { StylesConfig } from "react-select";

export const currencyDropdownStyle: StylesConfig<TokenOption, false> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "oklch(var(--b1))",
    border: "none",
    boxShadow: "none",
    width: "50px",
    transition: "background-color 0s",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "oklch(var(--b2))" : "oklch(var(--b1))",
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
