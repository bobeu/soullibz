import artifacts from "../deployments/alfajores/LoanAndSalaryAdvance.json";

export type OxString = `0x${string}`;
export type WagmiConfig = import('wagmi').Config;
export const formatAddr = (x: string | (OxString | undefined)) : OxString => {
    if(!x || x === "") return `0x${'0'.repeat(40)}`;
    return `0x${x.substring(2, 42)}`;
};

export const contractAddress = () => formatAddr(artifacts.address);