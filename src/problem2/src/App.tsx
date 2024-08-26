import ThemeController from "@/components/ThemeController";
import ExchangeForm from "@/components/ExchangeForm";

function App() {
	return (
		<div className="flex flex-col justify-center min-h-screen">
			<ThemeController />
			<ExchangeForm />
		</div>
	);
}

export default App;
