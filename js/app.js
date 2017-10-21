(function () {
        // mapbox access token for ljmoser83 account
//    L.mapbox.accessToken = 'pk.eyJ1IjoibGptb3NlcjgzIiwiYSI6ImNqOHo0bWh1MTJqNjQzM280bDRiOG1hdmEifQ.dckxPH6XzM980t1b8L9FEw';
//
//    // create the Leaflet map using mapbox.dark tiles. sets zoom levels to appropriate levels for the extent of dataLayer
//    var map = L.mapbox.map('map', 'mapbox.dark', {
//        zoomSnap: .1,
//        minZoom: 2,
//        maxZoom: 11,
//        center: [43.7246, -79.3813],
//    });
    
    
    //options for styles of the features
    var boundaryOptions = {
        fillOpacity: 0,
        color: '#55acee',
        opacity: 1,
        weight: 1
    };

    var herOptions = {
        fillOpacity: .5,
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
        iconUrl: 'svg/hert-svg2.svg',
        iconSize: [20, 20]
    });
    
    //load basemap
    var map = L.map('map', options);
    
       L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map); 
    
//Ajax request to load data files and call to drawMap once loaded
    $.when(
        $.getJSON('data/toronto-boundary.json'),
        $.getJSON('data/her-dist.json'),
        $.getJSON('data/bike-trails.json'),
        $.getJSON('data/cult-spot.json'),
    ).done(function (boundary, herDistrict, trails, cultSpot) {
        drawMap(boundary, herDistrict, trails, cultSpot);
    });

    //begin drawMap function
    function drawMap(boundary, herDistrict, trails, cultSpot) {

        //create geoJSON layers
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

            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: cultIcon});
            },

            //loop through each feature
            onEachFeature: function (feature, layer) {
                
                var props = feature.properties;
                //variable to hold popup
                var popup = "<h3>" + props.PNT_OF_INT + "</h3>" + "<p>" + props.DESCRPTION + "</p>"
                //if there is no webite, exclude that line from the popup
                if (props.WEBSITE != null) {
                    popup += "<p><b>Website</b>: <a href=' " + props.WEBSITE + "'>" + props.WEBSITE + "</a></p>";
                };
                //would be good exclude all markers where props.CATEGORY = 'Business'
                //add the popus to the layer
                layer.bindPopup(popup);
                //UI events
                layer.on('mouseover', function (e) { //when mouse hovers over marker make it do a thing
                    this.openPopup(); //the thing is to open the popup
                });

                layer.on('mouseout', function (e) { //when the mouse moves away from the marker it will do a thing
                    this.closePopup(); //the thing will be to close the popup
                });

            }
        }).addTo(map);//end drawMap function

    }

})();