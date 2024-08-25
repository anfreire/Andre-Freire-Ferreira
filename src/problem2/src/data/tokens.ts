import pricesJSON from "@/assets/prices.json";
import tokenIcons from "@/assets/token-icons.json";

pricesJSON as PriceData[];

pricesJSON.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
const filteredPricesJSON = Array.from(
  pricesJSON
    .reduce((map, obj) => map.set(obj.currency, obj), new Map())
    .values()
).sort((a, b) => a.currency.localeCompare(b.currency));

tokenIcons as string[];

type PriceData = {
  currency: string;
  date: string;
  price: number;
};

console.log(tokenIcons);

const buildSvgPath = (currency: string) => {
  if (!tokenIcons.includes(currency)) {
    const token = tokenIcons.find(
      (option) => option.toLowerCase() === currency.toLowerCase()
    );
    if (!token) return undefined;
    currency = token;
  }
  return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`;
};

export interface TokenOption {
  value: string;
  price: number;
  label: string;
  image: string | undefined;
}

export const TokenOptions: TokenOption[] = filteredPricesJSON.map(
  (priceData) => ({
    value: priceData.currency,
    label: priceData.currency,
    price: priceData.price,
    image: buildSvgPath(priceData.currency),
  })
);
