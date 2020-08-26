<template>
  <div class="bar-chart-wrapper">
    <h3
      v-if="currentState[0] !== undefined"
    >2020 response rate vs 2010 response rate in {{currentState[0].NAME}}</h3>
    <svg />
    <p class="date-note" v-if="currentState[0] !== undefined">As of {{date}}</p>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  props: {
    currentState: Array,
    currentState_2010: Array,
    date: String
  },
  data() {
    return {
      width: 300,
      height: 300,
      colors: ["#0099cd", "#de425b"],
      margin: { bottom: 50 },
      mergedResponseRate: []
    };
  },
  computed: {
    yScale() {
      return d3
        .scaleLinear()
        .range([0, this.height])
        .domain([80, 0]);
    },
    xScale() {
      return d3
        .scaleBand()
        .range([0, this.width])
        .domain(this.mergedResponseRate.map(d => d.year))
        .padding(0.5);
    }
  },
  methods: {
    drawChart() {
      d3.select(".bar-chart-wrapper svg")
        .attr("width", this.width)
        .attr("height", this.height + this.margin.bottom);

      d3.selectAll(".bar-chart-wrapper svg *").remove();

      //x-axis
      d3.select(".bar-chart-wrapper svg")
        .append("g")
        .attr("class", "x-axis")
        .call(d3.axisBottom(this.xScale).tickSize([0]))
        .attr(
          "transform",
          `translate(0,${this.height + this.margin.bottom - 20})`
        );
      d3.select(".x-axis .domain").style("visibility", "hidden");

      //y-axis
      d3.select(".bar-chart-wrapper svg")
        .append("g")
        .attr("class", "y-axis")
        .call(
          d3
            .axisRight(this.yScale)
            .tickSize([0])
            .ticks(8)
        )
        .attr("transform", `translate(0,${this.margin.bottom - 20})`);
      d3.select(".y-axis .domain").style("visibility", "hidden");

      // bars
      d3.select(".bar-chart-wrapper svg")
        .append("g")
        .attr("class", "bars")
        .selectAll("rect")
        .data(this.mergedResponseRate)
        .enter()
        .append("rect")
        .attr("width", this.xScale.bandwidth())
        .attr("x", d => this.xScale(d.year))
        .attr("transform", `translate(0,${this.margin.bottom - 20})`)
        .attr("fill", (d, i) => this.colors[i])
        .attr("height", this.height - this.yScale(0)) // always equal to 0
        .attr("y", this.yScale(0))
        .transition()
        .duration(1000)
        .attr("height", d => this.height - this.yScale(d.CRRALL))
        .attr("y", d => {
          return this.yScale(d.CRRALL)
        })
        .delay((d,i)=>i*100);
    },
    createChartLabels() {
      d3.select(".bar-chart-wrapper svg")
        .append("g")
        .attr("transform", `translate(0,${this.margin.bottom - 20})`)
        .attr("class", "bar-chart-labels")
        .selectAll("text")
        .data(this.mergedResponseRate)
        .enter()
        .append("text")
        .text(d => d.CRRALL + "%")
        .attr("text-anchor", "middle")
        .attr("x", d => this.xScale(d.year) + this.xScale.bandwidth() / 2)
        .attr("y", d => this.yScale(d.CRRALL))
        .attr("dy", "1.3em")
        .attr("fill", "white");
    },
    handleData() {
      this.mergedResponseRate = [];
      this.mergedResponseRate.push(
        this.currentState[0],
        this.currentState_2010[0]
      );
    }
  },
  watch: {
    currentState() {
      this.handleData();
    },
    mergedResponseRate() {
      this.drawChart();
      this.createChartLabels();
    }
  }
};
</script>

<style scoped>
</style>