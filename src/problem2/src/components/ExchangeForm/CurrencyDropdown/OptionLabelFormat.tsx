import { tokenImages } from "@/data/tokens";
import { CurrencyOption } from ".";

const OptionLabelFormat = (data: CurrencyOption) => (
	<div className="flex gap-2 overflow-x-hidden">
		<img
			src={tokenImages[data.value]}
			alt={data.label}
			className="w-6 h-6"
		/>
		<label>{data.label}</label>
	</div>
);

OptionLabelFormat.displayName = "OptionLabelFormat";

export default OptionLabelFormat;
