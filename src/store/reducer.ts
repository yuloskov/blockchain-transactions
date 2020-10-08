import * as actionTypes from "./actionTypes";

const initialState: TransactionState = {
  transactions: [],
};

const reducer = (
  state: TransactionState = initialState,
  action: TransactionAction
): TransactionState => {
  switch (action.type) {
    case actionTypes.ADD_TRANSACTION:
      const newTransaction: ITransaction = {
        fromAddr: action.transaction.fromAddr,
        toAddr: action.transaction.toAddr,
        amount: action.transaction.amount,
      };
      return {
        ...state,
        // add new transaction to the beginning
        transactions: [newTransaction].concat(state.transactions),
      };
    case actionTypes.CLEAR_TRANSACTIONS:
      return {
        ...state,
        transactions: [],
      };
  }
  return state;
};

export default reducer;