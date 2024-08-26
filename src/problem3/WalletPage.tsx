import React from "react";
import { BoxProps } from "@/components/Box";
import WalletRow from "@/components/Wallet/Row";
import { useWalletBalances } from "@/hooks/useWalletBalances";
import { usePrices } from "@/hooks/usePrices";
import { WalletBalance } from "@/types/Wallet";
import { getBlockchainPriority } from "@/utils/Blockchain";
import styles from "./Wallet.module.css";

interface FormattedWalletBalance extends WalletBalance {
	formatted: string;
	usdValue: number;
	priority: number;
}

const useFormattedWalletBalances = () => {
	const balances = useWalletBalances();
	const prices = usePrices();

	let result: FormattedWalletBalance[] = [];
	for (const balance of balances) {
		const priority = getBlockchainPriority(balance.blockchain);
		if (priority > -99 && balance.amount > 0) {
			result.push({
				...balance,
				priority,
				formatted: balance.amount.toFixed(),
				usdValue: prices[balance.currency] * balance.amount,
			});
		}
	}
	return result.sort((a, b) => b.priority - a.priority);
};

interface WalletPageProps extends Omit<BoxProps, "children"> {}

const WalletPage = (props: WalletPageProps) => {
	const formattedBalances = useFormattedWalletBalances();

	return (
		<div {...props}>
			{formattedBalances.map((balance) => (
				<WalletRow
					className={styles.row}
					key={balance.blockchain}
					amount={balance.amount}
					usdValue={balance.usdValue}
					formattedAmount={balance.formatted}
				/>
			))}
		</div>
	);
};

WalletPage.displayName = "WalletPage";

export default WalletPage;
