import pricesJSON from "@/assets/prices.json";

type PriceInfo = {
  currency: string;
  date: string;
  price: number;
};

interface TokenInfo {
  price: number;
  svgPath: string;
}

const buildSvgPath = (currency: string) => `@/assets/tokens/${currency}.svg`;

export const Tokens: Record<string, TokenInfo> = Object.fromEntries(
  (pricesJSON as PriceInfo[]).map(({ currency, price }) => [
    currency,
    { price, svgPath: buildSvgPath(currency) },
  ])
);

export default Tokens;
