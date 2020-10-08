import * as actionTypes from "./actionTypes";

export function addTransaction(transaction: ITransaction) {
  const action: TransactionAction = {
    type: actionTypes.ADD_TRANSACTION,
    transaction: transaction,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
}

export function clearTransactions() {
  const action: TransactionAction = {
    type: actionTypes.CLEAR_TRANSACTIONS,
    transaction: {} as ITransaction,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
}
