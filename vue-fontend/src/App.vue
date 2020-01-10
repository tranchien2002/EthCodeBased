<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <p>Account: {{this.account}}</p>
    <p>Balance: {{this.balance}}</p>
    <input v-model="receiver" placeholder="Receiver">
    <input v-model="amount" placeholder="Receiver">
    <button v-on:click="send">Submit</button>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapActions, mapState } from "vuex";

export default {
  name: "app",
  components: {},
  data() {
    return { receiver: "", amount: "" };
  },
  computed: { ...mapState(["balance", "account"]) },
  methods: {
    ...mapActions(["setWeb3", "initContarct", "getBalance", "sendCoin"]),
    send: async function() {
      await this.sendCoin({ receiver: this.receiver, amount: this.amount });
    }
  },
  async mounted() {
    await this.setWeb3();
    await this.initContarct();
    await this.getBalance();
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
