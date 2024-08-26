const SubmitButton = ({ isLoading }: { isLoading: boolean }) => (
	<button
		type="submit"
		disabled={isLoading}
		className="w-40 mt-8 transition-all duration-150 ease-in-out btn btn-primary"
	>
		{isLoading ? (
			<span className="loading loading-spinner loading-md" />
		) : (
			"CONFIRM SWAP"
		)}
	</button>
);

SubmitButton.displayName = "SubmitButton";

export default SubmitButton;
