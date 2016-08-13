var width = 960,
    height = 300,
    widthDiv = width/2.7,
    radius = Math.min(widthDiv, 750/3) / 2,
    color = d3.scale.category20c();


var svg_sb = d3.select("#sun_burst1").append("svg")
    .attr("width", widthDiv)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + widthDiv / 2 + "," + height * .42 + ")");

var svg_sb_s = d3.select("#sun_burst1").append("svg")
    .attr("width", widthDiv)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + widthDiv /2 + "," + height * .42 + ")");

var svg_sb_2 = d3.select("#sun_burst2").append("svg")
    .attr("width", widthDiv)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + widthDiv /2 + "," + height * .42 + ")");

var svg_sb_3 = d3.select("#sun_burst2").append("svg")
    .attr("width", widthDiv)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + widthDiv /2 + "," + height * .42 + ")");




var text = svg_sb.append("text")
              .attr("text-anchor","middle")
              .style("fill","#666")
              .text("Before wave")
              .attr("font-size","20");

var text_s = svg_sb_s.append("text")
              .attr("text-anchor","middle")
              .style("fill","#666")
              .text("During wave")
              .attr("font-size","20");

var text_2 = svg_sb_2.append("text")
              .attr("text-anchor","middle")
              .style("fill","#666")
              .text("A day after")
              .attr("font-size","20");

var text_3 = svg_sb_3.append("text")
              .attr("text-anchor","middle")
              .style("fill","#666")
              .text("2 weeks after")
              .attr("font-size","20");

var partition = d3.layout.partition()
    .sort(null)
    .size([2 * Math.PI, radius * radius])
    .value(function(d) { return 1; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { return Math.sqrt(d.y); })
    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

d3.json("data/criteria1.json", function(error, root) {
  if (error) throw error;

  var path = svg_sb.datum(root).selectAll("path")
      .data(partition.nodes)
    .enter().append("path")
      .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
      .attr("d", arc)
      .style("stroke", "#fff")
      .style("fill", function(d) {if(typeof d.children !== 'undefined'){return d.color;} else{return color(d.name);}})
      .style("fill-rule", "evenodd")
      .on("mouseover", mouseover)
      .on("mouseleave", mouseleave)
      .each(stash);

  var value = this.value === "count"
        ? function() { return 1; }
        : function(d) { return d.size; };

    path
        .data(partition.value(value).nodes)
      .transition()
        .duration(1500)
        .attrTween("d", arcTween);

 
});

d3.json("data/criteria4.json", function(error, root) {
  if (error) throw error;

  var path_s = svg_sb_s.datum(root).selectAll("path")
      .data(partition.nodes)
    .enter().append("path")
      .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
      .attr("d", arc)
      .style("stroke", "#fff")
      .style("fill", function(d) {if(typeof d.children !== 'undefined'){return d.color;} else{return color(d.name);}})
      .style("fill-rule", "evenodd")
      .on("mouseover", mouseover_s)
      .on("mouseleave", mouseleave_s)
      .each(stash);

  var value = this.value === "count"
        ? function() { return 1; }
        : function(d) { return d.size; };

    path_s
        .data(partition.value(value).nodes)
      .transition()
        .duration(1500)
        .attrTween("d", arcTween);

 
});

d3.json("data/criteria2.json", function(error, root) {
  if (error) throw error;

  var path_2 = svg_sb_2.datum(root).selectAll("path")
      .data(partition.nodes)
    .enter().append("path")
      .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
      .attr("d", arc)
      .style("stroke", "#fff")
      .style("fill", function(d) {if(typeof d.children !== 'undefined'){return d.color;} else{return color(d.name);}})
      .style("fill-rule", "evenodd")
      .on("mouseover", mouseover_2)
      .on("mouseleave", mouseleave_2)
      .each(stash);

  var value = this.value === "count"
        ? function() { return 1; }
        : function(d) { return d.size; };

    path_2
        .data(partition.value(value).nodes)
      .transition()
        .duration(1500)
        .attrTween("d", arcTween);

  d3.selectAll("input").on("change", function change() {
    var value = this.value === "count"
        ? function() { return 1; }
        : function(d) { return d.size; };

    path_2
        .data(partition.value(value).nodes)
      .transition()
        .duration(1500)
        .attrTween("d", arcTween);
  });
});

d3.json("data/criteria3.json", function(error, root) {
  if (error) throw error;

  var path_3 = svg_sb_3.datum(root).selectAll("path")
      .data(partition.nodes)
    .enter().append("path")
      .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
      .attr("d", arc)
      .style("stroke", "#fff")
      .style("fill", function(d) {if(typeof d.children !== 'undefined'){return d.color;} else{return color(d.name);}})
      .style("fill-rule", "evenodd")
      .on("mouseover", mouseover_3)
      .on("mouseleave", mouseleave_3)
      .each(stash);



 
});

function mouseover(d){
  if(typeof d.children == 'undefined'){
    text.text(d.name + " : " + d.size + "%")
        .attr("font-size","12");
  }

  d3.select(this).style("opacity", .3);
}

function mouseleave(d){
  text.text("Before wave").attr("font-size","20");
  d3.select(this).style("opacity", 1);
}

function mouseover_s(d){
  if(typeof d.children == 'undefined'){
    text_s.text(d.name + " : " + d.size + "%")
        .attr("font-size","12");
  }

  d3.select(this).style("opacity", .3);
}

function mouseleave_s(d){
  text_s.text("During wave").attr("font-size","20");
  d3.select(this).style("opacity", 1);
}

function mouseover_2(d){
  if(typeof d.children == 'undefined'){
    text_2.text(d.name + " : " + d.size + "%")
        .attr("font-size","12");
  }

  d3.select(this).style("opacity", .3);
}

function mouseleave_2(d){
  text_2.text("A day after").attr("font-size","20");
  d3.select(this).style("opacity", 1);
}

function mouseover_3(d){
  if(typeof d.children == 'undefined'){
    text_3.text(d.name + " : " + d.size + "%")
        .attr("font-size","12");
  }

  d3.select(this).style("opacity", .3);
}

function mouseleave_3(d){
  text_3.text("2 weeks after").attr("font-size","20");;
  d3.select(this).style("opacity", 1);
}

// Stash the old values for transition.
function stash(d) {
  d.x0 = d.x;
  d.dx0 = d.dx;
}

// Interpolate the arcs in data space.
function arcTween(a) {
  var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
  return function(t) {
    var b = i(t);
    a.x0 = b.x;
    a.dx0 = b.dx;
    return arc(b);
  };
}

d3.select(self.frameElement).style("height", height + "px");