<template>
  <div class="plot-chart-wrapper">
    <h2>2020 Census Response Rates In Every State, Washington D.C., and Puerto Rico</h2>
    <svg />
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  props: ["allStates"],
  data() {
    return {
      width: 900,
      height: 300,
      margin: { top: 50, bottom: 50, left: 50, right: 50 },
      colors: ["#69b8e1"]
    };
  },
  computed: {
    yScale() {
      return d3
        .scaleLinear()
        .range([0, this.height])
        .domain([80, 20]);
    },
    xScale() {
      return d3
        .scaleBand()
        .range([0, this.width])
        .domain(this.allStates[0].map(d => d[0]))
        .padding(0.5);
    }
  },
  methods: {
    drawPlotChart() {
      d3.select(".plot-chart-wrapper svg")
        .attr("width", this.width + this.margin.left)
        .attr("height", this.height + this.margin.bottom + this.margin.top);

      //x-axis
      d3.select(".plot-chart-wrapper svg")
        .append("g")
        .attr("class", "x-axis")
        .call(d3.axisBottom(this.xScale).tickSize([0]))
        .attr(
          "transform",
          `translate(${this.margin.left},${this.height +
            this.margin.bottom -
            20})`
        );
      d3.select(".x-axis .domain").style("visibility", "hidden");
      d3.selectAll(".x-axis .tick text")
        .attr("text-anchor", "start")
        .attr("transform", "rotate(90)")
        .filter((d, i) => i === 7)
        .text("D.C.");

      //y-axis
      d3.select(".plot-chart-wrapper svg")
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
    },

    drawDots() {
      const vm = this;
      d3.select(".plot-chart-wrapper svg")
        .append("g")
        .attr("class", "dots")
        .attr(
          "transform",
          `translate(${this.margin.left},${this.margin.bottom - 20})`
        )
        .selectAll("circle")
        .data(this.allStates[0])
        .enter()
        .append("circle")
        .attr("r", 5)
        .each(function(d) {
          const xScale = vm.xScale;
          const yScale = vm.yScale;
          d3.select(this)
            .attr("cx", xScale(d[0]))
            .attr("cy", yScale(d[4]));
        })
        .attr("fill", this.colors[0])
        .attr("stroke-width", d => {
          if (d[4] >= 69 || d[4] <= 55) {
            return 1;
          } else {
            return 0;
          }
        })
        .attr("stroke", "black");
    },
    addLabels() {
      const vm = this;
      d3.select(".plot-chart-wrapper svg")
        .append("g")
        .attr("class", "labels")
        .attr(
          "transform",
          `translate(${this.margin.left},${this.margin.bottom - 20})`
        )
        .selectAll("text")
        .data(this.allStates[0])
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .text(d => {
          if (d[4] >= 70 || d[4] <= 55) {
            return d[4] + "%";
          }
        })
        .attr("dy", "-.8em")
        .each(function(d) {
          const xScale = vm.xScale;
          const yScale = vm.yScale;
          d3.select(this)
            .attr("x", xScale(d[0]))
            .attr("y", yScale(d[4]));
        })
        .style("font-size", "12px");
    },
    addStateLabels() {
      const vm = this;
      d3.select(".plot-chart-wrapper svg")
        .append("g")
        .attr("class", "state-labels")
        .attr(
          "transform",
          `translate(${this.margin.left},${this.margin.bottom - 20})`
        )
        .selectAll("text")
        .data(this.allStates[0])
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .text(d => {
          if (d[4] >= 70 || d[4] <= 55) {
            return d[0];
          }
        })
        .attr("dy", "-1.8em")
        .each(function(d) {
          const xScale = vm.xScale;
          const yScale = vm.yScale;
          d3.select(this)
            .attr("x", xScale(d[0]))
            .attr("y", yScale(d[4]));
        })
        .style("font-size", "12px");
    },
    drawLines() {
      let vm = this;
      d3.select(".plot-chart-wrapper svg")
        .append("g")
        .attr("class", "state-lines")
        .attr(
          "transform",
          `translate(${this.margin.left},${this.margin.bottom - 20})`
        )
        .selectAll("line")
        .data(this.allStates[0])
        .enter()
        .append("line")
        .attr("x1", d => vm.xScale(d[0]))
        .attr("x2", d => vm.xScale(d[0]))
        .attr("y1", vm.height - 3)
        .attr("y2", d => vm.yScale(d[4]))
        .attr("stroke", "lightgray");
    }
  },
  watch: {
    allStates() {
      this.drawLines();
      this.drawPlotChart();
      this.drawDots();
      this.addLabels();
      this.addStateLabels();
    }
  }
};
</script>

<style scoped>
.plot-chart-wrapper {
  border: 1px solid gainsboro;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(211, 211, 211, 0.378);
  width: 1000px;
  margin: 5% auto;
}
</style>