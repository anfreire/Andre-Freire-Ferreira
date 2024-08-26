import ExchangeForm from "./ExchangeForm";

export interface ExchangeFieldData {
	currency: string;
	amount: string;
}

export type ExchangeField = "from" | "to";

export type ExchangeFormData = Record<ExchangeField, ExchangeFieldData>;

export const ExchangeFormTitles: Record<ExchangeField, string> = {
	from: "Amount to send",
	to: "Amount to receive",
};

export default ExchangeForm;
