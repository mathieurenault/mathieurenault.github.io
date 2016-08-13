var margin = 20,
    diameter = 550;

var color = d3.scale.linear()
    .domain([-1, 5])
    .range(["hsl(214,62%,76%)", "hsl(170,83%,50%)"])
    .interpolate(d3.interpolateHcl);

var size = d3.scale.linear()
    .domain([1, 2])
    .range(["10", "20"])
    .interpolate(d3.interpolateHcl);

var pack = d3.layout.pack()
.padding(2)
    .size([diameter - margin, diameter - margin])
    .value(function(d) { return d.size; })

var svg_cp = d3.select("#circle_packing").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
  .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

d3.json("data/circle_packing.json", function(error, root) {
  if (error) throw error;

  var focus = root,
      nodes = pack.nodes(root),
      view;

  var circle = svg_cp.selectAll("circle")
      .data(nodes)
    .enter().append("circle")
      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
      .on("click", function(d) { if (focus !== d) zoom2(d), d3.event.stopPropagation(); });

  var text = svg_cp.selectAll("text")
      .data(nodes)
    .enter().append("text")
      .attr("class", "label")
      .style("fill", "white")
      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
      .style("size", function(d) { return size(d.depth);})
      .text(function(d) { return d.name + "  " + d.size + " " + d.pourcentage ; });

  var node = svg_cp.selectAll("circle,text");

  d3.select("body")
      .on("click", function() { zoom2(root); });

  zoom2To([root.x, root.y, root.r * 2 + margin]);

  function zoom2(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom2", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoom2To(i(t)); };
        });

    transition.selectAll(".label")
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  function zoom2To(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
  }
});

d3.select(self.frameElement).style("height", diameter + "px");