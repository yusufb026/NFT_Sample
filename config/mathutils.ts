import BN from "bignumber.js";

export function fromSmall(quantity: string, decimals: number = 6): BN {
  return new BN(quantity).div(Math.pow(10, decimals)).dp(18);
}

function format(num: number) {
  return Math.floor(num) === num ? num.toString() : num.toFixed(2);
}

export function formatNumber(num: BN) {
  if (num.gte(1_000_000)) {
    return format(num.div(1_000_000).toNumber()) + "M";
  } else if (num.gte(1000)) {
    return format(num.div(1000).toNumber()) + "K";
  } else {
    return num.toString();
  }
}
