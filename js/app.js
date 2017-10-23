(function () {
    
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
        center: [43.6380, -79.5072],
        zoomSnap: .1,
        zoom: 13,
        minZoom: 9,
        maxZoom: 16,
    };
  
    var cultIcon = L.icon({
        iconUrl: 'svg/hert-svg2.svg',
        iconSize: [20, 20]
    });

    var popupOptions = {
        riseOnHover: true,
        riseOffset: 1000,
        pane: 'markerPane'
    };
    
    //load basemap
    //mapbox access token for ljmoser83 account
   L.mapbox.accessToken = 'pk.eyJ1IjoibGptb3NlcjgzIiwiYSI6ImNqOHo0bWh1MTJqNjQzM280bDRiOG1hdmEifQ.dckxPH6XzM980t1b8L9FEw';
   
    // create the Leaflet map using mapbox.dark tiles. sets zoom levels to appropriate levels for the extent of dataLayer
    var map = L.mapbox.map('map', 'mapbox.dark', options);
   
    //Ajax request to load data files and call to drawMap once loaded
    $.when(
        $.getJSON('data/toronto-boundary.json'),
        $.getJSON('data/her-dist.json'),
        $.getJSON('data/bike-trails.json'),
        $.getJSON('data/cult-spot2.json'),
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
            style: trailsOptions,
            
            //loops through each layer and binds a popup tip//
            onEachFeature: function (feature, layer) {
                var trailName= feature.properties;
                var tip= "<h3> <b>Trail Name</b>: " + trailName.LF_Name + "<h3>"
                layer.bindPopup(tip);
                 
                //add event listeners//
                layer.on('mouseover', function (e) { //when mouse hovers over marker make it do a thing
                    this.openPopup().bringToFront; //the thing is to open the popup
                });

                layer.on('mouseout', function (e) { //when the mouse moves away from the marker it will do a thing
                    this.closePopup(); //the thing will be to close the popup
                });
            }
        }).addTo(map);

        L.geoJson(cultSpot, {

            style: popupOptions,

            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: cultIcon});
            },

            //loop through each feature
            onEachFeature: function (feature, layer) {
                
                $("li").css({"cursor":"pointer"});

                var props = feature.properties;
                //variable to hold popup
                var popup = "<h3>" + props.PNT_OF_INT + "</h3>" + "<p>" + props.DESCRPTION + "</p>"
                //if there is no webite, exclude that line from the popup
                if (props.WEBSITE != null) {
                    popup += "<p><b>Website</b>: <a href=' " + props.WEBSITE + "'>" + props.WEBSITE + "</a></p>";
                };
                
                //add the popus to the layer
                layer.bindPopup(popup);
                
                //UI events
                layer.on('click', function (e) { //when mouse hovers over marker make it do a thing
                    this.openPopup().bringToFront; //the thing is to open the popup
                });

            }
        }).addTo(map);//end drawMap function

    }

})();