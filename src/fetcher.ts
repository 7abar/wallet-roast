const BASESCAN_API = "https://api.basescan.org/api";
const API_KEY = process.env.BASESCAN_API_KEY ?? "J3GQEYNW94YDJ7RM616Y2MSU9WC5SEUS63";

export interface TxData {
  hash: string;
  from: string;
  to: string;
  value: string;
  input: string;
  isError: string;
  gasPrice: string;
  gasUsed: string;
  timeStamp: string;
}

export interface WalletProfile {
  address: string;
  totalTxs: number;
  failedTxs: number;
  ethSent: number;
  ethReceived: number;
  uniswapSwaps: number;
  contractDeploys: number;
  nftMints: number;
  totalGasSpentEth: number;
  firstTxAge: number;
  avgGasPrice: number;
  highGasTxs: number;
  duplicateTxs: number;
  selfTransfers: number;
}

export async function fetchTxs(address: string, limit = 100): Promise<TxData[]> {
  const url = `${BASESCAN_API}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=${limit}&sort=asc&apikey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json() as { status: string; result: TxData[] };
  if (data.status !== "1" || !Array.isArray(data.result)) return [];
  return data.result;
}

export function buildProfile(address: string, txs: TxData[]): WalletProfile {
  const addr = address.toLowerCase();
  let ethSent = 0, ethReceived = 0, failed = 0, swaps = 0, deploys = 0, nfts = 0;
  let totalGas = 0, highGas = 0, selfTransfers = 0;
  const toMap: Record<string, number> = {};

  for (const tx of txs) {
    const val = Number(BigInt(tx.value || "0")) / 1e18;
    const gasEth = Number(BigInt(tx.gasPrice || "0") * BigInt(tx.gasUsed || "0")) / 1e18;
    const gasPriceGwei = Number(BigInt(tx.gasPrice || "0")) / 1e9;
    totalGas += gasEth;
    if (gasPriceGwei > 50) highGas++;
    if (tx.isError === "1") failed++;
    if (tx.from.toLowerCase() === addr) {
      ethSent += val;
      if (!tx.to) deploys++;
      else {
        toMap[tx.to.toLowerCase()] = (toMap[tx.to.toLowerCase()] || 0) + 1;
      }
    } else {
      ethReceived += val;
    }
    const sel = tx.input?.slice(0, 10).toLowerCase();
    if (sel === "0x04e45aaf" || sel === "0x5ae401dc" || sel === "0x12aa3caf") swaps++;
    if (sel === "0x40c10f19" || sel === "0x6352211e") nfts++;
    if (tx.to?.toLowerCase() === addr) selfTransfers++;
  }

  const duplicateTxs = Object.values(toMap).filter(c => c >= 3).length;
  const firstTs = txs.length > 0 ? parseInt(txs[0].timeStamp) : Date.now() / 1000;
  const firstTxAge = Math.floor((Date.now() / 1000 - firstTs) / 86400);
  const avgGasPrice = txs.length > 0
    ? txs.reduce((s, t) => s + Number(BigInt(t.gasPrice || "0")) / 1e9, 0) / txs.length
    : 0;

  return {
    address, totalTxs: txs.length, failedTxs: failed, ethSent, ethReceived,
    uniswapSwaps: swaps, contractDeploys: deploys, nftMints: nfts,
    totalGasSpentEth: totalGas, firstTxAge, avgGasPrice, highGasTxs: highGas,
    duplicateTxs, selfTransfers,
  };
}