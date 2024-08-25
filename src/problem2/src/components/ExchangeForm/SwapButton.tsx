import React from "react";
import { ReactComponent as Swap } from "@/assets/swap.svg";

interface SwapButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onClick }) => {
  return (
    <div className="w-full h-0 relative">
      <button
        onClick={onClick}
        className="active:scale-90 opacity-25 absolute left-3 top-1 transform transition-transform duration-150"
      >
        <Swap className="w-6 h-6 stroke-current" />
      </button>
    </div>
  );
};

export default SwapButton;
