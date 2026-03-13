import type { WalletProfile } from "./fetcher.js";

interface RoastLine {
  condition: (p: WalletProfile) => boolean;
  line: (p: WalletProfile) => string;
}

const ROAST_LINES: RoastLine[] = [
  { condition: p => p.totalTxs === 0, line: () => "No transactions found. Either you're a ghost, or you bought ETH and have been too scared to touch it. Both are valid." },
  { condition: p => p.totalTxs < 5 && p.totalTxs > 0, line: p => `${p.totalTxs} whole transactions. You signed up, bought ETH once, and immediately got overwhelmed. Respect the caution, I guess.` },
  { condition: p => p.failedTxs > 5, line: p => `${p.failedTxs} failed transactions. Do you enjoy burning gas for absolutely nothing? That's a personality trait, actually.` },
  { condition: p => p.failedTxs > 0 && p.failedTxs <= 5, line: p => `${p.failedTxs} failed txs. Everyone fails sometimes. You fail more than most. But at least you're trying.` },
  { condition: p => p.uniswapSwaps > 20, line: p => `${p.uniswapSwaps} Uniswap swaps. You are the liquidity provider's favorite customer. They call you "reliable income."` },
  { condition: p => p.uniswapSwaps > 5, line: p => `${p.uniswapSwaps} swaps on Uniswap. Classic degen behavior. Have you considered a savings account?` },
  { condition: p => p.highGasTxs > 10, line: p => `${p.highGasTxs} transactions at >50 gwei. Ethereum validators named their yachts after you.` },
  { condition: p => p.duplicateTxs > 3, line: p => `Sent to ${p.duplicateTxs} addresses 3+ times. Panic-clicking? Slow down, deep breaths, the blockchain isn't going anywhere.` },
  { condition: p => p.totalGasSpentEth > 0.1, line: p => `You've burned ${p.totalGasSpentEth.toFixed(4)} ETH in gas. That's rent money in some cities. Just wanted you to sit with that for a moment.` },
  { condition: p => p.contractDeploys > 5, line: p => `${p.contractDeploys} contract deploys. Either you're a prolific builder or you keep deploying buggy contracts and starting over. (It's the second one, isn't it.)` },
  { condition: p => p.contractDeploys > 0 && p.contractDeploys <= 5, line: p => `${p.contractDeploys} contract deploys. Look at you, deploying actual code. That's something. Chapeau.` },
  { condition: p => p.firstTxAge < 30, line: () => "You're new here. Welcome. It gets worse." },
  { condition: p => p.firstTxAge > 365 * 3, line: p => `${Math.floor(p.firstTxAge / 365)} years onchain. You've seen bull runs, bear markets, hacks, and drama. You're still here. Respect, honestly.` },
  { condition: p => p.ethReceived > p.ethSent * 3, line: () => "You receive way more ETH than you send out. Either you're doing very well, or this is a receiving wallet for something questionable. Either way, nice." },
  { condition: p => p.ethSent > p.ethReceived * 5, line: p => `You've sent ${p.ethSent.toFixed(4)} ETH and received back ${p.ethReceived.toFixed(4)} ETH. The market has humbled you. Many such cases.` },
  { condition: p => p.selfTransfers > 2, line: p => `${p.selfTransfers} self-transfers. Moving ETH from wallet A to wallet B to feel productive. We see you.` },
  { condition: p => p.nftMints > 10, line: p => `${p.nftMints} NFT mints. How many of those are still worth anything? (Don't answer that.)` },
];

const CLOSERS = [
  "Overall: could be worse. Could also be much better. It's fine.",
  "But hey — you're onchain. Most people aren't. That counts for something.",
  "The blockchain has seen everything. It judges no one. Unlike this script.",
  "Your wallet tells a story. It's not a great story. But it's yours.",
  "Zero financial advice was given in this roast. Zero.",
];

export function generateRoast(profile: WalletProfile): string {
  const lines: string[] = [];
  for (const roast of ROAST_LINES) {
    if (roast.condition(profile)) lines.push("• " + roast.line(profile));
  }
  if (lines.length === 0) lines.push("• Your wallet is mysteriously clean. Either you're very careful or this is a fresh wallet. Suspicious.");
  const closer = CLOSERS[Math.floor(Math.random() * CLOSERS.length)];
  return [
    "", "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    `  WALLET ROAST: ${profile.address.slice(0, 6)}...${profile.address.slice(-4)}`,
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "", ...lines, "", `  ${closer}`, "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "",
  ].join("\n");
}