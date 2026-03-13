import { describe, it, expect } from "vitest";
import { generateRoast } from "./roast.js";
import type { WalletProfile } from "./fetcher.js";

const base: WalletProfile = {
  address: "0x2012F75004C6e889405D078780AB41AE8606b85b",
  totalTxs: 0, failedTxs: 0, ethSent: 0, ethReceived: 0,
  uniswapSwaps: 0, contractDeploys: 0, nftMints: 0,
  totalGasSpentEth: 0, firstTxAge: 365, avgGasPrice: 1,
  highGasTxs: 0, duplicateTxs: 0, selfTransfers: 0,
};

describe("generateRoast", () => {
  it("roasts a wallet with no transactions", () => {
    const r = generateRoast({ ...base, totalTxs: 0 });
    expect(r).toContain("No transactions");
  });
  it("roasts failed transactions", () => {
    const r = generateRoast({ ...base, totalTxs: 50, failedTxs: 10 });
    expect(r).toContain("failed");
  });
  it("roasts high gas usage", () => {
    const r = generateRoast({ ...base, totalTxs: 50, highGasTxs: 15, totalGasSpentEth: 0.5 });
    expect(r).toContain("gwei");
  });
  it("roasts heavy Uniswap usage", () => {
    const r = generateRoast({ ...base, totalTxs: 80, uniswapSwaps: 25 });
    expect(r).toContain("Uniswap");
  });
  it("always returns a non-empty string", () => {
    const r = generateRoast(base);
    expect(r.length).toBeGreaterThan(50);
  });
});