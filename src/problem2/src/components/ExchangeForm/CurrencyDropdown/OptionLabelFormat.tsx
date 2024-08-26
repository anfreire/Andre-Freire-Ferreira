import { tokenImages } from "@/data/tokens";
import { CurrencyOption } from "./types";

const OptionLabelFormat = ({ value, label }: CurrencyOption) => (
	<div className="flex gap-2 overflow-x-hidden">
		<img src={tokenImages[value]} alt={label} className="w-6 h-6" />
		<label>{label}</label>
	</div>
);

OptionLabelFormat.displayName = "OptionLabelFormat";

export default OptionLabelFormat;
