#!/usr/bin/env node
import { fetchTxs, buildProfile } from "./fetcher.js";
import { generateRoast } from "./roast.js";

const address = process.argv[2];

if (!address || !address.startsWith("0x") || address.length !== 42) {
  console.error("\nUsage: node src/index.js <0x_wallet_address>\n");
  console.error("Example:");
  console.error("  node src/index.js 0x2012F75004C6e889405D078780AB41AE8606b85b\n");
  process.exit(1);
}

async function main() {
  console.log(`\nAnalyzing ${address}...`);
  console.log("(Fetching last 100 transactions from Base)\n");
  const txs = await fetchTxs(address, 100);
  const profile = buildProfile(address, txs);
  const roast = generateRoast(profile);
  console.log(roast);
}

main().catch(err => { console.error("Error:", err.message); process.exit(1); });