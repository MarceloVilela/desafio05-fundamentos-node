import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    function reducerTransaction(accumulator: number, value: number): number {
      return accumulator + value;
    }

    const transactionsIncome = this.transactions.filter(
      item => item.type === 'income',
    );

    const transactionsOutcome = this.transactions.filter(
      item => item.type === 'outcome',
    );

    const income =
      transactionsIncome.length > 0
        ? transactionsIncome.map(item => item.value).reduce(reducerTransaction)
        : 0;
    const outcome =
      transactionsOutcome.length > 0
        ? transactionsOutcome.map(item => item.value).reduce(reducerTransaction)
        : 0;
    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
