import React from 'react';
import {shallowEqual, useSelector} from "react-redux";

import {withStyles, Theme, createStyles} from '@material-ui/core/styles';
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


const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

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
      <Typography color="textSecondary">Общая сумма: {transactionsSum}BTC</Typography>
      <TableContainer component={Paper}>
        <Table aria-label='Transactions table'>
          <colgroup>
            <col style={{width: '40%'}}/>
            <col style={{width: '40%'}}/>
            <col style={{width: '20%'}}/>
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell align='left'>От кого</TableCell>
              <TableCell align='left'>Кому</TableCell>
              <TableCell align='left'>Сумма</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction: ITransaction, i: number) => (
              <StyledTableRow key={i}>
                <TableCell component='th' scope='row' align='left'>{transaction.fromAddr}</TableCell>
                <TableCell align='left'>{transaction.toAddr}</TableCell>
                <TableCell align='left'>{transaction.amount}BTC</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

