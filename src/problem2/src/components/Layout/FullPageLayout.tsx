import React from "react";

const FullPageLayout = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	return (
    <div className="flex flex-col h-screen min-h-screen">
      <main className="flex-grow overflow-auto">{children}</main>
    </div>
	);
};

FullPageLayout.displayName = "FullPageLayout";

export default FullPageLayout;
