<template>
  <div class="state-info-wrapper">
    <h2 v-if="currentState[0] !== undefined">{{currentState[0].NAME}}</h2>
    <h3 v-if="currentState[0] !== undefined">Self Response Rate: {{currentState[0].CRRALL}}%</h3>
    <div v-if="stateRank !== ''" class="response-rate-rank">
      <h3>Rank:</h3>
      <p>
        <span>{{stateRank}}</span> out of 52
        (including Puerto Rico and Washington D.C.)
      </p>
    </div>
    <p class="date-note" v-if="currentState[0] !== undefined">As of {{date}}</p>
  </div>
</template>
<script>
export default {
  props: {
    currentState: Array,
    allStates: Array,
    date: String
  },
  data() {
    return {
      statesSorted: "",
      stateRank: ""
    };
  },
  methods: {
    sortStates() {
      this.statesSorted = this.allStates[0]
        .slice()
        .sort((a, b) => parseFloat(a[4]) - parseFloat(b[4]))
        .reverse();
    },
    findRank() {
      this.statesSorted.forEach(state => {
        if (this.currentState[0].NAME === state[0]) {
          this.stateRank = this.statesSorted.indexOf(state) + 1;
        }
      });
    }
  },
  watch: {
    currentState() {
      this.sortStates();
      this.findRank();
    }
  }
};
</script>

<style scoped>

.response-rate-rank p span {
  font-size: 48px;
  font-weight: bold;
  display: block;
}
</style>