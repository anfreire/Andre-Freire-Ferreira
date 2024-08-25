import { TokenOption } from "@/data/tokens";

export interface ExchangeFieldData {
  currency: TokenOption;
  amount: string;
}

export type ExchangeField = "from" | "to";

export type ExchangeFormData = Record<ExchangeField, ExchangeFieldData>;
