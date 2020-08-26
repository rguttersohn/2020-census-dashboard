<template>
  <div id="app">
    <h2 v-if="loadingStates !==''">{{loadingStates}}</h2>
    <Button @button-event="stateClicked" :states="states" />
    <div class="loading-container">
      <h2>{{infoLoading}}</h2>
    </div>
    <div class="dashboard-wrapper">
      <StateInfo :currentState="currentState" :allStates="allStates" />
      <BarChart :currentState="currentState" :currentState_2010="currentState_2010" />
      <PieChart :currentState="currentState" />
    </div>
    <PlotChart :currentState="currentState" :allStates="allStates" />
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import StateInfo from "@/components/StateInfo.vue";
import BarChart from "@/components/BarChart.vue";
import PieChart from "@/components/PieChart.vue";
import PlotChart from "@/components/PlotChart.vue";

export default {
  name: "App",
  components: {
    Button,
    StateInfo,
    BarChart,
    PieChart,
    PlotChart
  },
  data() {
    return {
      states: [],
      currentState: [],
      currentState_2010: [],
      stateKey: "",
      infoLoading: "Click State Button to see response rate data",
      loadingStates: "",
      allStates: []
    };
  },
  methods: {
    stateNames() {
      this.loadingStates = "Loading map";
      const stateURL = fetch(
        "https://api.census.gov/data/2020/dec/responserate?get=NAME,DRRALL,CRRINT,RESP_DATE,CRRALL&for=state:*&key=97309691bae4d51923378713db7ff6909d26028d"
      );
      Promise.all([stateURL])
        .then(values => {
          return Promise.all(values.map(resp => resp.json()));
        })
        .then(([stateData]) => {
          //here we take the statedata and push it to an array to be passed down to child components
          this.allStates.push(stateData);

          //here we break up the data to only show state and its id
          this.loadingStates = "";
          stateData.splice(0, 1);
          let stateFlatArray = [];
          stateData.map(els => stateFlatArray.push(els[0], els[5]));

          //chunk the flat array into a 2d array
          const chunk = (arr, size) =>
            Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
              arr.slice(i * size, i * size + size)
            );
          this.states.push(chunk(stateFlatArray, 2));
        });
    },
    responseData() {
      const responseRateURL = fetch(
        `https://api.census.gov/data/2020/dec/responserate?get=NAME,CRRINT,RESP_DATE,CRRALL&for=state:${this.stateKey}&key=97309691bae4d51923378713db7ff6909d26028d`
      );
      const responseRateURL_2010 = fetch(
        `https://api.census.gov/data/2010/dec/responserate?get=NAME,FSRR2010&for=state:${this.stateKey}&key=97309691bae4d51923378713db7ff6909d26028d`
      );
      this.infoLoading = "loading ...";
      Promise.all([responseRateURL, responseRateURL_2010])
        .then(values => {
          return Promise.all(values.map(resp => resp.json()));
        })
        .then(([responseRate, responseRate_2010]) => {
          this.infoLoading = "";
          this.currentState = [];
          let keys = responseRate.shift();
          this.currentState = responseRate.map(values => {
            return keys.reduce((o, k, i) => {
              o[k] = values[i];
              return o;
            }, {});
          });

          this.currentState_2010 = [];
          keys = responseRate_2010.shift();
          this.currentState_2010 = responseRate_2010.map(values => {
            return keys.reduce((o, k, i) => {
              o[k] = values[i];
              return o;
            }, {});
          });
          this.currentState_2010[0]["CRRALL"] = this.currentState_2010[0][
            "FSRR2010"
          ];
          delete this.currentState_2010[0]["FSRR2010"];

          //adding years
          this.currentState[0].year = "2020";
          this.currentState_2010[0].year = "2010";
        });
    },
    stateClicked(val) {
      this.stateKey = val.dataset.key;
    }
  },
  created() {
    this.stateNames();
  },
  watch: {
    stateKey() {
      this.responseData();
    }
  }
};
</script>

<style>
#app {
  width: 1200px;
  margin: auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.dashboard-wrapper {
  display: flex;
  justify-content: space-evenly;
  width: 1000px;
  margin: auto;
}

.dashboard-wrapper div {
  width: 300px;
  border: 1px solid gainsboro;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(211, 211, 211, 0.378);
}

.loading-container {
  min-height: 50px;
}
</style>
