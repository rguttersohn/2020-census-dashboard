(function(t){function e(e){for(var r,s,c=e[0],o=e[1],l=e[2],u=0,d=[];u<c.length;u++)s=c[u],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&d.push(n[s][0]),n[s]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r]);h&&h(e);while(d.length)d.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],r=!0,c=1;c<a.length;c++){var o=a[c];0!==n[o]&&(r=!1)}r&&(i.splice(e--,1),t=s(s.s=a[0]))}return t}var r={},n={app:0},i=[];function s(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=r,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(a,r,function(e){return t[e]}.bind(null,r));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="2020-census-dashboard-deploy/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],o=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var h=o;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var r=a("85ec"),n=a.n(r);n.a},"0cc4":function(t,e,a){},"27d8":function(t,e,a){"use strict";var r=a("0cc4"),n=a.n(r);n.a},"2d6d":function(t,e,a){},5490:function(t,e,a){"use strict";var r=a("a6b6"),n=a.n(r);n.a},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[""!==t.loadingStates?a("h2",[t._v(t._s(t.loadingStates))]):t._e(),a("Map",{attrs:{currentState:t.currentState},on:{"button-event":t.stateClicked}}),a("div",{staticClass:"loading-container"},[a("h2",[t._v(t._s(t.infoLoading))])]),a("div",{staticClass:"dashboard-wrapper"},[a("StateInfo",{attrs:{date:t.dateRetrieved,currentState:t.currentState,allStates:t.allStates}}),a("BarChart",{attrs:{date:t.dateRetrieved,currentState:t.currentState,currentState_2010:t.currentState_2010}}),a("PieChart",{attrs:{date:t.dateRetrieved,currentState:t.currentState}})],1),a("PlotChart",{attrs:{date:t.dateRetrieved,currentState:t.currentState,allStates:t.allStates},on:{"dot-event":t.stateClicked}})],1)},i=[],s=(a("a630"),a("d81d"),a("13d5"),a("fb6a"),a("a434"),a("d3b7"),a("3ca3"),a("ddb0"),a("3835")),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"map-wrapper"},[a("svg")])},o=[],l=a("d217"),h=a("5698"),u={props:{currentState:Array},data:function(){return{usMap:"",width:800,height:500,margin:{left:50,right:50,top:50,bottom:100},colors:["#004c6d","#26617e","#40768f","#5a8ca0","#74a3b1","#8fb9c3","#abd0d6","#c8e8ea","#e5ffff"]}},computed:{projection:function(){return this.albersUsaPr()},geoPath:function(){return h["h"]().projection(this.projection)}},methods:{albersUsaPr:function(){var t,e,a,r,n,i=1e-6,s=h["f"](),c=h["g"]().rotate([154,0]).center([-2,58.5]).parallels([55,65]),o=h["g"]().rotate([157,0]).center([-3,19.9]).parallels([8,18]),l=h["g"]().rotate([66,0]).center([0,18]).parallels([8,18]),u={point:function(e,a){t=[e,a]}};function d(i){var s=i[0],c=i[1];return t=null,e(s,c),t||(a(s,c),t)||(r(s,c),t)||n(s,c),t}return d.invert=function(t){var e=s.scale(),a=s.translate(),r=(t[0]-a[0])/e,n=(t[1]-a[1])/e;return(n>=.12&&n<.234&&r>=-.425&&r<-.214?c:n>=.166&&n<.234&&r>=-.214&&r<-.115?o:n>=.204&&n<.234&&r>=.32&&r<.38?l:s).invert(t)},d.stream=function(t){var e=s.stream(t),a=c.stream(t),r=o.stream(t),n=l.stream(t);return{point:function(t,i){e.point(t,i),a.point(t,i),r.point(t,i),n.point(t,i)},sphere:function(){e.sphere(),a.sphere(),r.sphere(),n.sphere()},lineStart:function(){e.lineStart(),a.lineStart(),r.lineStart(),n.lineStart()},lineEnd:function(){e.lineEnd(),a.lineEnd(),r.lineEnd(),n.lineEnd()},polygonStart:function(){e.polygonStart(),a.polygonStart(),r.polygonStart(),n.polygonStart()},polygonEnd:function(){e.polygonEnd(),a.polygonEnd(),r.polygonEnd(),n.polygonEnd()}}},d.precision=function(t){return arguments.length?(s.precision(t),c.precision(t),o.precision(t),l.precision(t),d):s.precision()},d.scale=function(t){return arguments.length?(s.scale(t),c.scale(.35*t),o.scale(t),l.scale(t),d.translate(s.translate())):s.scale()},d.translate=function(t){if(!arguments.length)return s.translate();var h=s.scale(),p=+t[0],f=+t[1];return e=s.translate(t).clipExtent([[p-.455*h,f-.238*h],[p+.455*h,f+.238*h]]).stream(u).point,a=c.translate([p-.307*h,f+.201*h]).clipExtent([[p-.425*h+i,f+.12*h+i],[p-.214*h-i,f+.234*h-i]]).stream(u).point,r=o.translate([p-.205*h,f+.212*h]).clipExtent([[p-.214*h+i,f+.166*h+i],[p-.115*h-i,f+.234*h-i]]).stream(u).point,n=l.translate([p+.35*h,f+.224*h]).clipExtent([[p+.32*h,f+.204*h],[p+.38*h,f+.234*h]]).stream(u).point,d},d.scale(1e3)},createUSMap:function(){var t=this,e=fetch("tl_2019_us_state.json");Promise.all([e]).then((function(t){return Promise.all(t.map((function(t){return t.json()})))})).then((function(e){var a=Object(s["a"])(e,1),r=a[0],n=t;n.usMap=l["a"](r,{type:"GeometryCollection",geometries:r.objects.tl_2019_us_state.geometries})}))},createMap:function(){h["l"](".map-wrapper svg").attr("width",this.width+this.margin.left+this.margin.right).attr("height",this.height).append("g").attr("class","state-paths").selectAll("path").data(this.usMap.features).enter().append("path").attr("d",this.geoPath)},addStateNames:function(){h["m"](".state-paths path").data(this.usMap.features).attr("data-state",(function(t){return t.properties.NAME})).attr("data-key",(function(t){return t.properties.GEOID})).on("click",this.handleStateClick)},handleStateClick:function(){this.$emit("button-event",h["d"].target)},addHighlight:function(){var t=document.querySelector(".map-wrapper svg .active");t&&t.classList.remove("active");var e=document.querySelector(".map-wrapper svg path[data-state='".concat(this.currentState[0].NAME,"']"));e.classList.add("active")}},created:function(){this.createUSMap()},watch:{usMap:function(){this.createMap(),this.addStateNames()},currentState:function(){this.addHighlight()}}},d=u,p=(a("5490"),a("2877")),f=Object(p["a"])(d,c,o,!1,null,null,null),g=f.exports,m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"state-info-wrapper"},[void 0!==t.currentState[0]?a("h2",[t._v(t._s(t.currentState[0].NAME))]):t._e(),void 0!==t.currentState[0]?a("h3",[t._v("Self Response Rate: "+t._s(t.currentState[0].CRRALL)+"%")]):t._e(),""!==t.stateRank?a("div",{staticClass:"response-rate-rank"},[a("h3",[t._v("Rank:")]),a("p",[a("span",[t._v(t._s(t.stateRank))]),t._v(" out of 52 "),a("br"),t._v("(including Puerto Rico and Washington D.C.) ")])]):t._e(),void 0!==t.currentState[0]?a("p",{staticClass:"date-note"},[t._v("As of "+t._s(t.date))]):t._e()])},S=[],v=(a("4160"),a("c975"),a("159b"),{props:{currentState:Array,allStates:Array,date:String},data:function(){return{statesSorted:"",stateRank:""}},methods:{sortStates:function(){this.statesSorted=this.allStates[0].slice().sort((function(t,e){return parseFloat(t[4])-parseFloat(e[4])})).reverse()},findRank:function(){var t=this;this.statesSorted.forEach((function(e){t.currentState[0].NAME===e[0]&&(t.stateRank=t.statesSorted.indexOf(e)+1)}))}},watch:{currentState:function(){this.sortStates(),this.findRank()}}}),y=v,b=(a("27d8"),Object(p["a"])(y,m,S,!1,null,"7766923d",null)),w=b.exports,x=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bar-chart-wrapper"},[void 0!==t.currentState[0]?a("h3",[a("span",{style:{color:t.colors[0]}},[t._v("2020 response rate")]),t._v(" vs "),a("span",{style:{color:t.colors[1]}},[t._v("2010 response rate")]),t._v(" in "+t._s(t.currentState[0].NAME))]):t._e(),a("svg"),void 0!==t.currentState[0]?a("p",{staticClass:"date-note"},[t._v("As of "+t._s(t.date))]):t._e()])},_=[],R={props:{currentState:Array,currentState_2010:Array,date:String},data:function(){return{width:300,height:300,colors:["#0099cd","#de425b"],margin:{bottom:50},mergedResponseRate:[]}},computed:{yScale:function(){return h["k"]().range([0,this.height]).domain([80,0])},xScale:function(){return h["j"]().range([0,this.width]).domain(this.mergedResponseRate.map((function(t){return t.year}))).padding(.5)}},methods:{drawChart:function(){var t=this;h["l"](".bar-chart-wrapper svg").attr("width",this.width).attr("height",this.height+this.margin.bottom),h["m"](".bar-chart-wrapper svg *").remove(),h["l"](".bar-chart-wrapper svg").append("g").attr("class","x-axis").call(h["b"](this.xScale).tickSize([0])).attr("transform","translate(0,".concat(this.height+this.margin.bottom-20,")")),h["l"](".x-axis .domain").style("visibility","hidden"),h["l"](".bar-chart-wrapper svg").append("g").attr("class","y-axis").call(h["c"](this.yScale).tickSize([0]).ticks(8).tickFormat((function(t){return t+"%"}))).attr("transform","translate(0,".concat(this.margin.bottom-20,")")),h["l"](".y-axis .domain").style("visibility","hidden"),h["l"](".bar-chart-wrapper svg").append("g").attr("class","bars").selectAll("rect").data(this.mergedResponseRate).enter().append("rect").attr("width",this.xScale.bandwidth()).attr("x",(function(e){return t.xScale(e.year)})).attr("transform","translate(0,".concat(this.margin.bottom-20,")")).attr("fill",(function(e,a){return t.colors[a]})).attr("height",this.height-this.yScale(0)).attr("y",this.yScale(0)).transition().duration(1e3).attr("height",(function(e){return t.height-t.yScale(e.CRRALL)})).attr("y",(function(e){return t.yScale(e.CRRALL)})).delay((function(t,e){return 100*e}))},createChartLabels:function(){var t=this;h["l"](".bar-chart-wrapper svg").append("g").attr("transform","translate(0,".concat(this.margin.bottom-20,")")).attr("class","bar-chart-labels").selectAll("text").data(this.mergedResponseRate).enter().append("text").text((function(t){return t.CRRALL+"%"})).attr("text-anchor","middle").attr("x",(function(e){return t.xScale(e.year)+t.xScale.bandwidth()/2})).attr("y",(function(e){return t.yScale(e.CRRALL)})).attr("dy","1.3em").attr("fill","white")},handleData:function(){this.mergedResponseRate=[],this.mergedResponseRate.push(this.currentState[0],this.currentState_2010[0])}},watch:{currentState:function(){this.handleData()},mergedResponseRate:function(){this.drawChart(),this.createChartLabels()}}},A=R,C=Object(p["a"])(A,x,_,!1,null,"71f0c332",null),k=C.exports,E=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pie-chart-wrapper"},[void 0!==t.currentState[0]?a("h3",[a("span",{style:{color:t.colors[0]}},[t._v("Internet responses")]),t._v(" and "),a("span",{style:{color:t.colors[1]}},[t._v("traditional responses")]),t._v(" in "+t._s(t.currentState[0].NAME)+" ")]):t._e(),a("svg"),void 0!==t.currentState[0]?a("p",{staticClass:"date-note"},[t._v("As of "+t._s(t.date))]):t._e()])},L=[],P=(a("99af"),{props:{currentState:Array,date:String},data:function(){return{colors:["#0099cd","#60bcda","white"],height:250,width:250,margin:25,currentStateArray:[],pie:"",arc:""}},methods:{createPie:function(){this.pie=h["i"]().value((function(t){return t}))(this.currentStateArray)},turnToArray:function(){this.currentStateArray=[],this.currentStateArray.push(parseFloat(this.currentState[0].CRRINT),parseFloat(this.currentState[0].CRRALL)-parseFloat(this.currentState[0].CRRINT))},createArc:function(){this.arc=h["a"]().innerRadius(0).outerRadius(this.width/2).padAngle(.05).padRadius(1)},chartFixed:function(){h["l"](".pie-chart-wrapper svg").attr("width",this.width+2*this.margin).attr("height",this.height+this.margin).append("g").attr("class","pie-chart").attr("transform","translate(".concat(this.width/2+this.margin,",").concat(this.height/2+this.margin,")"))},drawPie:function(){var t=this;h["l"](".pie-chart").selectAll("path").data(this.pie).enter().append("path").attr("fill",(function(e,a){return t.colors[a]})).style("stroke","gray")},animatePie:function(){h["m"](".pie-chart path").transition().duration(1e3).attr("d",this.arc)},pieLabel:function(){var t=this.arc,e=h["e"](".1f");h["l"](".pie-chart-wrapper svg").append("g").attr("class","pie-chart-labels").attr("transform","translate(".concat(this.width/2+this.margin,",").concat(this.height/2+this.margin,")")).selectAll("text").data(this.pie).enter().append("text").style("fill","black").attr("text-anchor","middle").text((function(t){return e(t.data)+"%"})).attr("x",(function(e){return t.centroid(e)[0]})).attr("y",(function(e){return t.centroid(e)[1]})).style("fill",this.colors[2]).style("font-weight","bold").attr("opacity",0).transition().duration(1e3).attr("opacity",1).delay(100)},removeLabel:function(){h["l"](".pie-chart-labels").remove()}},watch:{currentState:function(){this.turnToArray()},currentStateArray:function(){this.createPie(),this.createArc(),this.chartFixed(),this.drawPie(),this.animatePie(),this.removeLabel(),this.pieLabel()}}}),M=P,j=(a("b5ad"),Object(p["a"])(M,E,L,!1,null,"d0ce0380",null)),O=j.exports,N=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"plot-chart-wrapper"},[t.currentState.length>0?a("h2",[t._v("How "+t._s(t.currentState[0].NAME)+" Compares to All States, Washington D.C., and Puerto Rico")]):t._e(),a("p",{staticClass:"date-note"},[t._v("As of "+t._s(t.date))]),a("svg")])},D=[],F=(a("4de4"),{props:["allStates","currentState","date"],data:function(){return{width:900,height:300,margin:{top:50,bottom:50,left:50,right:25},colors:["lightgray","#0099cd"]}},computed:{yScale:function(){return h["k"]().range([0,this.height]).domain([80,20])},xScale:function(){return h["j"]().range([0,this.width]).domain(this.allStates[0].map((function(t){return t[0]}))).padding(.5)}},methods:{drawPlotChart:function(){h["l"](".plot-chart-wrapper svg").attr("width",this.width+this.margin.left+this.margin.right).attr("height",this.height+this.margin.bottom+this.margin.top),h["l"](".plot-chart-wrapper svg").append("g").attr("class","x-axis").call(h["b"](this.xScale).tickSize([0])).attr("transform","translate(".concat(this.margin.left,",").concat(this.height+this.margin.bottom-20,")")),h["l"](".x-axis .domain").style("visibility","hidden"),h["m"](".x-axis .tick text").attr("text-anchor","start").attr("transform","rotate(90)").filter((function(t,e){return 7===e})).text("D.C."),h["l"](".plot-chart-wrapper svg").append("g").attr("class","y-axis").call(h["c"](this.yScale).tickSize([0]).ticks(8).tickFormat((function(t){return t+"%"}))).attr("transform","translate(0,".concat(this.margin.bottom-20,")")),h["l"](".y-axis .domain").style("visibility","hidden")},drawDots:function(){var t=this;h["l"](".plot-chart-wrapper svg").append("g").attr("class","dots").attr("transform","translate(".concat(this.margin.left,",").concat(this.margin.bottom-20,")")).selectAll("circle").data(this.allStates[0]).enter().append("circle").attr("r",5).each((function(e){var a=t.xScale,r=t.yScale;h["l"](this).attr("cx",a(e[0])-t.xScale.bandwidth()/2).attr("cy",r(e[4])-t.xScale.bandwidth()/2)})).attr("fill",this.colors[0]).attr("data-state",(function(t){return t[0]})).attr("data-key",(function(t){return t[5]})).on("click",this.handleDotClick)},addLabels:function(){var t=this,e=this;h["l"](".plot-chart-wrapper svg").append("g").attr("class","labels").attr("transform","translate(".concat(this.margin.left,",").concat(this.margin.bottom-20,")")).selectAll("text").data(this.allStates[0]).enter().append("text").attr("text-anchor","middle").text((function(e){if(e[0]===t.currentState[0].NAME)return e[4]+"%"})).attr("dy","-.8em").each((function(t){var a=e.xScale,r=e.yScale;h["l"](this).attr("x",a(t[0])).attr("y",r(t[4]))})).style("font-size","18px").style("text-transform","uppercase").style("font-weight","bold").attr("fill",this.colors[1])},addStateLabels:function(){var t=this,e=this;h["l"](".plot-chart-wrapper svg").append("g").attr("class","state-labels").attr("transform","translate(".concat(this.margin.left,",").concat(this.margin.bottom-20,")")).selectAll("text").data(this.allStates[0]).enter().append("text").attr("text-anchor","middle").text((function(e){if(e[0]===t.currentState[0].NAME)return e[0]})).attr("dy","-1.8em").each((function(t){var a=e.xScale,r=e.yScale;h["l"](this).attr("x",a(t[0])).attr("y",r(t[4]))})).style("font-size","18px").style("font-weight","bold").attr("fill",this.colors[1])},drawLines:function(){var t=this;h["l"](".plot-chart-wrapper svg").append("g").attr("class","state-lines").attr("transform","translate(".concat(this.margin.left,",").concat(this.margin.bottom-20,")")).selectAll("line").data(this.allStates[0]).enter().append("line").attr("x1",(function(e){return t.xScale(e[0])-t.xScale.bandwidth()/2})).attr("x2",(function(e){return t.xScale(e[0])-t.xScale.bandwidth()/2})).attr("y1",t.height-3).attr("y2",(function(e){return t.yScale(e[4])})).attr("stroke","lightgray")},highlightCurrentState:function(){h["l"](".dots circle[fill='#0099cd']").attr("fill",this.colors[0]),h["m"](".plot-chart-wrapper svg text[fill='#0099cd']").remove(),h["l"](".plot-chart-wrapper svg *[data-state='".concat(this.currentState[0].NAME,"']")).attr("fill","#0099cd")},handleDotClick:function(){this.$emit("dot-event",h["d"].target)}},watch:{allStates:function(){this.drawLines(),this.drawPlotChart(),this.drawDots()},currentState:function(){this.currentState.length>0&&(this.highlightCurrentState(),this.addLabels(),this.addStateLabels())}}}),T=F,$=(a("c1f6"),Object(p["a"])(T,N,D,!1,null,null,null)),I=$.exports,z={name:"App",components:{Map:g,StateInfo:w,BarChart:k,PieChart:O,PlotChart:I},data:function(){return{states:[],currentState:[],currentState_2010:[],stateKey:"",infoLoading:"Click State Button to see response rate data",loadingStates:"",allStates:[],dateRetrieved:""}},methods:{stateNames:function(){var t=this;this.loadingStates="Loading map";var e=fetch("https://api.census.gov/data/2020/dec/responserate?get=NAME,DRRALL,CRRINT,RESP_DATE,CRRALL&for=state:*&key=97309691bae4d51923378713db7ff6909d26028d");Promise.all([e]).then((function(t){return Promise.all(t.map((function(t){return t.json()})))})).then((function(e){var a=Object(s["a"])(e,1),r=a[0];t.allStates.push(r);var n=[r[1][3]];t.dateRetrieved=n[0],t.loadingStates="",r.splice(0,1);var i=[];r.map((function(t){return i.push(t[0],t[5])}));var c=function(t,e){return Array.from({length:Math.ceil(t.length/e)},(function(a,r){return t.slice(r*e,r*e+e)}))};t.states.push(c(i,2))}))},responseData:function(){var t=this,e=fetch("https://api.census.gov/data/2020/dec/responserate?get=NAME,CRRINT,RESP_DATE,CRRALL&for=state:".concat(this.stateKey,"&key=97309691bae4d51923378713db7ff6909d26028d")),a=fetch("https://api.census.gov/data/2010/dec/responserate?get=NAME,FSRR2010&for=state:".concat(this.stateKey,"&key=97309691bae4d51923378713db7ff6909d26028d"));this.infoLoading="loading ...",Promise.all([e,a]).then((function(t){return Promise.all(t.map((function(t){return t.json()})))})).then((function(e){var a=Object(s["a"])(e,2),r=a[0],n=a[1];t.infoLoading="",t.currentState=[];var i=r.shift();t.currentState=r.map((function(t){return i.reduce((function(e,a,r){return e[a]=t[r],e}),{})})),t.currentState_2010=[],i=n.shift(),t.currentState_2010=n.map((function(t){return i.reduce((function(e,a,r){return e[a]=t[r],e}),{})})),t.currentState_2010[0]["CRRALL"]=t.currentState_2010[0]["FSRR2010"],delete t.currentState_2010[0]["FSRR2010"],t.currentState[0].year="2020",t.currentState_2010[0].year="2010"}))},stateClicked:function(t){this.stateKey=t.dataset.key}},created:function(){this.stateNames()},watch:{stateKey:function(){this.responseData()}}},K=z,U=(a("034f"),Object(p["a"])(K,n,i,!1,null,null,null)),B=U.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(t){return t(B)}}).$mount("#app")},"85ec":function(t,e,a){},"94e1":function(t,e,a){},a6b6:function(t,e,a){},b5ad:function(t,e,a){"use strict";var r=a("2d6d"),n=a.n(r);n.a},c1f6:function(t,e,a){"use strict";var r=a("94e1"),n=a.n(r);n.a}});
//# sourceMappingURL=app.107697d4.js.map