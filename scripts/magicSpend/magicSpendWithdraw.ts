import { encodeFunctionData, parseEther } from "viem";
import { Call } from "../..";
import { magicSpendAbi, magicSpendAddress } from "../../generated";
import { withdrawSignature } from "../../utils/magicSpend";
import { client, getAccount, makeCalls } from "../base";

const asset = "0x0000000000000000000000000000000000000000";
// const amount = parseEther("0.002");
const amount = 385319436593600n;
// const account = "0xDB7830737F5714FE0653FBDB30d90AE221a2CF5b";
const account = await getAccount();
const signature =
  "0x7afba59cf36e0d432268916e22c2ae75b27a41c5e33cad20d212bb36409607f707791f62142a301b1abd29dc904c18c96bb429cbadd576c9c7c186d2839d7a5c1c";
const nonce =
  51601261918333157858063710354582946950475297381738514298221370516654821609035n;
const chainId = 8453;
const expiry = 1723227288;
const piggyBankAddress = "0x7BCE4720a302fdCC1Fb9264D52d1b1D05a17b626";
console.log("account", account);

async function main() {
  const functionData = encodeFunctionData({
    abi: magicSpendAbi,
    functionName: "withdraw",
    args: [
      {
        signature: signature,
        asset,
        amount,
        nonce,
        expiry,
      },
    ],
  });
  const calls: Call[] = [
    {
      index: 0,
      target: piggyBankAddress,
      data: functionData,
      value: 0n,
    },
  ];
  makeCalls(calls);
}

main();
