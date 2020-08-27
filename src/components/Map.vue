<template>
  <div class="map-wrapper">
    <svg />
  </div>
</template>

<script>
import * as topojson from "topojson-client";
import * as d3 from "d3";

export default {
  data() {
    return {
      usMap: "",
      width: 1000,
      height: 500,
      margin: { left: 50, right: 50, top: 50, bottom: 100 },
      colors: [
        "#004c6d",
        "#26617e",
        "#40768f",
        "#5a8ca0",
        "#74a3b1",
        "#8fb9c3",
        "#abd0d6",
        "#c8e8ea",
        "#e5ffff"
      ]
    };
  },
  computed: {
    projection() {
      return this.albersUsaPr();
    },
    geoPath() {
      return d3.geoPath().projection(this.projection);
    }
  },
  methods: {
    albersUsaPr() {
      var epsilon = 1e-6;

      var lower48 = d3.geoAlbers();

      // EPSG:3338
      var alaska = d3
        .geoConicEqualArea()
        .rotate([154, 0])
        .center([-2, 58.5])
        .parallels([55, 65]);

      // ESRI:102007
      var hawaii = d3
        .geoConicEqualArea()
        .rotate([157, 0])
        .center([-3, 19.9])
        .parallels([8, 18]);

      // XXX? You should check that this is a standard PR projection!
      var puertoRico = d3
        .geoConicEqualArea()
        .rotate([66, 0])
        .center([0, 18])
        .parallels([8, 18]);

      var point,
        pointStream = {
          point: function(x, y) {
            point = [x, y];
          }
        },
        lower48Point,
        alaskaPoint,
        hawaiiPoint,
        puertoRicoPoint;

      function albersUsa(coordinates) {
        var x = coordinates[0],
          y = coordinates[1];
        point = null;
        (lower48Point(x, y), point) ||
          (alaskaPoint(x, y), point) ||
          (hawaiiPoint(x, y), point) ||
          (puertoRicoPoint(x, y), point);
        return point;
      }

      albersUsa.invert = function(coordinates) {
        var k = lower48.scale(),
          t = lower48.translate(),
          x = (coordinates[0] - t[0]) / k,
          y = (coordinates[1] - t[1]) / k;
        return (y >= 0.12 && y < 0.234 && x >= -0.425 && x < -0.214
          ? alaska
          : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115
          ? hawaii
          : y >= 0.204 && y < 0.234 && x >= 0.32 && x < 0.38
          ? puertoRico
          : lower48
        ).invert(coordinates);
      };

      // A naïve multi-projection stream.
      // The projections must have mutually exclusive clip regions on the sphere,
      // as this will avoid emitting interleaving lines and polygons.
      albersUsa.stream = function(stream) {
        var lower48Stream = lower48.stream(stream),
          alaskaStream = alaska.stream(stream),
          hawaiiStream = hawaii.stream(stream),
          puertoRicoStream = puertoRico.stream(stream);
        return {
          point: function(x, y) {
            lower48Stream.point(x, y);
            alaskaStream.point(x, y);
            hawaiiStream.point(x, y);
            puertoRicoStream.point(x, y);
          },
          sphere: function() {
            lower48Stream.sphere();
            alaskaStream.sphere();
            hawaiiStream.sphere();
            puertoRicoStream.sphere();
          },
          lineStart: function() {
            lower48Stream.lineStart();
            alaskaStream.lineStart();
            hawaiiStream.lineStart();
            puertoRicoStream.lineStart();
          },
          lineEnd: function() {
            lower48Stream.lineEnd();
            alaskaStream.lineEnd();
            hawaiiStream.lineEnd();
            puertoRicoStream.lineEnd();
          },
          polygonStart: function() {
            lower48Stream.polygonStart();
            alaskaStream.polygonStart();
            hawaiiStream.polygonStart();
            puertoRicoStream.polygonStart();
          },
          polygonEnd: function() {
            lower48Stream.polygonEnd();
            alaskaStream.polygonEnd();
            hawaiiStream.polygonEnd();
            puertoRicoStream.polygonEnd();
          }
        };
      };

      albersUsa.precision = function(_) {
        if (!arguments.length) return lower48.precision();
        lower48.precision(_);
        alaska.precision(_);
        hawaii.precision(_);
        puertoRico.precision(_);
        return albersUsa;
      };

      albersUsa.scale = function(_) {
        if (!arguments.length) return lower48.scale();
        lower48.scale(_);
        alaska.scale(_ * 0.35);
        hawaii.scale(_);
        puertoRico.scale(_);
        return albersUsa.translate(lower48.translate());
      };

      albersUsa.translate = function(_) {
        if (!arguments.length) return lower48.translate();
        var k = lower48.scale(),
          x = +_[0],
          y = +_[1];

        lower48Point = lower48
          .translate(_)
          .clipExtent([
            [x - 0.455 * k, y - 0.238 * k],
            [x + 0.455 * k, y + 0.238 * k]
          ])
          .stream(pointStream).point;

        alaskaPoint = alaska
          .translate([x - 0.307 * k, y + 0.201 * k])
          .clipExtent([
            [x - 0.425 * k + epsilon, y + 0.12 * k + epsilon],
            [x - 0.214 * k - epsilon, y + 0.234 * k - epsilon]
          ])
          .stream(pointStream).point;

        hawaiiPoint = hawaii
          .translate([x - 0.205 * k, y + 0.212 * k])
          .clipExtent([
            [x - 0.214 * k + epsilon, y + 0.166 * k + epsilon],
            [x - 0.115 * k - epsilon, y + 0.234 * k - epsilon]
          ])
          .stream(pointStream).point;

        puertoRicoPoint = puertoRico
          .translate([x + 0.35 * k, y + 0.224 * k])
          .clipExtent([
            [x + 0.32 * k, y + 0.204 * k],
            [x + 0.38 * k, y + 0.234 * k]
          ])
          .stream(pointStream).point;

        return albersUsa;
      };

      return albersUsa.scale(1000);
    },
    createUSMap() {
      let statesURL = fetch("tl_2019_us_state.json");
      Promise.all([statesURL])
        .then(values => {
          return Promise.all(values.map(resp => resp.json()));
        })
        .then(([statesMapData]) => {
          const vm = this;
          vm.usMap = topojson.feature(statesMapData, {
            type: "GeometryCollection",
            geometries: statesMapData.objects.tl_2019_us_state.geometries
          });
        });
    },
    createMap() {
      d3.select(".map-wrapper svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height)
        .append("g")
        .attr("class", "state-paths")
        .selectAll("path")
        .data(this.usMap.features)
        .enter()
        .append("path")
        .attr("d", this.geoPath);
    },
    addStateNames() {
      d3.selectAll(".state-paths path")
        .data(this.usMap.features)
        .attr("data-state", d => d.properties.NAME)
        .attr("data-key", d => d.properties.GEOID);
    }
  },
  created() {
    this.createUSMap();
  },
  watch: {
    usMap() {
      this.createMap();
      this.addStateNames();
    }
  }
};
</script>

<style>
.map-wrapper svg path {
  fill: lightblue;
  stroke: white;
  cursor: pointer;
}
</style>