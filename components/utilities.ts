import { OxString } from "@/contractApis/contractAddress";
import { EmployeePayloads, EmployeePayload } from "@/contractApis/readContract";
import { BigNumber } from "ethers";
import { zeroAddress } from "viem";

export const initEmployeePayload : EmployeePayload = {
    identifier: zeroAddress,
    employer: zeroAddress,
    workId: 0n,
    active: false,
    saveForMe: false,
    pay: 0n,
    saveForMeRate: 0,
    amortizationRate: 0,
    advanceReq: {
        amortizationAmt: 0n,
        amount: 0n,
        status: 0
    },
    loanReq: {
        amount: 0n,
        interest: 0n,
        amortizationAmt: 0n,
        status: 0
    }
} 
export const filterUser = (account: OxString, payloads: EmployeePayloads, isEmployer: boolean) : EmployeePayloads => {
    if(!payloads) return [initEmployeePayload];
    const filtered = payloads.filter((payload) => isEmployer? payload.employer === account : payload.identifier === account);
    return filtered;
}

export const str = (x: string | undefined) : string => {
    return String(x);
} 

export const bn = (x: string | bigint) => BigNumber.from(x);
export const toBigInt = (x: string | number) => BigNumber.from(x).toBigInt();