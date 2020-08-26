<template>
  <div class="pie-chart-wrapper">
    <h3 v-if="currentState[0] !== undefined">
      <span :style="{color:colors[0]}">Internet responses</span> and
      <span :style="{color:colors[1]}">traditional responses</span>
      in {{currentState[0].NAME}}
    </h3>
    <svg />
    <p v-if="currentState[0] !== undefined" class="date-note">As of {{date}}</p>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  props: {
    currentState: Array,
    date: String
  },
  data() {
    return {
      colors: ["#0099cd", "#60bcda", "white"],
      height: 250,
      width: 250,
      margin: 25,
      currentStateArray: [],
      pie: "",
      arc: ""
    };
  },
  methods: {
    createPie() {
      this.pie = d3
        .pie() //this will create arc data for us given a list of values
        .value(d => d)(this.currentStateArray);
    },
    turnToArray() {
      this.currentStateArray = [];
      this.currentStateArray.push(
        parseFloat(this.currentState[0].CRRINT),
        parseFloat(this.currentState[0].CRRALL) -
          parseFloat(this.currentState[0].CRRINT)
      );
    },
    createArc() {
      this.arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(this.width / 2)
        .padAngle(0.05)
        .padRadius(1);
    },
    chartFixed() {
      d3.select(".pie-chart-wrapper svg")
        .attr("width", this.width + this.margin * 2)
        .attr("height", this.height + this.margin)
        .append("g")
        .attr("class", "pie-chart")
        .attr(
          "transform",
          `translate(${this.width / 2 + this.margin},${this.height / 2 +
            this.margin})`
        );
    },
    drawPie() {
      d3.select(".pie-chart")
        .selectAll("path")
        .data(this.pie)
        .enter()
        .append("path")
        .attr("fill", (d, i) => this.colors[i])
        .style("stroke", "gray");
    },
    animatePie() {
      d3.selectAll(".pie-chart path")
        .transition()
        .duration(1000)
        .attr("d", this.arc);
    },
    pieLabel() {
      let thisArc = this.arc;
      let formatDecimal = d3.format(".1f");
      d3.select(".pie-chart-wrapper svg")
        .append("g")
        .attr("class", "pie-chart-labels")
        .attr(
          "transform",
          `translate(${this.width / 2 + this.margin},${this.height / 2 +
            this.margin})`
        )
        .selectAll("text")
        .data(this.pie)
        .enter()
        .append("text")
        .style("fill", "black")
        .attr("text-anchor", "middle")
        .text(d => formatDecimal(d.data) + "%")
        .attr("x", d => thisArc.centroid(d)[0])
        .attr("y", d => thisArc.centroid(d)[1])
        .style("fill", this.colors[2])
        .style("font-weight", "bold")
        .attr("opacity", 0)
        .transition()
        .duration(1000)
        .attr("opacity", 1)
        .delay(100);
    },
    removeLabel() {
      d3.select(".pie-chart-labels").remove();
    }
  },
  watch: {
    currentState() {
      this.turnToArray();
    },
    currentStateArray() {
      this.createPie();
      this.createArc();
      this.chartFixed();
      this.drawPie();
      this.animatePie();
      this.removeLabel();
      this.pieLabel();
    }
  }
};
</script>

<style scoped>
.pie-chart-wrapper h3 {
  margin-bottom: 0;
}
</style>