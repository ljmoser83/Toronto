(function () {


    var boundaryOptions = {
        fillOpacity: 0,
        color: 'red',
        opacity: 1,
        weight: 3
    };

    var neighborhoodOptions = {
        fillOpacity: 0,
        color: 'blue',
        opacity: 1,
        weight: 2
    };

    var herOptions = {
        fillOpacity: 1,
        fillColor: 'green',
        weight: 1,
    };

    var options = {
        center: [43.7246, -79.3813],
        zoom: 11,
        minZoom: 9,
        maxZoom: 16,

    };

    

    var map = L.map('map', options);

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
        L.geoJson(trails).addTo(map);
        L.geoJson(cultSpot).addTo(map);

        var i = 0;


        cultSpot.forEach(function(feature, i) {

            var props = feature.properties;

            console.log(feature);

            var herIcon = L.icon({
                iconUrl: 'svg/hert-svg.svg',
                iconSize: [20, 20]
            });
            
            var popup = "<h3>" + props.PNT_OF_INT + "</h3>" + "<p>" + props.DESCRPTION + "</p>" + "<p><b>Website</b>: <a href=' " + props.WEBSITE + "'>" + props.WEBSITE + "</a></p>";

            var herMarker = L.marker([props.LONGITUDE, props.LATITUDE], {
                icon:herIcon
            }).addTo(map).bindPopup(popup);
    
            marker.on('mouseover', function() { //when mouse hovers over marker make it do a thing
                this.openPopup(); //the thing is to open the popup
              });
        
              marker.on('mouseout', function() { //when the mouse moves away from the marker it will do a thing
                this.closePopup(); //the thing will be to close the popup
              });
    
        })

    }

})();