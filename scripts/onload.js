mapboxgl.accessToken = 'pk.eyJ1IjoiY29yZS1naXMiLCJhIjoiaUxqQS1zQSJ9.mDT5nb8l_dWIHzbnOTebcQ';

//set bounds to San Juan County
var bounds = [
		[-123.516541,48.328865], // southwest coords
		[-122.252426,48.772935] // northeast coords
	];

const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/core-gis/cl1l6639a004t14o9z7cr5ejd',
	center: [-122.920189,48.573200],
	zoom: 10
});

map.on('load', function () {

	map.addSource('parcels',{
		type:'vector',
		url:'mapbox://core-gis.axlnkyxp'
		});
		//Add a map layer for all the parcels

	map.addLayer({
		"id":"parcel_lines_outline",
		"type":"line",
		"source":"parcels",
		"source-layer":"san_juan_county_parcels-dyole2",
		"layout":{		},
		"paint":{
			'line-color': "#909291",
            'line-width': 1
	},
});

	map.addLayer({
		"id":"parcel_lines",
		"type":"fill",
		"source":"parcels",
		"source-layer":"san_juan_county_parcels-dyole2",
		"layout":{		},
		"paint":{
			'fill-color': 'rgba(200, 100, 240, 0)',
            'fill-outline-color': 'rgba(200, 100, 240, 0)'
			}	
	},
			'road-simple' // existing layer to position the new one behind
	);
});

// When a click event occurs on a feature in the states layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'parcel_lines', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(fillpopup(e.features[0].properties))
            .addTo(map);
		console.log(e.features[0].properties);
    });
	
	 // Change the cursor to a pointer when the mouse is over the parcel layer.
    map.on('mouseenter', 'parcel_lines', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'parcel_lines', function () {
        map.getCanvas().style.cursor = '';
    });
	
	function fillpopup(data){
		var html = "";
		html = html + "<span class='varname'>PIN: </span> <span class='attribute'>" + data.PIN + "</span>";
		html = html + "<br>"
		html = html + "<span class='varname'>Owner:</span> <span class='attribute'>" + data.Owner + "</span>";
		html = html + "<br>"
		html = html + "<span class='varname'>Acres:</span> <span class='attribute'>" + data.Legal_Acre + "</span>";
		html = html + "<br>"
		html = html + "<span class='varname'>Year Built: </span> <span class='attribute'>" + data.year_built + "</span>";
		html = html + "<br>"
		html = html + "<span class='varname'>Assessed Land Value: </span> <span class='attribute'>" + data.Land_Value + "</span>";
		html = html + "<br>"
		html = html + "<span class='varname'>Assessed Building Value: </span> <span class='attribute'>" + data.Bldg_Value + "</span>";
		return html;
		//this will return the string to the calling function
		
	}
