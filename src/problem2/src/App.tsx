import React from "react";
import { FullPageLayout } from "@/components/Layout";
import { Form } from "@/components/Form";

function App() {
	return (
		<FullPageLayout>
			<div className="bg-black">
				<Form />
			</div>
		</FullPageLayout>
	);
}

export default App;
