import React, { useState, useMemo, useEffect } from 'react';
import { RippleButton } from '../common/RippleButton';
import { XIcon, CheckCircleIcon } from '../IconComponents';
import { Loan } from '../../types';

const mockTransactions = [
    { id: 1, type: 'Deposit', amount: 50000, date: '2024-07-10' },
    { id: 2, type: 'Ikimina Contribution', amount: -10000, date: '2024-07-09' },
    { id: 3, type: 'Loan Repayment', amount: -25000, date: '2024-07-08' },
];

const mockLoanHistory: Loan[] = [
    { id: '1', originalAmount: 200000, totalRepaid: 200000, status: 'Fully Repaid' },
    { id: '2', originalAmount: 500000, totalRepaid: 500000, status: 'Fully Repaid' },
];

const CircularProgressBar: React.FC<{ percentage: number, size?: number, strokeWidth?: number }> = ({ percentage, size = 100, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="w-full h-full transform -rotate-90">
                <circle className="text-gray-200 dark:text-gray-700" strokeWidth={strokeWidth} stroke="currentColor" fill="transparent" r={radius} cx={size/2} cy={size/2} />
                <circle className="text-[#32CD32] transition-all duration-500 ease-out" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx={size/2} cy={size/2} />
            </svg>
            <span className="absolute text-xl font-bold font-display text-[#32CD32]">{Math.round(percentage)}%</span>
        </div>
    );
};


// --- Loan Application Modal ---
const LoanApplicationModal: React.FC<{ onClose: () => void; onApply: (amount: number, term: number) => void; }> = ({ onClose, onApply }) => {
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState(100000);
    const [term, setTerm] = useState(6); // in months
    const [isSubmitting, setIsSubmitting] = useState(false);
    const INTEREST_RATE = 0.15; // 15% annual interest

    const { monthlyPayment, totalInterest } = useMemo(() => {
        const principal = amount;
        const interest = principal * INTEREST_RATE * (term / 12);
        const totalRepayment = principal + interest;
        return {
            monthlyPayment: totalRepayment / term,
            totalInterest: interest,
        };
    }, [amount, term]);

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            onApply(amount, term);
            setStep(2);
            setIsSubmitting(false); // Reset in case modal is reused
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[100] p-4 animate-fade-in-up">
            <div className="w-full max-w-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"><XIcon className="w-6 h-6"/></button>
                <h3 className="text-3xl font-bold font-display text-center mb-4">Apply for a Loan</h3>
                {step === 1 ? (
                    <div className="space-y-6">
                        <div>
                            <label className="font-semibold">Loan Amount: RWF {amount.toLocaleString()}</label>
                            <input type="range" min="50000" max="1000000" step="50000" value={amount} onChange={e => setAmount(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
                        </div>
                        <div>
                            <label className="font-semibold">Repayment Term: {term} months</label>
                            <input type="range" min="3" max="12" step="3" value={term} onChange={e => setTerm(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
                        </div>
                        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900/50 space-y-2">
                            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Monthly Payment:</span><span className="font-bold">RWF {Math.round(monthlyPayment).toLocaleString()}</span></div>
                            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Total Interest:</span><span className="font-bold">RWF {Math.round(totalInterest).toLocaleString()}</span></div>
                        </div>
                        <RippleButton onClick={handleSubmit} className="w-full text-white bg-gradient-to-r from-[#1E90FF] to-[#20B2AA] disabled:opacity-75 rounded-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Confirm Application'}
                        </RippleButton>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 animate-scale-in" />
                        <h3 className="mt-4 text-2xl font-bold font-display">Application Submitted!</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Your loan application is under review. You will be notified shortly.</p>
                        <RippleButton onClick={onClose} className="w-full mt-6 text-white bg-[#1E90FF] rounded-full">Close</RippleButton>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Loan Repayment Modal ---
const LoanRepaymentModal: React.FC<{ loan: { total: number, paid: number }; currentBalance: number; onClose: () => void; onRepay: (amount: number) => void; }> = ({ loan, currentBalance, onClose, onRepay }) => {
    const remaining = loan.total - loan.paid;
    const [amount, setAmount] = useState(remaining);
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (amount <= 0) {
            setError('Amount must be positive.');
        } else if (amount > remaining) {
            setError(`Amount cannot exceed RWF ${remaining.toLocaleString()}.`);
        } else if (amount > currentBalance) {
            setError('Insufficient funds for this payment.');
        } else {
            setError('');
        }
    }, [amount, remaining, currentBalance]);

    const handleRepay = () => {
        if (error || isSubmitting) return;
        setIsSubmitting(true);
        setTimeout(() => {
            onRepay(amount);
            setStep(2);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[100] p-4 animate-fade-in-up">
            <div className="w-full max-w-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 relative" onClick={e => e.stopPropagation()}>
                 <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"><XIcon className="w-6 h-6"/></button>
                 <h3 className="text-3xl font-bold font-display text-center mb-4">Repay Loan</h3>
                 {step === 1 ? (
                    <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900/50">
                            <p className="text-gray-600 dark:text-gray-400">Outstanding Balance</p>
                            <p className="text-2xl font-bold">RWF {remaining.toLocaleString()}</p>
                        </div>
                        <div>
                             <div className="flex justify-between items-center">
                                <label className="font-semibold">Repayment Amount</label>
                                <button onClick={() => setAmount(remaining)} className="text-sm font-semibold text-[#1E90FF] hover:underline">Pay Full Amount</button>
                            </div>
                            <input 
                                type="number" 
                                value={amount} 
                                onChange={e => setAmount(Number(e.target.value))} 
                                max={remaining}
                                min="1"
                                className={`w-full mt-1 p-2 rounded-md bg-gray-100 dark:bg-gray-700 border ${error ? 'border-red-500' : 'border-transparent'} focus:ring-2 focus:ring-[#1E90FF]`}
                            />
                            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                        </div>
                        <RippleButton 
                            onClick={handleRepay} 
                            className="w-full text-white bg-gradient-to-r from-[#1E90FF] to-[#20B2AA] disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
                            disabled={!!error || amount === 0 || isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : 'Make Payment'}
                        </RippleButton>
                    </div>
                 ) : (
                    <div className="text-center py-8">
                        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 animate-scale-in" />
                        <h3 className="mt-4 text-2xl font-bold font-display">Payment Successful!</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Your payment has been processed. Thank you!</p>
                        <RippleButton onClick={onClose} className="w-full mt-6 text-white bg-[#1E90FF] rounded-full">Close</RippleButton>
                    </div>
                 )}
            </div>
        </div>
    );
};


export const WalletPage: React.FC = () => {
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [isRepayModalOpen, setIsRepayModalOpen] = useState(false);
    const [balance, setBalance] = useState(150450);
    const [activeLoan, setActiveLoan] = useState<{ total: number, paid: number } | null>(null);

    const handleApplyLoan = (amount: number, term: number) => {
        // Mock application approval
        const interest = amount * 0.15 * (term / 12);
        setActiveLoan({ total: amount + interest, paid: 0 });
    };

    const handleRepayLoan = (amount: number) => {
        if (!activeLoan) return;
        
        setBalance(prev => prev - amount);
        
        const newPaidAmount = Math.min(activeLoan.paid + amount, activeLoan.total);
        if (newPaidAmount >= activeLoan.total) {
            setActiveLoan(null); // Loan fully paid
        } else {
            setActiveLoan({ ...activeLoan, paid: newPaidAmount });
        }
    };
    
    const loanProgress = activeLoan ? (activeLoan.paid / activeLoan.total) * 100 : 0;
    
  return (
    <div className="space-y-12">
        <div>
            <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white">My Wallet</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">Manage your funds and transactions.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-[#1E90FF] to-[#32CD32] text-white shadow-2xl shadow-blue-500/30">
                    <p className="text-lg opacity-80">Current Balance</p>
                    <p className="text-5xl font-bold font-display mt-2">RWF {balance.toLocaleString()}</p>
                    <div className="flex space-x-4 mt-8">
                        <RippleButton className="bg-white/20 hover:bg-white/30 text-white rounded-full">Deposit</RippleButton>
                        <RippleButton onClick={() => activeLoan ? setIsRepayModalOpen(true) : setIsApplyModalOpen(true)} className="bg-white/20 hover:bg-white/30 text-white rounded-full">
                            {activeLoan ? 'Repay Loan' : 'Apply for Loan'}
                        </RippleButton>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                     <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Recent Transactions</h3>
                     <ul className="space-y-3">
                        {mockTransactions.map(tx => (
                            <li key={tx.id} className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-900/50 rounded-md">
                                <div>
                                    <p className="font-semibold">{tx.type}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{tx.date}</p>
                                </div>
                                <p className={`font-bold ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {tx.amount > 0 ? '+' : ''}RWF {tx.amount.toLocaleString()}
                                </p>
                            </li>
                        ))}
                     </ul>
                </div>
                
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Loan History</h3>
                    <ul className="space-y-3">
                        {mockLoanHistory.length > 0 ? (
                            mockLoanHistory.map(loan => (
                                <li key={loan.id} className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-900/50 rounded-md">
                                    <div>
                                        <p className="font-semibold">Loan of RWF {loan.originalAmount.toLocaleString()}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Repaid: RWF {loan.totalRepaid.toLocaleString()}</p>
                                    </div>
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                        loan.status === 'Fully Repaid' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {loan.status}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">No past loans found.</p>
                        )}
                    </ul>
                </div>

            </div>
            
             <div className="space-y-8">
                 <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                     <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4 text-center">Loan Status</h3>
                     {activeLoan ? (
                        <div className="space-y-3 flex flex-col items-center">
                            <CircularProgressBar percentage={loanProgress} />
                            <div className="text-center">
                                <p className="font-bold text-lg">RWF {activeLoan.paid.toLocaleString()} / {activeLoan.total.toLocaleString()}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Next payment due: 2024-08-01</p>
                            </div>
                            <RippleButton onClick={() => setIsRepayModalOpen(true)} className="w-full bg-[#1E90FF] text-white rounded-full">Make a Payment</RippleButton>
                        </div>
                     ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-600 dark:text-gray-400 mb-4">You have no active loans. Need funds for your next project?</p>
                            <RippleButton onClick={() => setIsApplyModalOpen(true)} className="w-full bg-gradient-to-r from-[#1E90FF] to-[#20B2AA] text-white hover:shadow-lg hover:shadow-teal-500/50 rounded-full">Apply Now</RippleButton>
                        </div>
                     )}
                 </div>
            </div>
        </div>
        
        {isApplyModalOpen && <LoanApplicationModal onClose={() => setIsApplyModalOpen(false)} onApply={handleApplyLoan} />}
        {isRepayModalOpen && activeLoan && <LoanRepaymentModal 
            loan={activeLoan} 
            currentBalance={balance}
            onClose={() => setIsRepayModalOpen(false)} 
            onRepay={handleRepayLoan} 
        />}

    </div>
  );
};