import React from 'react';
import {shallowEqual, useSelector} from "react-redux";

import {
  Table,
  Paper,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Typography,
  TableContainer,
} from '@material-ui/core';


// TODO: virtualized table?
export default function TransactionTable() {
  const transactions: readonly ITransaction[] = useSelector(
    (state: TransactionState) => state.transactions,
    shallowEqual,
  );

  const transactionsSum: number = useSelector(
    (state: TransactionState) => state.transactions.reduce(
      (sum: number, current: ITransaction) => sum + current.amount, 0
    )
  );
  return (
    <div>
      <Typography color="textSecondary">Общая сумма: {transactionsSum}</Typography>
      <TableContainer component={Paper}>
        <Table aria-label='Transactions table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>От кого</TableCell>
              <TableCell align='center'>Кому</TableCell>
              <TableCell align='center'>Сумма</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction: ITransaction, i: number) => (
              <TableRow key={i}>
                <TableCell component='th' scope='row' align='center'>{transaction.fromAddr}</TableCell>
                <TableCell align='center'>{transaction.toAddr}</TableCell>
                <TableCell align='center'>{transaction.amount}BTC</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

