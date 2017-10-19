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
        weight: 1
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
    }
})();