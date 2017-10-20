(function () {
    
    var boundaryOptions = {
        fillOpacity: 0,
        color: '#55acee',
        opacity: 1,
        weight: 1
    };

    var herOptions = {
        fillOpacity: 1,
        fillColor: '#66c0b7',
        color: '#66c0b7',
        weight: .5,
    };

    var trailsOptions = {
        color: '#009688',
        weight: 2,
    };

    var options = {
        center: [43.7246, -79.3813],
        zoom: 11,
        minZoom: 9,
        maxZoom: 16,

    };

  
    var cultIcon = L.icon({
        iconUrl: 'svg/hert-svg.svg',
        iconSize: [20, 20]
    });
    
    var map = L.map('map', options);
    
       L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map); 
    

    $.when(
        $.getJSON('data/toronto-boundary.json'),
        $.getJSON('data/her-dist.json'),
        $.getJSON('data/bike-trails.json'),
        $.getJSON('data/cult-spot.json'),
    ).done(function (boundary, herDistrict, trails, cultSpot) {
        drawMap(boundary, herDistrict, trails, cultSpot);
    });

    function drawMap(boundary, herDistrict, trails, cultSpot) {

        L.geoJson(boundary, {
            style: boundaryOptions
        }).addTo(map);
        L.geoJson(herDistrict, {
            style: herOptions
        }).addTo(map);
        L.geoJson(trails, {
            style: trailsOptions
        }).addTo(map);
        L.geoJson(cultSpot, {
            // forEach: function(feature) {L.marker([feature.properties.LONGITUDE, feature.properties.LATITUDE], {
            //     icon : cultIcon
            //     })
            // },

            onEachFeature: function (feature, layer) {
                var props = feature.properties;

                var popup = "<h3>" + props.PNT_OF_INT + "</h3>" + "<p>" + props.DESCRPTION + "</p>"

                if (props.WEBSITE != null) {
                    popup += "<p><b>Website</b>: <a href=' " + props.WEBSITE + "'>" + props.WEBSITE + "</a></p>";
                };
                //would be good exclude all markers where props.CATEGORY = 'Business'

                layer.bindPopup(popup);

                layer.on('mouseover', function (e) { //when mouse hovers over marker make it do a thing
                    this.openPopup(); //the thing is to open the popup
                });

                layer.on('mouseout', function (e) { //when the mouse moves away from the marker it will do a thing
                    this.closePopup(); //the thing will be to close the popup
                });

            }
        }).addTo(map);

    }

})();