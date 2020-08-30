<template>
  <div id="app">
    <h1 class="title">2020 Census Response Rates</h1>
    <h2 v-if="loadingStates !==''">{{loadingStates}}</h2>
    <Map @button-event="stateClicked" :currentState="currentState" />
    <div class="loading-container">
      <h2>{{infoLoading}}</h2>
    </div>
    <div class="dashboard-wrapper">
      <StateInfo :date="dateRetrieved" :currentState="currentState" :allStates="allStates" />
      <BarChart
        :date="dateRetrieved"
        :currentState="currentState"
        :currentState_2010="currentState_2010"
      />
      <PieChart :date="dateRetrieved" :currentState="currentState" />
    </div>
    <PlotChart
      @dot-event="stateClicked"
      :date="dateRetrieved"
      :currentState="currentState"
      :allStates="allStates"
    />
  </div>
</template>

<script>
import Map from "@/components/Map.vue";
import StateInfo from "@/components/StateInfo.vue";
import BarChart from "@/components/BarChart.vue";
import PieChart from "@/components/PieChart.vue";
import PlotChart from "@/components/PlotChart.vue";

export default {
  name: "App",
  components: {
    Map,
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
      allStates: [],
      dateRetrieved: ""
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
          [this.dateRetrieved] = [stateData[1][3]];

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
  width: 95vw;
  margin: auto;
  display: block;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.title {
  text-align: center;
  text-transform: uppercase;
  margin: auto;
  font-weight:bold;
  font-family:Helvetica,sans-serif
}

.dashboard-wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  width: 93vw;
  max-width: 1200px;
  margin: auto;
}

.dashboard-wrapper > div {
  width: 30%;
  border: 1px solid gainsboro;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(211, 211, 211, 0.378);
}

.loading-container {
  min-height: 50px;
}

.date-note {
  font-size: 90%;
  font-style: italic;
}

@media screen and (max-width: 1000px) {
  /* .dashboard-wrapper {
    justify-content: space-between;
  } */
  .dashboard-wrapper > div {
    margin: 2% 0;
  }
  .dashboard-wrapper > div:nth-child(3) {
    width: 93vw;
  }
  .dashboard-wrapper > div:nth-child(1),
  .dashboard-wrapper > div:nth-child(2) {
    width: 45vw;
  }
}

@media screen and (max-width: 670px) {
  .dashboard-wrapper > div {
    width: 93vw !important;
  }
}
</style>
