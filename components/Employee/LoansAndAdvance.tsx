import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AcceptOrRejectLoan, AdvanceRequestStatus, Callback, EmployeePayload, LoanRequestStatus, LoanStatus } from "@/contractApis/readContract";
import Divider from "@mui/material/Divider";
import { acceptOrRejectLoan } from "@/contractApis/acceptOrRejectLoanApproval";
import { useAccount, useConfig } from "wagmi";
import { formatAddr } from "@/contractApis/contractAddress";

export default function LoansAndAdvance({selectedEmployer : sem, callback} : {selectedEmployer: EmployeePayload, callback: Callback}) {
    const loanCondition = sem.loanReq.status === LoanRequestStatus.RESPONDED;
    const advanceCondition = sem.advanceReq.status === AdvanceRequestStatus.PENDING;
    const { address, isConnected } = useAccount();
    const config = useConfig();

    const sendRequest = async(acceptOrRejectStr: AcceptOrRejectLoan) => {
        if(!isConnected) return null;
        await acceptOrRejectLoan({
            account: formatAddr(address),
            callback,
            employerAddr: sem.employer,
            employeeId: sem.workId,
            acceptOrRejectStr,
            config
        });
    }

    return(
        <section id="Loans & Advances" >
            
            <div style={{
                padding: "22px", 
                borderRadius: '6px',
                border: "1px solid green",
                height: "100%"
            }}>
                <div style={{
                        marginBottom: '12px',
                    }}
                >
                    <Box sx={{display: "flex",justifyContent: "space-between", alignItems: "center"}}>
                        <Button variant="outlined" sx={{width: "50%"}}><Typography variant="h5">Loan</Typography></Button>
                        <Button variant="text" sx={{width: "20%"}}>
                            { LoanStatus[sem.loanReq.status]}
                        </Button>
                    </Box>
                    <Box sx={{display: "flex",justifyContent: "start", alignItems: "center"}}>
                        <Typography variant="h6">Work Id</Typography>
                        <Button variant="text" sx={{width: "20%"}}>
                            { sem.workId.toString()}
                        </Button>
                    </Box>

                    <div style={{ display: "flex", flexDirection: "column", gap: '8px', padding: '18px'}}>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography>Balance</Typography>
                            <Typography>{sem.loanReq.amount.toString()}</Typography>
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography>Interest</Typography>
                            <Typography>{sem.loanReq.interest.toString()}</Typography>
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography>Amortization</Typography>
                            <Typography>{sem.loanReq.amortizationAmt.toString()}</Typography>
                        </Box>
                    </div>
                    <div style={{width: "100%"}}>
                        <Button onClick={async() => await sendRequest("ACCEPTED")} disabled={!loanCondition} size="medium" variant="contained" sx={{width: "50%"}}>Accept</Button>
                        <Button onClick={async() => await sendRequest("REJECTED")} disabled={!loanCondition} variant="outlined" sx={{width: "50%"}}>Reject</Button>
                    </div>
                </div>
                <Divider />
                {/* Advances */}
                <div style={{
                        marginTop: '12px',
                    }}
                >
                    <Box sx={{display: "flex",justifyContent: "space-between"}}>
                        <Button variant="outlined" sx={{width: "50%"}}><Typography variant="h5">Advance</Typography></Button>
                        <Button variant="text" sx={{width: "20%"}}>
                            { LoanStatus[sem.advanceReq.status]}
                        </Button>
                    </Box>
                    <div style={{ display: "flex", flexDirection: "column", gap: '8px', padding: '18px'}}>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography>Balance</Typography>
                            <Typography>{sem.advanceReq.amount.toString()}</Typography>
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography>Amortization</Typography>
                            <Typography>{sem.advanceReq.amortizationAmt.toString()}</Typography>
                        </Box>
                    </div>
                    <div style={{width: "100%"}}>
                        <Button onClick={async() => await sendRequest("ACCEPTED")} disabled={!advanceCondition} size="medium" variant="contained" sx={{width: "50%"}}>Accept</Button>
                        <Button onClick={async() => await sendRequest("REJECTED")} disabled={!advanceCondition} variant="outlined" sx={{width: "50%"}}>Reject</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}



// function sendPayment(uint employeeId, bool acceptSaveForMe, uint start, uint stop) external returns(bool);
// function save4Me(address employerAddr, uint employeeId, bool value) external returns(bool);
// function acceptOrRejectLoanApproval(address employerAddr, uint employeeId, string memory acceptOrRejectStr) external returns(bool);
// function approveLoanOrAdvanceRequest(uint employeeId, uint8 interestRate, uint8 amortizationRate, string memory loanOrAdvanceStr) external returns(bool);
// function requestAdvanceOrLoan(address employerAddr, uint employeeId, uint amount, string memory loanOrAdvanceStr) external returns(bool);
// function disableOrEnableEmployee(uint employeeId, bool value) external returns(bool);
// function addEmployee(address[] memory addresses, uint256[] memory payments, uint8 saveForMeRate, uint8 amortizationRate) external returns(bool done);