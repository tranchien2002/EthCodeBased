import getWeb3 from 'utils/getWeb3';
import Factory from 'contracts/MetaCoin.json';
export const WEB3_CONNECT = 'WEB3_CONNECT';
export const web3Connect = () => async (dispatch) => {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  if (web3.currentProvider.connection.networkVersion !== '3') {
    alert('Unknown network, please change network to Ropsten network');
    return;
  }
  if (accounts.length > 0) {
    const account = accounts[0];
    dispatch({
      type: WEB3_CONNECT,
      web3,
      account
    });
  } else {
    console.log('Account not found');
  }
};

export const INIT_CONTRACT = 'INIT_CONTRACT';
export const instantiateContracts = () => async (dispatch, getState) => {
  const state = getState();
  let web3 = state.web3;
  const networkId = process.env.REACT_APP_NETWORK_ID;
  let metaCoinAddress = Factory.networks[networkId].address;
  let metaCoin = new web3.eth.Contract(Factory.abi, metaCoinAddress, {
    transactionConfirmationBlocks: 1
  });
  dispatch({
    type: INIT_CONTRACT,
    metaCoin
  });
};

export const SEND_COIN = 'SEND_COIN';
export const sendCoin = (receiver, amount) => async (dispatch, getState) => {
  const state = getState();
  const metaCoin = state.metaCoin;
  const account = state.account;
  console.log(receiver);
  await metaCoin.methods
    .sendCoin(receiver, amount)
    .send({ from: account })
    .then(() => {
      console.log('success');
    })
    .catch((e) => {
      console.log(e);
    });
};

export const GET_BALANCE = 'GET_BALANCE';
export const getBalance = () => async (dispatch, getState) => {
  const state = getState();
  const metaCoin = state.metaCoin;
  const account = state.account;
  if (!metaCoin) {
    return;
  }
  let balance = await metaCoin.methods.getBalance(account).call({ from: account });
  dispatch({
    type: GET_BALANCE,
    balance: balance.toNumber()
  });
};
