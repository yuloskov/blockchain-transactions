interface ITransaction {
  fromAddr: string[]
  toAddr: string[]
  amount: number
}

type TransactionState = {
  transactions: ITransaction[]
}

type TransactionAction = {
  type: string
  transaction: ITransaction
}

type DispatchType = (args: TransactionAction) => TransactionAction