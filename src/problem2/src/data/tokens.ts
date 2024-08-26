import pricesJSON from "@/assets/prices.json";
import tokenIcons from "@/assets/token-icons.json";

interface PriceData {
	currency: string;
	date: string;
	price: number;
}

const getLatestPriceData = (pricesData: PriceData[]): PriceData[] => {
	const latestPrices = new Map<string, PriceData>();

	for (const priceData of pricesData) {
		const existingData = latestPrices.get(priceData.currency);
		if (
			!existingData ||
			new Date(priceData.date) > new Date(existingData.date)
		) {
			latestPrices.set(priceData.currency, priceData);
		}
	}

	return Array.from(latestPrices.values()).sort((a, b) =>
		a.currency.localeCompare(b.currency),
	);
};

const filteredPricesJSON = getLatestPriceData(pricesJSON as PriceData[]);

export const tokenPrices: Record<string, number> = Object.fromEntries(
	filteredPricesJSON.map(({ currency, price }) => [currency, price]),
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
		filteredPricesJSON.map(({ currency }) => [
			currency,
			buildSvgPath(currency),
		]),
	);
