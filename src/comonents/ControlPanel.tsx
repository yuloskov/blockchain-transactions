import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import React, {useEffect, useCallback} from 'react';

import {Button, ButtonGroup} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

import {addTransaction, clearTransactions} from '../store/actionCreators';

const useStyles = makeStyles({
  buttonGroup: {
    justifyContent: 'center',
    display: 'flex',
  }
});

export default function ControlPanel() {
  const dispatch: Dispatch<any> = useDispatch();
  const ws = new WebSocket('wss://ws.blockchain.info/inv');

  const classes = useStyles();

  const addTrans = useCallback(
    (transaction: ITransaction) => dispatch(addTransaction(transaction)),
    [dispatch]
  );

  const clearTrans = useCallback(
    () => dispatch(clearTransactions()),
    [dispatch]
  );

  useEffect(() => {
    ws.onopen = () => {
      console.log('connected');
    };

    ws.onmessage = evt => {
      const message = JSON.parse(evt.data);

      const inputs = message.x.inputs;
      const outputs = message.x.out;
      if (inputs.length === 0 || outputs.length === 0) {
        return;
      }

      const transaction = {
        fromAddr: inputs[0].prev_out.addr,
        toAddr: outputs[0].addr,
        amount: outputs[0].value / 100000000, // divide to get BTC from satoshi
      };
      console.log(message)
      addTrans(transaction);
    };

    ws.onclose = () => {
      console.log('disconnected');
    };
  });

  function subscribe() {
    const data = {'op': 'unconfirmed_sub'};
    try {
      ws.send(JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  function unsubscribe() {
    const data = {'op': 'unconfirmed_unsub'};
    try {
      ws.send(JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ButtonGroup className={classes.buttonGroup} color='primary' aria-label='outlined primary button group'>
        <Button onClick={subscribe}>Запуск</Button>
        <Button onClick={unsubscribe}>Остановка</Button>
        <Button onClick={clearTrans}>Сброс</Button>
      </ButtonGroup>
    </div>
  );
}
