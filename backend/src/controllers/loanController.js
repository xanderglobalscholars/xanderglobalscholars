const Loan = require('../models/Loan');

// Apply for loan
exports.applyLoan = async (req, res) => {
  try {
    const { studentId, amount, interestRate, repaymentPeriod } = req.body;

    const newLoan = new Loan({
      studentId,
      amount,
      interestRate,
      repaymentPeriod
    });

    await newLoan.save();
    res.status(201).json({ message: 'Loan application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View loan details
exports.viewLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate('studentId');
    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Repay loan
exports.repayLoan = async (req, res) => {
  try {
    const { loanId, amountPaid } = req.body;
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    const remainingBalance = loan.amount + (loan.amount * loan.interestRate / 100) - amountPaid;

    loan.repayments.push({
      paymentDate: new Date(),
      amountPaid,
      remainingBalance
    });

    loan.amount = remainingBalance; // Update loan amount

    await loan.save();
    res.status(200).json({ message: 'Repayment successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
