import { tokenImages } from "@/data/tokens";
import { CurrencyOption } from ".";

const SingleValueComponent = ({ data }: { data: CurrencyOption }) => (
	<div className="flex items-center gap-2 overflow-x-hidden">
		<img
			src={tokenImages[data.value]}
			alt={data.label}
			className="w-6 h-6"
		/>
	</div>
);

SingleValueComponent.displayName = "SingleValueComponent";

export default SingleValueComponent;
