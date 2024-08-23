import React from "react";

const Form = (): JSX.Element => {
	return (
		<form onSubmit={() => !1}>
			<h5>Swap</h5>
			<label htmlFor="input-amount">Amount to send</label>
			<input id="input-amount" />

			<label htmlFor="output-amount">Amount to receive</label>
			<input id="output-amount" />

			<button>CONFIRM SWAP</button>
		</form>
	);
};

Form.displayName = "Form";

export default Form;
