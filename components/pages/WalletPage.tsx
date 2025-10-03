import React, { useState, useMemo, useEffect } from 'react';
import { RippleButton } from '../common/RippleButton';
import { XIcon, CheckCircleIcon, PlusIcon } from '../IconComponents';
import { Loan, SavingsGoal } from '../../types';

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
                <circle className="text-brand-secondary transition-all duration-500 ease-out" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx={size/2} cy={size/2} />
            </svg>
            <span className="absolute text-xl font-bold font-display text-brand-secondary">{Math.round(percentage)}%</span>
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
        setTimeout(() => {
            onApply(amount, term);
            setStep(2);
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[100] p-4 animate-fade-in-up">
            <div className="w-full max-w-lg glass-card rounded-3xl shadow-2xl p-8 relative" onClick={e => e.stopPropagation()}>
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
                        <RippleButton onClick={handleSubmit} className="w-full text-white bg-gradient-to-r from-brand-primary to-brand-secondary disabled:opacity-75 rounded-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Confirm Application'}
                        </RippleButton>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 animate-scale-in" />
                        <h3 className="mt-4 text-2xl font-bold font-display">Application Submitted!</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Your loan application is under review. You will be notified shortly.</p>
                        <RippleButton onClick={onClose} className="w-full mt-6 text-white bg-brand-primary rounded-full">Close</RippleButton>
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
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[100] p-4 animate-fade-in-up">
            <div className="w-full max-w-lg glass-card rounded-3xl shadow-2xl p-8 relative" onClick={e => e.stopPropagation()}>
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
                                <button onClick={() => setAmount(remaining)} className="text-sm font-semibold text-brand-primary hover:underline">Pay Full Amount</button>
                            </div>
                            <input 
                                type="number" 
                                value={amount} 
                                onChange={e => setAmount(Number(e.target.value))} 
                                max={remaining}
                                min="1"
                                className={`w-full mt-1 p-2 rounded-md bg-gray-100 dark:bg-gray-700 border ${error ? 'border-red-500' : 'border-transparent'} focus:ring-2 focus:ring-brand-primary`}
                            />
                            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                        </div>
                        <RippleButton 
                            onClick={handleRepay} 
                            className="w-full text-white bg-gradient-to-r from-brand-primary to-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
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
                        <RippleButton onClick={onClose} className="w-full mt-6 text-white bg-brand-primary rounded-full">Close</RippleButton>
                    </div>
                 )}
            </div>
        </div>
    );
};

// --- Add Savings Goal Modal ---
const AddSavingsGoalModal: React.FC<{ onClose: () => void; onAdd: (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => void; }> = ({ onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [targetAmount, setTargetAmount] = useState(50000);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onAdd({ name, targetAmount });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[100] p-4 animate-fade-in-up">
            <div className="w-full max-w-lg glass-card rounded-3xl shadow-2xl p-8 relative" onClick={e => e.stopPropagation()}>
                 <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"><XIcon className="w-6 h-6"/></button>
                 <h3 className="text-3xl font-bold font-display text-center mb-4">New Savings Goal</h3>
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="font-semibold block mb-1">Goal Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., New Laptop" required className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                    </div>
                    <div>
                        <label className="font-semibold">Target Amount: RWF {targetAmount.toLocaleString()}</label>
                        <input type="range" min="10000" max="1000000" step="10000" value={targetAmount} onChange={e => setTargetAmount(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
                    </div>
                    <RippleButton type="submit" className="w-full text-white bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full">
                        Add Goal
                    </RippleButton>
                 </form>
            </div>
        </div>
    );
};

// --- Contribute to Goal Modal ---
const ContributeToGoalModal: React.FC<{ 
    goal: SavingsGoal; 
    currentBalance: number; 
    onClose: () => void; 
    onContribute: (goalId: string, amount: number) => void; 
}> = ({ goal, currentBalance, onClose, onContribute }) => {
    const remaining = goal.targetAmount - goal.currentAmount;
    const [amount, setAmount] = useState(Math.min(10000, remaining > 0 ? remaining : 10000));
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (amount <= 0) {
            setError('Amount must be positive.');
        } else if (amount > remaining) {
            setError(`Amount cannot exceed the remaining RWF ${remaining.toLocaleString()}.`);
        } else if (amount > currentBalance) {
            setError('Insufficient wallet balance.');
        } else {
            setError('');
        }
    }, [amount, remaining, currentBalance]);

    const handleConfirm = () => {
        if (error || isSubmitting) return;
        setIsSubmitting(true);
        setTimeout(() => {
            onContribute(goal.id, amount);
            setStep(2);
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[100] p-4 animate-fade-in-up">
            <div className="w-full max-w-lg glass-card rounded-3xl shadow-2xl p-8 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"><XIcon className="w-6 h-6"/></button>
                <h3 className="text-3xl font-bold font-display text-center mb-4">Contribute to Goal</h3>
                {step === 1 ? (
                    <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900/50 text-center">
                            <p className="text-gray-600 dark:text-gray-400">Contributing to</p>
                            <p className="text-xl font-bold">{goal.name}</p>
                            <p className="text-sm">Remaining: RWF {remaining.toLocaleString()}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Contribution Amount</label>
                            <input 
                                type="number" 
                                value={amount} 
                                onChange={e => setAmount(Number(e.target.value))}
                                max={remaining}
                                min="1"
                                className={`w-full mt-1 p-2 rounded-md bg-gray-100 dark:bg-gray-700 border ${error ? 'border-red-500' : 'border-transparent'} focus:ring-2 focus:ring-brand-primary`}
                            />
                            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                        </div>
                        <RippleButton 
                            onClick={handleConfirm} 
                            className="w-full text-white bg-gradient-to-r from-brand-primary to-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
                            disabled={!!error || amount === 0 || isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : 'Add to Goal'}
                        </RippleButton>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 animate-scale-in" />
                        <h3 className="mt-4 text-2xl font-bold font-display">Contribution Successful!</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">You're one step closer to your goal.</p>
                        <RippleButton onClick={onClose} className="w-full mt-6 text-white bg-brand-primary rounded-full">Close</RippleButton>
                    </div>
                )}
            </div>
        </div>
    );
};


interface WalletPageProps {
  showNotification: (title: string, message: string) => void;
}

export const WalletPage: React.FC<WalletPageProps> = ({ showNotification }) => {
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [isRepayModalOpen, setIsRepayModalOpen] = useState(false);
    const [isSavingsModalOpen, setIsSavingsModalOpen] = useState(false);
    const [goalToContribute, setGoalToContribute] = useState<SavingsGoal | null>(null);
    const [balance, setBalance] = useState(150450);
    const [activeLoan, setActiveLoan] = useState<{ total: number, paid: number } | null>(null);
    const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([
      { id: '1', name: 'New Smartphone', targetAmount: 300000, currentAmount: 120000 }
    ]);

    const handleApplyLoan = (amount: number, term: number) => {
        const interest = amount * 0.15 * (term / 12);
        setActiveLoan({ total: amount + interest, paid: 0 });
        showNotification('Success!', 'Your loan application has been submitted for review.');
    };

    const handleRepayLoan = (amount: number) => {
        if (!activeLoan) return;
        
        setBalance(prev => prev - amount);
        
        const newPaidAmount = Math.min(activeLoan.paid + amount, activeLoan.total);
        if (newPaidAmount >= activeLoan.total) {
            setActiveLoan(null);
            showNotification('Congratulations!', 'You have fully repaid your loan.');
        } else {
            setActiveLoan({ ...activeLoan, paid: newPaidAmount });
            showNotification('Payment Received', `Your payment of RWF ${amount.toLocaleString()} has been processed.`);
        }
    };
    
    const handleAddSavingsGoal = (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => {
        const newGoal: SavingsGoal = {
            ...goal,
            id: Date.now().toString(),
            currentAmount: 0,
        };
        setSavingsGoals(prev => [...prev, newGoal]);
        setIsSavingsModalOpen(false);
        showNotification('Goal Set!', `Your new savings goal "${goal.name}" has been created.`);
    };

    const handleContributeToGoal = (goalId: string, amount: number) => {
        setBalance(prev => prev - amount);
        setSavingsGoals(prevGoals =>
            prevGoals.map(g =>
                g.id === goalId ? { ...g, currentAmount: g.currentAmount + amount } : g
            )
        );
        const goalName = savingsGoals.find(g => g.id === goalId)?.name || 'your goal';
        showNotification('Success!', `You contributed RWF ${amount.toLocaleString()} to "${goalName}".`);
        setGoalToContribute(null);
    };
    
    const loanProgress = activeLoan ? (activeLoan.paid / activeLoan.total) * 100 : 0;
    
  return (
    <div className="space-y-8 animate-fade-in">
        <div>
            <h1 className="text-4xl font-bold font-display text-text-primary-light dark:text-text-primary-dark">My Wallet</h1>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">Manage your funds, loans, and savings goals.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-2xl shadow-blue-500/30">
                    <p className="text-lg opacity-80">Current Balance</p>
                    <p className="text-5xl font-bold font-display mt-2">RWF {balance.toLocaleString()}</p>
                    <div className="flex space-x-4 mt-8">
                        <RippleButton className="bg-white/20 hover:bg-white/30 text-white rounded-full">Deposit</RippleButton>
                        <RippleButton onClick={() => activeLoan ? setIsRepayModalOpen(true) : setIsApplyModalOpen(true)} className="bg-white/20 hover:bg-white/30 text-white rounded-full">
                            {activeLoan ? 'Repay Loan' : 'Apply for Loan'}
                        </RippleButton>
                    </div>
                </div>

                <div className="p-6 rounded-2xl card">
                     <h3 className="text-xl font-bold font-display text-text-primary-light dark:text-text-primary-dark mb-4">Recent Transactions</h3>
                     <ul className="space-y-3">
                        {mockTransactions.map(tx => (
                            <li key={tx.id} className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-900/50 rounded-lg">
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
            </div>
            
             <div className="space-y-8">
                 <div className="p-6 rounded-2xl card">
                     <h3 className="text-xl font-bold font-display text-text-primary-light dark:text-text-primary-dark mb-4 text-center">Loan Status</h3>
                     {activeLoan ? (
                        <div className="space-y-3 flex flex-col items-center">
                            <CircularProgressBar percentage={loanProgress} />
                            <div className="text-center">
                                <p className="font-bold text-lg">RWF {activeLoan.paid.toLocaleString()} / {activeLoan.total.toLocaleString()}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Next payment due: 2024-08-01</p>
                            </div>
                            <RippleButton onClick={() => setIsRepayModalOpen(true)} className="w-full bg-brand-primary text-white rounded-full">Make a Payment</RippleButton>
                        </div>
                     ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-600 dark:text-gray-400 mb-4">You have no active loans. Need funds for your next project?</p>
                            <RippleButton onClick={() => setIsApplyModalOpen(true)} className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-lg hover:shadow-cyan-500/50 rounded-full">Apply Now</RippleButton>
                        </div>
                     )}
                 </div>
                 <div className="p-6 rounded-2xl card">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold font-display text-text-primary-light dark:text-text-primary-dark">Savings Goals</h3>
                        <button onClick={() => setIsSavingsModalOpen(true)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><PlusIcon className="w-5 h-5"/></button>
                     </div>
                     <div className="space-y-4">
                        {savingsGoals.length > 0 ? savingsGoals.map(goal => {
                            const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
                            const goalReached = progress >= 100;
                            return (
                                <div key={goal.id}>
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="font-semibold text-sm">{goal.name}</span>
                                        <span className="text-xs text-gray-500">RWF {goal.currentAmount.toLocaleString()} / {goal.targetAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                        <div className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full" style={{width: `${progress}%`}}></div>
                                    </div>
                                    {!goalReached && (
                                        <RippleButton onClick={() => setGoalToContribute(goal)} className="w-full mt-3 text-xs font-semibold text-brand-primary bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-900 rounded-full">
                                            Add Funds
                                        </RippleButton>
                                    )}
                                </div>
                            )
                        }) : <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-4">No savings goals yet. Click the '+' to create one!</p>}
                     </div>
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
        {isSavingsModalOpen && <AddSavingsGoalModal onClose={() => setIsSavingsModalOpen(false)} onAdd={handleAddSavingsGoal} />}
        {goalToContribute && <ContributeToGoalModal 
            goal={goalToContribute}
            currentBalance={balance}
            onClose={() => setGoalToContribute(null)}
            onContribute={handleContributeToGoal}
        />}

    </div>
  );
};