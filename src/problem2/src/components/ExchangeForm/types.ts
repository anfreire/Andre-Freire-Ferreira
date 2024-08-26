export interface ExchangeFieldData {
	currency: string;
	amount: string;
}

export type ExchangeField = "from" | "to";

export type ExchangeFormData = Record<ExchangeField, ExchangeFieldData>;
