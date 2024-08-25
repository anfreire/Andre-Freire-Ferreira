import pricesJSON from "@/assets/prices.json";
import tokenIcons from "@/assets/token-icons.json";

interface PriceData {
  currency: string;
  date: string;
  price: number;
}

const filteredPricesJSON = Object.values(
  pricesJSON.reduce<Record<string, PriceData>>((acc, curr) => {
    if (
      !acc[curr.currency] ||
      new Date(curr.date) > new Date(acc[curr.currency].date)
    ) {
      acc[curr.currency] = curr;
    }
    return acc;
  }, {})
).sort((a, b) => a.currency.localeCompare(b.currency));

export const tokenPrices: Record<string, number> = Object.fromEntries(
  filteredPricesJSON.map(({ currency, price }) => [currency, price])
);

const tokenIconsSet = new Set(tokenIcons.map((icon) => icon.toLowerCase()));

const buildSvgPath = (currency: string): string | undefined => {
  const lowerCurrency = currency.toLowerCase();
  const matchedIcon = tokenIconsSet.has(lowerCurrency)
    ? currency
    : tokenIcons.find((icon) => icon.toLowerCase() === lowerCurrency);

  return matchedIcon
    ? `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${matchedIcon}.svg`
    : undefined;
};

export const tokens = Object.keys(tokenPrices);

export const tokenImages: Record<string, string | undefined> =
  Object.fromEntries(
    filteredPricesJSON.map(({ currency }) => [currency, buildSvgPath(currency)])
  );
