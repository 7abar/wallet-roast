# wallet-roast 🔥

> Get brutally honest feedback about your onchain behavior. No judgment. Just data. (Lots of judgment.)

Paste any Base wallet address and receive a **personalized, brutally honest roast** based on your actual transaction history.

## Usage

```bash
node src/index.js 0xYourWalletAddress
```

## Example Output

```
Analyzing 0x2012F75004C6e889405D078780AB41AE8606b85b...
(Fetching last 100 transactions from Base)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  WALLET ROAST: 0x2012...85b
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• 7 failed transactions. Do you enjoy burning gas for absolutely nothing?
• 34 Uniswap swaps. You are the LP's favorite customer. "Reliable income."
• You've burned 0.2341 ETH in gas. That's rent money in some cities.
• 2 years onchain. You've seen it all. You're still here. Respect.

  Your wallet tells a story. It's not a great story. But it's yours.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## What It Analyzes

- 💸 **Failed Txs** — How many times you paid gas for nothing
- ⛽ **Gas Waste** — Total ETH burned in transaction fees
- 🦄 **Uniswap Addiction** — How many times you've swapped (and lost)
- 🖼️ **NFT Minting** — How many JPEGs you minted that are now worthless
- 🏗️ **Contract Deploys** — Builder or bug factory?
- 🕰️ **Wallet Age** — How long you've been a degen
- 😱 **Panic Clicks** — Duplicate transactions to same addresses
- 🔄 **Self-Transfers** — Moving money around to feel productive

## Setup

```bash
npm install
node src/index.js 0xYourAddress
```

Set your own BaseScan API key (optional):
```bash
export BASESCAN_API_KEY=your_key_here
```

## Notes

- Works on **Base mainnet** only
- Fetches last 100 transactions
- Powered by [BaseScan API](https://basescan.org/apis)
- No financial advice. Just vibes and mild contempt.

---

*Made with 🔥 and mild contempt for poor onchain decisions.*