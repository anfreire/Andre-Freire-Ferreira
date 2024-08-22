# Problem 3: Messy React

## Initial Code

```tsx
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

    const getPriority = (blockchain: any): number => {
      switch (blockchain) {
        case 'Osmosis':
          return 100
        case 'Ethereum':
          return 50
        case 'Arbitrum':
          return 30
        case 'Zilliqa':
          return 20
        case 'Neo':
          return 20
        default:
          return -99
      }
    }

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
          const balancePriority = getPriority(balance.blockchain);
          if (lhsPriority > -99) {
             if (balance.amount <= 0) {
               return true;
             }
          }
          return false
        }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          if (leftPriority > rightPriority) {
            return -1;
          } else if (rightPriority > leftPriority) {
            return 1;
          }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}
```

## Computational Inefficiencies and Anti-Patterns

### Import Statements

1. No imports were being used in the `WalletPage` component.

```diff
+ import React from "react";
+ import { BoxProps } from "@/components/Box";
+ import WalletRow from "@/components/Wallet/Row";
+ import { useWalletBalances } from "@/hooks/useWalletBalances";
+ import { usePrices } from "@/hooks/usePrices";
```

2. Given that the component is using a `classes` object that contains a property for the `row` class, we are going to refactor it to be a CSS module that will be imported in the component file.

```diff
+ import styles from "./Wallet.module.css";

  // ...

    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
        <WalletRow
-           className={classes.row}
+            className={styles.row}

  // ...
```

### Type Declarations

1. The `WalletBalance` interface is missing the `blockchain` property. It is recommended to add this property to the interface.

```diff
  interface WalletBalance {
    currency: string;
    amount: number;
+   blockchain: string;
  }
```

2. Duplicated type declarations

The `FormattedWalletBalance` uses the same properties as the `WalletBalance` interface, but with an additional `formatted` property. It is recommended to extend the `WalletBalance` interface to create the `FormattedWalletBalance` interface.

```diff
- interface FormattedWalletBalance {
+ interface FormattedWalletBalance extends WalletBalance {
- 	currency: string;
- 	amount: number;
+ 	formatted: string;
}
```

3. Given that the `FormattedWalletBalance` only adds a `formatted` property and we will be refactoring the code to handle the formatting and sorting, we should also create a type that describes the formatted wallet balance, in this case, with the `usdValue` and `priority` properties. Later, we will better define this type and explain why these properties are included.

```diff
  interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
+   usdValue: number;
+   priority: number;
  }
```

4. Declaration of the `WalletBalance` interface

Assuming the `FormattedWalletBalance` interface is going to be used only in this component, we can define it in the same file as the component. For the `WalletBalance` interface, we can define it in a separate file, usually in the `types` folder.

```diff
+ import { WalletBalance } from "@/types/Wallet";

- interface WalletBalance {
- 	currency: string;
- 	amount: number;
- }
```

5. Generic naming convention for the WalletPage properties interface

```diff
- interface Props extends BoxProps {}
+ interface WalletPageProps extends BoxProps {}
```

6. Given that we are not using the child prop from the BoxProps interface, we can remove it.

```diff
- interface WalletPageProps extends BoxProps {}
+ interface WalletPageProps extends Omit<BoxProps, 'children'> {}
```

### Component Declaration

1. Use of `React.FC` type for the `WalletPage` component

`React.FC` implicitly includes the children prop. In this case, we are using the children prop, but it is generally advised not to use `React.FC`. React does not recommend it anymore. There is no need to use this typing, and it can be considered redundant and unnecessary.

```diff
- const WalletPage: React.FC<Props> = (props: Props) => {
+ const WalletPage = (props: WalletPageProps): JSX.Element => {
```

2. Unnecessary prop spreading on the component body

```diff
- const WalletPage = (props: WalletPageProps): JSX.Element => {
+ const WalletPage = ({ children, ...rest }: WalletPageProps): JSX.Element => {
-     const { children, ...rest } = props;
```

3. Given that we have removed the `children` prop from the `WalletPageProps` interface, we should remove the `children` prop from the destructuring assignment. Also let's replace the name `rest` with `props` for better readability.

```diff
- const WalletPage = ({ children, ...rest }: WalletPageProps): JSX.Element => {
+ const WalletPage = (props: WalletPageProps): JSX.Element => {
```
    

### Function `getPriority`

1. Non-state dependent function inside the component body

```diff
+ const getPriority = (blockchain: any): number => {
+     switch (blockchain) {
+         case "Osmosis":
+             return 100;
+         case "Ethereum":
+             return 50;
+         case "Arbitrum":
+             return 30;
+         case "Zilliqa":
+             return 20;
+         case "Neo":
+             return 20;
+         default:
+             return -99;
+     }
+ };
  

2. Not type hinting the `blockchain` parameter

This defeats the whole purpose of using TypeScript. It is always recommended to type hint the parameters and return types of functions.

```diff
- const getPriority = (blockchain: any): number => {
+ const getPriority = (blockchain: string): number => {
      switch (blockchain) {
      case 'Osmosis':
          return 100
      case 'Ethereum':
          return 50
      case 'Arbitrum':
          return 30
      case 'Zilliqa':
          return 20
      case 'Neo':
          return 20
      default:
          return -99
      }
  }
```

We could also go a step further and define a type for the `blockchain` parameter in its own file, e.g., `@/types/Blockchain.ts`:

```ts
type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo' | string;
```

And then use it in the `getPriority` function:

```diff
+ import { Blockchain } from "@/types/Blockchain";

- const getPriority = (blockchain: string): number => {
+ const getPriority = (blockchain: Blockchain): number => {
  // ...
```

The name of the function `getPriority` is not very descriptive. It is recommended to use a more descriptive name, like `getBlockchainPriority`.

```diff
- const getPriority = (blockchain: Blockchain): number => {
+ const getBlockchainPriority = (blockchain: Blockchain): number => {
```

Because this function could be used in other components, it is recommended to extract it into a separate file, usually in the utils folder.

```diff
import { getBlockchainPriority } from "@/utils/Blockchain";

- const getBlockchainPriority = (blockchain: string): number => {
- 	switch (blockchain) {
- 		case "Osmosis":
- 			return 100;
- 		case "Ethereum":
- 			return 50;
- 		case "Arbitrum":
- 			return 30;
- 		case "Zilliqa":
- 			return 20;
- 		case "Neo":
- 			return 20;
- 		default:
- 			return -99;
- 	}
- };
```

### Component Body Filled with Logic

For better readability and maintainability, it is recommended to extract the logic into separate functions or, in this case, hooks. Because we are only going to use the `rows` variable in the component itself, we can extract the logic into a custom hook. Since this hook will be used only in this component, we can define it in the component file itself.

```diff
+ const useWalletRows = (): JSX.Element[] => {
+ 	const balances = useWalletBalances();
+ 	const prices = usePrices();
+ 
+ 	const sortedBalances = useMemo(() => {
+ 		return balances
+ 			.filter((balance: WalletBalance) => {
+ 				const balancePriority = getBlockchainPriority(balance.blockchain);
+ 				if (lhsPriority > -99) {
+ 					if (balance.amount <= 0) {
+ 						return true;
+ 					}
+ 				}
+ 				return false;
+ 			})
+ 			.sort((lhs: WalletBalance, rhs: WalletBalance) => {
+ 				const leftPriority = getBlockchainPriority(lhs.blockchain);
+ 				const rightPriority = getBlockchainPriority(rhs.blockchain);
+ 				if (leftPriority > rightPriority) {
+ 					return -1;
+ 				} else if (rightPriority > leftPriority) {
+ 					return 1;
+ 				}
+ 			});
+ 	}, [balances, prices]);
+ 
+ 	const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
+ 		return {
+ 			...balance,
+ 			formatted: balance.amount.toFixed(),
+ 		};
+ 	});
+ 
+ 	const rows = sortedBalances.map(
+ 		(balance: FormattedWalletBalance, index: number) => {
+ 			const usdValue = prices[balance.currency] * balance.amount;
+ 			return (
+ 				<WalletRow
+ 					className={styles.row}
+ 					key={index}
+ 					amount={balance.amount}
+ 					usdValue={usdValue}
+ 					formattedAmount={balance.formatted}
+ 				/>
+ 			);
+ 		},
+ 	);
+ }

  const WalletPage = (props: WalletPageProps): JSX.Element => {
- 	const balances = useWalletBalances();
- 	const prices = usePrices();
+   const rows = useWalletRows();
- 
- 	const sortedBalances = useMemo(() => {
- 		return balances
- 			.filter((balance: WalletBalance) => {
- 				const balancePriority = getBlockchainPriority(balance.blockchain);
- 				if (lhsPriority > -99) {
- 					if (balance.amount <= 0) {
- 						return true;
- 					}
- 				}
- 				return false;
- 			})
- 			.sort((lhs: WalletBalance, rhs: WalletBalance) => {
- 				const leftPriority = getBlockchainPriority(lhs.blockchain);
- 				const rightPriority = getBlockchainPriority(rhs.blockchain);
- 				if (leftPriority > rightPriority) {
- 					return -1;
- 				} else if (rightPriority > leftPriority) {
- 					return 1;
- 				}
- 			});
- 	}, [balances, prices]);
- 
- 	const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
- 		return {
- 			...balance,
- 			formatted: balance.amount.toFixed(),
- 		};
- 	});
- 
- 	const rows = sortedBalances.map(
- 		(balance: FormattedWalletBalance, index: number) => {
- 			const usdValue = prices[balance.currency] * balance.amount;
- 			return (
- 				<WalletRow
- 					className={styles.row}
- 					key={index}
- 					amount={balance.amount}
- 					usdValue={usdValue}
- 					formattedAmount={balance.formatted}
- 				/>
- 			);
- 		},
- 	);

    return <div {...props}>{rows}</div>;
};
```

### Hook Returning JSX.Element[]

We should separate the data and component logic. The hook should return the data, and the component should handle the rendering.

```diff
  const useWalletRows = (): JSX.Element[] => {
     // ...

- 	 const rows = sortedBalances.map(
- 	 	(balance: FormattedWalletBalance, index: number) => {
- 	 		const usdValue = prices[balance.currency] * balance.amount;
- 	 		return (
- 	 			<WalletRow
- 	 				className={styles.row}
- 	 				key={index}
- 	 				amount={balance.amount}
- 	 				usdValue={usdValue}
- 	 				formattedAmount={balance.formatted}
- 	 			/>
- 	 		);
- 	 	},
- 	 );
+    return sortedBalances.map(
+		(balance: FormattedWalletBalance) => ({
+			...balance,
+			usdValue: prices[balance.currency] * balance.amount,
+		}),
+	);
  }

  const WalletPage = (props: WalletPageProps): JSX.Element => {
    const rows = useWalletRows();

-	return <div {...props}>{rows}</div>;
+   return (
+       <div {...props}>
+           {rows.map((row, index) => (
+               <WalletRow
+                   className={styles.row}
+                   key={index}
+                   amount={row.amount}
+                   usdValue={row.usdValue}
+                   formattedAmount={row.formatted}
+               />
+           ))}
+       </div>
+   );
```


Because we are no longer returning any rows, but the data, we should rename the hook to match the return type, in this case `useFormattedWalletBalances`.

```diff
- const useWalletRows = (): JSX.Element[] => {
+ const useFormattedWalletBalances = (): FormattedWalletBalance[] => {

    // ...
  }

    const WalletPage = (props: WalletPageProps): JSX.Element => {
-       const rows = useWalletRows();
+       const formattedBalances = useFormattedWalletBalances();
    
        return (
            <div {...props}>
-               {rows.map((row, index) => (
+               {formattedBalances.map((balance, index) => (
                    <WalletRow
                        className={styles.row}
                        key={index}
                        amount={balance.amount}
                        usdValue={balance.usdValue}
                        formattedAmount={balance.formatted}
                    />
                ))}
            </div>
        );
    };
```


### Redundant Computation

`formattedBalances`, `sortedBalances`, and the final return map are being computed separately, which can lead to unexpected multiple computations over the same data.

```diff
  const useFormattedWalletBalances = (): FormattedWalletBalance[] => {
      const balances = useWalletBalances();
      const prices = usePrices();
  
-     const sortedBalances = useMemo(() => {
-         return balances
-             .filter((balance: WalletBalance) => {
-                 const balancePriority = getBlockchainPriority(balance.blockchain);
-                 if (lhsPriority > -99) {
-                     if (balance.amount <= 0) {
-                         return true;
-                     }
-                 }
-                 return false;
-             })
-             .sort((lhs: WalletBalance, rhs: WalletBalance) => {
-                 const leftPriority = getBlockchainPriority(lhs.blockchain);
-                 const rightPriority = getBlockchainPriority(rhs.blockchain);
-                 if (leftPriority > rightPriority) {
-                     return -1;
-                 } else if (rightPriority > leftPriority) {
-                     return 1;
-                 }
-             });
-     }, [balances, prices]);
- 
-     const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
-         return {
-             ...balance,
-             formatted: balance.amount.toFixed(),
-         };
-     });
- 
-     return sortedBalances.map(
-         (balance: FormattedWalletBalance, index: number) => ({
-             ...balance,
-             usdValue: prices[balance.currency] * balance.amount,
-         }),
-     );
-   }, [balances, prices]);
+   return useMemo(() => 
+     balances
+       .filter((balance: WalletBalance) => {
+           const balancePriority = getBlockchainPriority(
+               balance.blockchain,
+           );
+           if (lhsPriority > -99) {
+               if (balance.amount <= 0) {
+                   return true;
+               }
+           }
+           return false;
+       })
+       .sort((lhs: WalletBalance, rhs: WalletBalance) => {
+           const leftPriority = getBlockchainPriority(lhs.blockchain);
+           const rightPriority = getBlockchainPriority(rhs.blockchain);
+           if (leftPriority > rightPriority) {
+               return -1;
+           } else if (rightPriority > leftPriority) {
+               return 1;
+           }
+       })
+       .map((balance: WalletBalance) => {
+           return {
+               ...balance,
+               formatted: balance.amount.toFixed(),
+               usdValue: prices[balance.currency] * balance.amount,
+           };
+       });
+   , [balances, prices]);
  }
```

### Duplicated `getBlockchainPriority` Use

The `getBlockchainPriority` function is being used multiple times. Some developers would recommend transforming the data declaratively, using `map`, `filter`, and `sort` functions, instead of imperatively, using `for` loops and `if` statements. But in this case, to avoid multiple calls to the `getBlockchainPriority` function and because the logic of the `for` loop is not complex, we can use the `for` loop. We could also use a `reduce`, but for this case, I think a for loop is better for readability and maintenance. To reduce the number of calls to the `getBlockchainPriority` function, we can store the priority in the `balance` object.

We have also fixed:
- Removed the unnecessary type hinting of the `useFormattedWalletBalances` hook because it is inferred from the return value
- The undefined `lhsPriority`
- Unnecessary `leftPriority` and `rightPriority` variables
- The misleading `lhs` and `rhs` variable names to more conventional `a` and `b`

```diff
- const useFormattedWalletBalances = (): FormattedWalletBalance[] => {
+ const useFormattedWalletBalances = () => {
-    return useMemo(() => 
-       balances
-           .filter((balance: WalletBalance) => {
-               const balancePriority = getBlockchainPriority(
-                   balance.blockchain,
-               );
-               if (lhsPriority > -99) {
-                   if (balance.amount <= 0) {
-                       return true;
-                   }
-               }
-               return false;
-           })
-           .sort((lhs: WalletBalance, rhs: WalletBalance) => {
-               const leftPriority = getBlockchainPriority(lhs.blockchain);
-               const rightPriority = getBlockchainPriority(rhs.blockchain);
-               if (leftPriority > rightPriority) {
-                   return -1;
-               } else if (rightPriority > leftPriority) {
-                   return 1;
-               }
-           })
-           .map((balance: WalletBalance) => {
-               return {
-                   ...balance,
-                   formatted: balance.amount.toFixed(),
-                   usdValue: prices[balance.currency] * balance.amount,
-               };
-           });
-     , [balances, prices]);
+   return useMemo(() => {
+     let result: FormattedWalletBalance[] = [];
+     for (const balance of balances) {
+       const priority = getBlockchainPriority(balance.blockchain);
+       if (priority > -99 && balance.amount > 0) {
+         result.push({
+           ...balance,
+           priority,
+           formatted: balance.amount.toFixed(),
+           usdValue: prices[balance.currency] * balance.amount,
+         });
+       }
+     }
+     return result.sort((a, b) => b.priority - a.priority);
+   }, [balances, prices]);
  };
```

### useMemo Hook

The use of the `useMemo` hook will depend on the use case. If the values `balances` and `prices` are not going to change frequently, it is recommended to use the `useMemo` hook. If the values are going to change frequently, it is recommended to remove the `useMemo` hook.
I assume at least the values of prices will change frequently, so I will remove the `useMemo` hook.


```diff
  const useFormattedWalletBalances = () => {
      const balances = useWalletBalances();
      const prices = usePrices();

-   return useMemo(() => { 
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
-   }, [balances, prices]);
  };
```

### Using index as key

Using the index as a key is not recommended as it can lead to performance issues and bugs with component state. It is better to use a unique identifier for the key. In this case, we can use the blockchain property as the key, assuming it's unique for each balance.

```diff
  return (
      <div {...props}>
-         {formattedBalances.map((balance, index) => (
+         {formattedBalances.map((balance) => (
              <WalletRow
                  className={styles.row}
-                 key={index}
+                 key={balance.blockchain}
                  amount={balance.amount}
                  usdValue={balance.usdValue}
                  formattedAmount={balance.formatted}
              />
          ))}
      </div>
  );
```


### Exporting the Component

It is advised to export the component as default. We will also specify the displayName of the component for better debugging.

```diff
+ WalletPage.displayName = "WalletPage";

+ export default WalletPage;
```

### Final Code

```tsx
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

const WalletPage = (props: WalletPageProps): JSX.Element => {
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
```