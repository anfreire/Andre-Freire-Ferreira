import React from "react";
import { Form } from "@/components/Form";
import Wrapper from "@/components/Layout/Wrapper";
import ColorSchemeToggle from "@/components/Layout/ColorSchemeToggle";

function App() {
	return (
		<Wrapper>
			<ColorSchemeToggle />
			<div className="w-full h-full"></div>
		</Wrapper>
	);
}

export default App;
