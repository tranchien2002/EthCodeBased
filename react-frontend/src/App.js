import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import * as actions from 'actions';

function App() {
  const dispatch = useDispatch();
  const { balance, account } = useSelector((state) => ({
    balance: state.balance,
    account: state.account
  }));
  const [amount, setAmount] = useState('');
  const [receiver, setReceiver] = useState('');

  useEffect(() => {
    async function fetWeb3Init() {
      await dispatch(actions.web3Connect());
      await dispatch(actions.instantiateContracts());
    }

    function getBalance() {
      setInterval(() => {
        dispatch(actions.getBalance());
      }, 2000);
    }

    fetWeb3Init();
    getBalance();
  }, [dispatch]);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          <b>Account: </b> <i>{account}</i>
        </p>
        <br />
        <p>Balance: {balance}</p>
        <label>
          Receiver:
          <input
            type='text'
            value={receiver}
            onChange={(e) => {
              setReceiver(e.target.value);
            }}
          />
        </label>
        <label>
          Amount:
          <input
            type='text'
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </label>
        <button
          onClick={() => {
            dispatch(actions.sendCoin(receiver, amount));
          }}
        >
          Submit
        </button>
      </header>
    </div>
  );
}

export default App;
