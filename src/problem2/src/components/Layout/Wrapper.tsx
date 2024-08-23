import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }): JSX.Element => {
	return (
		<div className="overflow-hidden w-dvw h-dvh">
			<div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900">
				{children}
			</div>
		</div>
	);
};

Wrapper.displayName = "Wrapper";

export default Wrapper;
