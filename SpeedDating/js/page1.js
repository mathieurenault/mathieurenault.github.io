var margin = {
    right: 50,
    left: 50,
    top: 20,
    bottom: 40
}

var width = 400 + margin.left + margin.right,
    height = 100 + margin.top + margin.bottom,
    rotate = [10, -10],
    velocity = [.003, -.001],
    time = Date.now(),
    r = 100,
    p = Math.PI * 2;

var svg;

svg = d3.select('#tab-1')
    .append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + 10)
    .attr('viewBox', '0, 0, ' + width + ', ' + height);

//Design de l'onglet


var dataRaceImpact = [56, 20, 19, 5];
var raceImpactLabel = ["Not important", "Important", "Very Important", "Not tell"];

var dataGender = [49, 51];
var genderLabel = ["Femme", "Homme"];

var dataRace = [5, 56, 8, 24, 7];
var raceLabel = ["Black/African American", "European/Caucasian-American",
    "Latino/Hispanic American ", "Islander/Asian-American", "Other"
];

var dataDate = [25, 24, 19, 18, 9, 4, 1];
var dateLabel = ["Several times a year", "Twice a month", "Almost never", "Once a month",
    "Once a week", "Twice a week", ""
];

var dataGo = [31, 36, 23, 5, 2, 2, 1];
var goLabel = ["Several times a week", "Twice a week", "Once a week",
    "Twice a month", "", "", ""
];

var dataAge = [65, 17, 15, 3];
var ageLabel = ["20-25", "25-30", "30-35", "Autre"];

var dataGoal = [41, 36, 8, 4, 6, 5];
var goalLabel = ["Seemed like a fun night out",
    "To meet new people",
    "To get a date",
    "Looking for a serious relationship",
    "To say I did it",
    " "
];
//Field = career du csv
var dataField = [28, 26, 9, 8, 7, 7, 3, 5, 3, 5];
var fieldLabel = ["Academic/Research",
    "Banking/Consulting/Finance/Marketing",
    "Creative Arts/Entertainment",
    "Lawyer",
    "International/Humanitarian Affairs",
    "Other",
    "Doctor/Medicine",
    "Engineer"

];

var color = d3.scale.category20();
var pie = d3.layout.pie()
    .value(function(d) {
        return d;
    });

var groupRace = svg.append("g").attr("transform", "translate(250, 77)");
var groupAge = svg.append("g").attr("transform", "translate(250, 80)");
var groupGender = svg.append("g").attr("transform", "translate(250, 80)");
var groupRaceImpact = svg.append("g").attr("transform", "translate(250, 80)");
var groupGoal = svg.append("g").attr("transform", "translate(250, 80)");
var groupDate = svg.append("g").attr("transform", "translate(250, 80)");
var groupGo = svg.append("g").attr("transform", "translate(250, 77)");
var groupField = svg.append("g").attr("transform", "translate(250, 80)");

var arcRace = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(70);
var arcAge = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(70);

var arcGoal = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(70);



var arcRaceImpact = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(70);

var arcField = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(70);

var arcGo = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(70);



var arcDate = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(70);

var arcGender = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(70);


var pieRace = groupRace.selectAll(".arc")
    .data(pie(dataRace))
    .enter()
    .append("g")
    .attr("class", "arc");

pieRace.style("opacity", 0).append("path")
    .style("fill", function(d, i) {
        return color(i);
    })
    .attr("d", arcRace);


pieRace.append("text") //add a label to each slice
    .attr("transform", function(d) {
        var c = arcRace.centroid(d),
            x = c[0],
            y = c[1],
            h = Math.sqrt(x * x + y * y);

        return "translate(" + (x / h * (70 + 10)) + ',' +
            (y / h * (70 + 10)) + ")";
    })
    .attr("text-anchor", function(d) {
        return (d.endAngle + d.startAngle) / 2 > Math.PI ?
            "end" : "start";
    })
    .style("fill", "Purple") //center the text on it's origin
    .text(function(d, i) {
        return raceLabel[i];
    });


// Add a magnitude value to the larger arcs, translated to the arc centroid and rotated.
pieRace.filter(function(d) {
        return d.endAngle - d.startAngle > .2;
    }).append("text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    //.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
    .attr("transform", function(d) { //set the label's origin to the center of the arc
        //we have to make sure to set these before calling arc.centroid
        d.outerRadius = 70; // Set Outer Coordinate
        d.innerRadius = 70 / 2; // Set Inner Coordinate
        return "translate(" + arcRace.centroid(d) + ")rotate(" + angle(d) + ")";
    })
    .style("fill", "White")
    .style("font", "bold 12px Arial")
    .text(function(d, i) {
        return dataRace[i];
    });


var pieAge = groupAge.selectAll(".arc")
    .data(pie(dataAge))
    .enter()
    .append("g")
    .attr("class", "arc");

pieAge.style("opacity", 0).append("path")
    .style("fill", function(d, i) {
        return color(i);
    })
    .attr("d", arcAge);

pieAge.append("text") //add a label to each slice
    .attr("transform", function(d) {
        var c = arcAge.centroid(d),
            x = c[0],
            y = c[1],
            h = Math.sqrt(x * x + y * y);

        return "translate(" + (x / h * (70 + 10)) + ',' +
            (y / h * (70 + 10)) + ")";
    })
    .attr("text-anchor", function(d) {
        return (d.endAngle + d.startAngle) / 2 > Math.PI ?
            "end" : "start";
    })
    .style("fill", "Purple") //center the text on it's origin
    .text(function(d, i) {
        return ageLabel[i];
    });
// Add a magnitude value to the larger arcs, translated to the arc centroid and rotated.
pieAge.filter(function(d) {
        return d.endAngle - d.startAngle > .2;
    }).append("text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    //.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
    .attr("transform", function(d) { //set the label's origin to the center of the arc
        //we have to make sure to set these before calling arc.centroid
        d.outerRadius = 70; // Set Outer Coordinate
        d.innerRadius = 70 / 2; // Set Inner Coordinate
        return "translate(" + arcAge.centroid(d) + ")rotate(" + angle(d) + ")";
    })
    .style("fill", "White")
    .style("font", "bold 12px Arial")
    .text(function(d, i) {
        return dataAge[i];
    });
var pieGo = groupGo.selectAll(".arc")
    .data(pie(dataGo))
    .enter()
    .append("g")
    .attr("class", "arc");

pieGo.style("opacity", 0).append("path")
    .style("fill", function(d, i) {
        return color(i);
    })
    .attr("d", arcGo);


pieGo.append("text") //add a label to each slice
    .attr("transform", function(d) {
        var c = arcGo.centroid(d),
            x = c[0],
            y = c[1],
            h = Math.sqrt(x * x + y * y);

        return "translate(" + (x / h * (70 + 10)) + ',' +
            (y / h * (70 + 10)) + ")";
    })
    .attr("text-anchor", function(d) {
        return (d.endAngle + d.startAngle) / 2 > Math.PI ?
            "end" : "start";
    })
    .style("fill", "Purple") //center the text on it's origin
    .text(function(d, i) {
        return goLabel[i];
    });

pieGo.filter(function(d) {
        return d.endAngle - d.startAngle > .2;
    }).append("text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    //.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
    .attr("transform", function(d) { //set the label's origin to the center of the arc
        //we have to make sure to set these before calling arc.centroid
        d.outerRadius = 70; // Set Outer Coordinate
        d.innerRadius = 70 / 2; // Set Inner Coordinate
        return "translate(" + arcGo.centroid(d) + ")rotate(" + angle(d) + ")";
    })
    .style("fill", "White")
    .style("font", "bold 12px Arial")
    .text(function(d, i) {
        return dataGo[i];
    });
var pieGender = groupGender.selectAll(".arc")
    .data(pie(dataGender))
    .enter()
    .append("g")
    .attr("class", "arc");



pieGender.style("opacity", 0).append("path")
    .style("fill", function(d, i) {
        return color(i);
    })
    .attr("d", arcGender);


pieGender.append("text") //add a label to each slice
    .attr("transform", function(d) {
        var c = arcGender.centroid(d),
            x = c[0],
            y = c[1],
            h = Math.sqrt(x * x + y * y);

        return "translate(" + (x / h * (70 + 10)) + ',' +
            (y / h * (70 + 10)) + ")";
    })
    .attr("text-anchor", function(d) {
        return (d.endAngle + d.startAngle) / 2 > Math.PI ?
            "end" : "start";
    })
    .style("fill", "Purple") //center the text on it's origin
    .text(function(d, i) {
        return genderLabel[i];
    });
// Add a magnitude value to the larger arcs, translated to the arc centroid and rotated.
pieGender.filter(function(d) {
        return d.endAngle - d.startAngle > .2;
    }).append("text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    //.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
    .attr("transform", function(d) { //set the label's origin to the center of the arc
        //we have to make sure to set these before calling arc.centroid
        d.outerRadius = 70; // Set Outer Coordinate
        d.innerRadius = 70 / 2; // Set Inner Coordinate
        return "translate(" + arcGender.centroid(d) + ")rotate(" + angle(d) + ")";
    })
    .style("fill", "White")
    .style("font", "bold 12px Arial")
    .text(function(d, i) {
        return dataGender[i];
    });




var pieRaceImpact = groupRaceImpact.selectAll(".arc")
    .data(pie(dataRaceImpact))
    .enter()
    .append("g")
    .attr("class", "arc");



pieRaceImpact.style("opacity", 0).append("path")
    .style("fill", function(d, i) {
        return color(i);
    })
    .attr("d", arcRaceImpact);


pieRaceImpact.append("text") //add a label to each slice
    .attr("transform", function(d) {
        var c = arcRaceImpact.centroid(d),
            x = c[0],
            y = c[1],
            h = Math.sqrt(x * x + y * y);

        return "translate(" + (x / h * (70 + 10)) + ',' +
            (y / h * (70 + 10)) + ")";
    })
    .attr("text-anchor", function(d) {
        return (d.endAngle + d.startAngle) / 2 > Math.PI ?
            "end" : "start";
    })
    .style("fill", "Purple") //center the text on it's origin
    .text(function(d, i) {
        return raceImpactLabel[i];
    });

// Add a magnitude value to the larger arcs, translated to the arc centroid and rotated.
pieRaceImpact.filter(function(d) {
        return d.endAngle - d.startAngle > .2;
    }).append("text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    //.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
    .attr("transform", function(d) { //set the label's origin to the center of the arc
        //we have to make sure to set these before calling arc.centroid
        d.outerRadius = 70; // Set Outer Coordinate
        d.innerRadius = 70 / 2; // Set Inner Coordinate
        return "translate(" + arcRaceImpact.centroid(d) + ")rotate(" + angle(d) + ")";
    })
    .style("fill", "White")
    .style("font", "bold 12px Arial")
    .text(function(d, i) {
        return dataRaceImpact[i];
    });


var pieGoal = groupGoal.selectAll(".arc")
    .data(pie(dataGoal))
    .enter()
    .append("g")
    .attr("class", "arc");



pieGoal.style("opacity", 0).append("path")
    .style("fill", function(d, i) {
        return color(i);
    })
    .attr("d", arcGoal);


pieGoal.append("text") //add a label to each slice
    .attr("transform", function(d) {
        var c = arcGoal.centroid(d),
            x = c[0],
            y = c[1],
            h = Math.sqrt(x * x + y * y);

        return "translate(" + (x / h * (70 + 10)) + ',' +
            (y / h * (70 + 10)) + ")";
    })
    .attr("text-anchor", function(d) {
        return (d.endAngle + d.startAngle) / 2 > Math.PI ?
            "end" : "start";
    })
    .style("fill", "Purple") //center the text on it's origin
    .text(function(d, i) {
        return goalLabel[i];
    });
pieGoal.filter(function(d) {
        return d.endAngle - d.startAngle > .2;
    }).append("text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    //.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
    .attr("transform", function(d) { //set the label's origin to the center of the arc
        //we have to make sure to set these before calling arc.centroid
        d.outerRadius = 70; // Set Outer Coordinate
        d.innerRadius = 70 / 2; // Set Inner Coordinate
        return "translate(" + arcGoal.centroid(d) + ")rotate(" + angle(d) + ")";
    })
    .style("fill", "White")
    .style("font", "bold 12px Arial")
    .text(function(d, i) {
        return dataGoal[i];
    });


var pieDate = groupDate.selectAll(".arc")
    .data(pie(dataDate))
    .enter()
    .append("g")
    .attr("class", "arc");



pieDate.style("opacity", 0).append("path")
    .style("fill", function(d, i) {
        return color(i);
    })
    .attr("d", arcDate);


pieDate.append("text") //add a label to each slice
    .attr("transform", function(d) {
        var c = arcDate.centroid(d),
            x = c[0],
            y = c[1],
            h = Math.sqrt(x * x + y * y);

        return "translate(" + (x / h * (70 + 10)) + ',' +
            (y / h * (70 + 10)) + ")";
    })
    .attr("text-anchor", function(d) {
        return (d.endAngle + d.startAngle) / 2 > Math.PI ?
            "end" : "start";
    })
    .style("fill", "Purple") //center the text on it's origin
    .text(function(d, i) {
        return dateLabel[i];
    });

// Add a magnitude value to the larger arcs, translated to the arc centroid and rotated.
pieDate.filter(function(d) {
        return d.endAngle - d.startAngle > .2;
    }).append("text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    //.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
    .attr("transform", function(d) { //set the label's origin to the center of the arc
        //we have to make sure to set these before calling arc.centroid
        d.outerRadius = 70; // Set Outer Coordinate
        d.innerRadius = 70 / 2; // Set Inner Coordinate
        return "translate(" + arcDate.centroid(d) + ")rotate(" + angle(d) + ")";
    })
    .style("fill", "White")
    .style("font", "bold 12px Arial")
    .text(function(d, i) {
        return dataDate[i];
    });

var pieField = groupField.selectAll(".arc")
    .data(pie(dataField))
    .enter()
    .append("g")
    .attr("class", "arc");



pieField.style("opacity", 0).append("path")
    .style("fill", function(d, i) {
        return color(i);
    })
    .attr("d", arcField);


pieField.append("text") //add a label to each slice
    .attr("transform", function(d) {
        var c = arcField.centroid(d),
            x = c[0],
            y = c[1],
            h = Math.sqrt(x * x + y * y);

        return "translate(" + (x / h * (70 + 10)) + ',' +
            (y / h * (70 + 10)) + ")";
    })
    .attr("text-anchor", function(d) {
        return (d.endAngle + d.startAngle) / 2 > Math.PI ?
            "end" : "start";
    })
    .style("fill", "Purple") //center the text on it's origin
    .text(function(d, i) {
        return fieldLabel[i];
    });


pieField.filter(function(d) {
        return d.endAngle - d.startAngle > .2;
    }).append("text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    //.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
    .attr("transform", function(d) { //set the label's origin to the center of the arc
        //we have to make sure to set these before calling arc.centroid
        d.outerRadius = 70; // Set Outer Coordinate
        d.innerRadius = 70 / 2; // Set Inner Coordinate
        return "translate(" + arcField.centroid(d) + ")rotate(" + angle(d) + ")";
    })
    .style("fill", "White")
    .style("font", "bold 12px Arial")
    .text(function(d, i) {
        return dataField[i];
    });

// Toutes les informations du profil

d3.select('#gender').on("mouseover", function() {
        pieGender.style("opacity", 1);

    })
    .on("mouseout", function() {
        pieGender.style("opacity", 0);
    });

d3.select('#age').on("mouseover", function() {
        pieAge.style("opacity", 1);

    })
    .on("mouseout", function() {
        pieAge.style("opacity", 0);
    });

d3.select('#income').on("mouseover", function() {
        pieIncome.style("opacity", 1);

    })
    .on("mouseout", function() {
        pieIncome.style("opacity", 0);
    });

d3.select('#race_impact').on("mouseover", function() {
        pieRaceImpact.style("opacity", 1);

    })
    .on("mouseout", function() {
        pieRaceImpact.style("opacity", 0);
    });

d3.select('#date_frequency').on("mouseover", function() {
        pieDate.style("opacity", 1);

    })
    .on("mouseout", function() {
        pieDate.style("opacity", 0);
    });

d3.select('#field').on("mouseover", function() {
        pieField.style("opacity", 1);

    })
    .on("mouseout", function() {
        pieField.style("opacity", 0);
    });

d3.select('#go_out_frequency').on("mouseover", function() {
        pieGo.style("opacity", 1);

    })
    .on("mouseout", function() {
        pieGo.style("opacity", 0);
    });

d3.select('#goal').on("mouseover", function() {
        pieGoal.style("opacity", 1);

    })
    .on("mouseout", function() {
        pieGoal.style("opacity", 0);
    });

d3.select('#race').on("mouseover", function() {
        pieRace.style("opacity", 1);

    })
    .on("mouseout", function() {
        pieRace.style("opacity", 0);
    });


// Computes the angle of an arc, converting from radians to degrees.
function angle(d) {
    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
    return a > 90 ? a - 180 : a;
}
//Fin design de l'onglet