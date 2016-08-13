var app = angular.module("myapp", []);

app.directive("globe", function() {
    return {
        restrict: 'E',
        scope: {
            data: '=?'
        },
        template: '<div class="globe-wrapper">' +
            '<div class="globe"></div>' +
            '<div class="info"></div>' +
            '</div>',
        link: link
    };

    function link(scope, element, attrs) {
        var margin = {
            right: 50,
            left: 50,
            top: 20,
            bottom: 20
        }
        width = 1000 + margin.left + margin.right,
            height = 500 + margin.top + margin.bottom,
            rotate = [10, -10],
            velocity = [.003, -.001],
            r = 100,
            p = Math.PI * 2;

        var projection, path,
            svg, features, graticule, zoom,
            mapJson = 'data/mapping.json',
            squares, squareSet;

        projection = d3.geo.orthographic()
            .scale(240)
            .translate([width / 4, height / 2 + 20])
            .clipAngle(90 + 1e-6)
            .precision(.3)
            .rotate([0, -30]);

        path = d3.geo.path()
            .projection(projection);

        svg = d3.select(element[0]).select('.globe')
            .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr('viewBox', '0, 0, ' + width + ', ' + height);

        features = svg.append('g');

        features.append('path')
            .datum({
                type: 'Sphere'
            })
            .attr('class', 'background')
            .attr('d', path);

        graticule = d3.geo.graticule();

        features.append('path')
            .datum(graticule)
            .attr('class', 'graticule')
            .attr('d', path);

        zoom = d3.geo.zoom()
            .projection(projection)
            .scaleExtent([projection.scale() * 0.4, projection.scale() * 1.5])
            .on('zoom.redraw', function() {
                d3.event.sourceEvent.preventDefault();
                svg.selectAll('path').attr('d', path);
            });

        d3.json(mapJson, function(error, json) {

            console.log(error);

            squares = json.features;
            squareSet = drawFeatureSet('square', squares);

            d3.selectAll('path').call(zoom);
        });

        function drawFeatureSet(className, featureSet) {
            var set = features.selectAll('.' + className)
                .data(featureSet)
                .enter()
                .append('g')
                .attr('class', className);

            set.append('path')
                .attr('class', 'overlay')
                .attr('d', path)
                .on('click', function(d) {
					d3.selectAll(".overlay").style("fill", "#3182BD");
                    d3.select(this).style("fill", "#FFFFFF");
					
					rotateToFocusOn(d);
					
					// Profile
                    d3.select("#id").html("Id: " + d.properties.id);
                    
                    if(d.properties.gender==0) {
                        d3.select("#gender").html("Gender : Female");
                    }
                    else {d3.select("#gender").html("Gender : Male");}

                    d3.select("#age").html("Age: " + d.properties.age);

                    if (d.properties.race==1) 
                        {d3.select("#race").html("Race : Black/African American");}
                    else if (d.properties.race==2)
                        {d3.select("#race").html("Race : European/Caucasian-American");}
                    else if (d.properties.race==3)
                        {d3.select("#race").html("Race : Latino/Hispanic American");}
                    else if (d.properties.race==4)
                        {d3.select("#race").html("Race : Asian/Pacific American ");}
                    else if (d.properties.race==5)
                        {d3.select("#race").html("Race : Other ");}
                    
					d3.select("#race_impact").html("Race Impact : Not important");

                    if (d.properties.goal==1) 
                        {d3.select("#goal").html("Goal : Seemed like a fun night out");}
                    else if (d.properties.goal==2)
                        {d3.select("#goal").html("Goal : To meet new people");}
                    else if (d.properties.goal==3)
                        {d3.select("#goal").html("Goal : To get a date");}
                    else if (d.properties.goal==4)
                        {d3.select("#goal").html("Goal : Looking for a serious relationship ");}
                    else if (d.properties.goal==5)
                        {d3.select("#goal").html("Goal : To say I did it ");}
                    else if (d.properties.goal==6)
                        {d3.select("#goal").html("Goal : Other ");}


                    if (d.properties.date==1) 
                        {d3.select("#date_frequency").html("Date frequency : Several times a week");}
                    else if (d.properties.date==2)
                        {d3.select("#date_frequency").html("Date frequency : Twice a week");}
                    else if (d.properties.date==3)
                        {d3.select("#date_frequency").html("Date frequency : Once a week");}
                    else if (d.properties.date==4)
                        {d3.select("#date_frequency").html("Date frequency : Twice a month ");}
                    else if (d.properties.date==5)
                        {d3.select("#date_frequency").html("Date frequency : Once a month");}
                    else if (d.properties.date==6)
                        {d3.select("#date_frequency").html("Date frequency : Several times a year ");}
                    else if (d.properties.date==7)
                        {d3.select("#date_frequency").html("Date frequency : Almost never ");}

                     if (d.properties.go_out==1) 
                        {d3.select("#go_out_frequency").html("Go out frequency : Several times a week");}
                    else if (d.properties.go_out==2)
                        {d3.select("#go_out_frequency").html("Go out frequency : Twice a week");}
                    else if (d.properties.go_out==3)
                        {d3.select("#go_out_frequency").html("Go out frequency : Once a week");}
                    else if (d.properties.go_out==4)
                        {d3.select("#go_out_frequency").html("Go out frequency : Twice a month ");}
                    else if (d.properties.go_out==5)
                        {d3.select("#go_out_frequency").html("Go out frequency : Once a month ");}
                    else if (d.properties.go_out==6)
                        {d3.select("#go_out_frequency").html("Go out frequency : Several times a year ");}
                    else if (d.properties.go_out==7)
                        {d3.select("#go_out_frequency").html("Go out frequency : Almost never ");}

					d3.select("#field").html("Field: " + d.properties.field);
					
					//Partner
                    //if(d.properties.age_o==0)
					d3.select("#age_partner").html(d.properties.age_o);

                    if (d.properties.race_o==1) 
                        {d3.select("#race_partner").html("Black/African American");}
                    else if (d.properties.race_o==2)
                        {d3.select("#race_partner").html("European/Caucasian-American");}
                    else if (d.properties.race_o==3)
                        {d3.select("#race_partner").html("Latino/Hispanic American");}
                    else if (d.properties.race_o==4)
                        {d3.select("#race_partner").html("Asian/Pacific American ");}
                    else if (d.properties.race_o==5)
                        {d3.select("#race_partner").html("Other ");}

 			
                    d3.select("#att_pref").html(Math.trunc(d.properties.pf_o_att) + "%");
					d3.select("#sinc_pref").html(Math.trunc(d.properties.pf_o_sin) + "%");
					d3.select("#amb_pref").html(Math.trunc(d.properties.pf_o_amb) + "%");
					d3.select("#int_pref").html(Math.trunc(d.properties.pf_o_int) + "%");
					d3.select("#sh_pref").html(Math.trunc(d.properties.pf_o_sha) + "%");
					d3.select("#fun_pref").html(Math.trunc(d.properties.pf_o_fun) + "%");
					
					d3.select("#att_note").html(Math.trunc(d.properties.attr_o)+"/10");
					d3.select("#sinc_note").html(Math.trunc(d.properties.sinc_o)+"/10");
					d3.select("#amb_note").html(Math.trunc(d.properties.amb_o)+"/10");
					d3.select("#int_note").html(Math.trunc(d.properties.intel_o)+"/10");
					d3.select("#sh_note").html(Math.trunc(d.properties.shar_o)+"/10");
					d3.select("#fun_note").html(Math.trunc(d.properties.fun_o)+"/10");
					
                    if (d.properties.match==0) {
					    d3.select("#match").html("2 peoples matched : No");}
                    else {d3.select("#match").html("2 peoples matched : Yes ");}
					
                });

            return set;
        }

        function rotateToFocusOn(x) {
            var coords = d3.geo.centroid(x);
            coords[0] = -coords[0];
            coords[1] = -coords[1];

            d3.transition()
                .duration(1250)
                .tween('rotate', function() {
                    var r = d3.interpolate(projection.rotate(), coords);
                    return function(t) {
                        projection.rotate(r(t));
                        svg.selectAll('path').attr('d', path);
                    };
                })
                .transition();
        }
    }
});

app.controller("ctrl1", function($scope, $log) {
    $scope.data = {};
});

app.run();