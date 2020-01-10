/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import getWeb3 from '@/utils/getWeb3';
import MetaCoin from '@/contracts/MetaCoin.json';
Vue.use(Vuex);

export default new Vuex.Store({
  state: { web3: null, account: null, balance: null, metaCoin: null },
  mutations: {
    setWeb3(state, payload) {
      state.web3 = payload.web3;
    },
    setAccount(state, payload) {
      state.account = payload.account;
    },
    setMetaCoin(state, payload) {
      state.metaCoin = payload.metaCoin;
    },
    setNewAmount(state, payload) {
      state.balance = state.balance - payload.amount;
    },
    setBalance(state, payload) {
      state.balance = payload.balance;
    }
  },
  actions: {
    async setWeb3({ commit }) {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      window.web3.version.getNetwork((e, netId) => {
        if (netId !== '3') {
          alert('Unknown network, please change network to Ropsten testnet network');
          return;
        }
      });
      if (accounts.length > 0) {
        const account = accounts[0];
        commit('setWeb3', { web3: web3 });
        commit('setAccount', { account: account });
      } else {
        console.log('Account not found');
      }
    },
    async initContarct({ commit, state }) {
      const web3 = state.web3;
      const networkId = 3;
      const metaCoin = new web3.eth.Contract(MetaCoin.abi, MetaCoin.networks[networkId].address, {
        transactionConfirmationBlocks: 1
      });
      commit('setMetaCoin', { metaCoin: metaCoin });
    },
    async sendCoin({ commit, state }, params) {
      const metaCoin = state.metaCoin;
      const account = state.account;
      let amount = params.amount;
      let receiver = params.receiver;
      metaCoin.methods
        .sendCoin(receiver, amount)
        .send({ from: account })
        .on('confirmation', () => {
          commit('setNewAmount', { amount: amount });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getBalance({ commit, state }) {
      const metaCoin = state.metaCoin;
      const account = state.account;
      let balance = await metaCoin.methods.getBalance(account).call({ from: account });
      console.log(balance);
      commit('setBalance', { balance: balance });
    }
  },
  getters: {}
});
