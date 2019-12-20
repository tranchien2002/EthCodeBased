import * as actions from 'actions';

const initialState = {
  web3: null,
  account: null,
  balance: null,
  metaCoin: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.WEB3_CONNECT:
      return {
        ...state,
        web3: action.web3,
        account: action.account
      };
    case actions.INIT_CONTRACT:
      return {
        ...state,
        metaCoin: action.metaCoin
      };
    case actions.GET_BALANCE:
      return {
        ...state,
        balance: action.balance
      };
    default:
      return state;
  }
};

export default rootReducer;
