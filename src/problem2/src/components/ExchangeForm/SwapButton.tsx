import React, { memo } from "react";
import { ReactComponent as Swap } from "@/assets/swap.svg";

interface SwapButtonProps {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onClick }) => {
	return (
		<div className="relative w-full h-0">
			<button
				onClick={onClick}
				className="absolute transition-all duration-150 transform opacity-25 hover:opacity-50 focus:opacity-50 active:scale-90 left-3 top-1"
			>
				<Swap className="w-6 h-6 stroke-current" />
			</button>
		</div>
	);
};

export default memo(SwapButton);
