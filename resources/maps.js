$(document).ready(function() {
	gMap(); /*init map*/
});
/*
 * Maps Google
 */
/**
 * default options of map and cluster
 */


var markerIcon = '/img/checkpoint.png';
// var markerIcon = new google.maps.Marker({size: new google.maps.Size(100, 100),
//                     scaledSize: new google.maps.Size(100, 100),
//                     url: "/img/checkpoint.png"};
var mapOptions = [
	{
			"elementType": "geometry",
			"stylers": [
				{
				"color": "#f5f5f5"
				}
			]
			},
			{
			"elementType": "labels.icon",
			"stylers": [
				{
				"visibility": "off"
				}
			]
			},
			{
			"elementType": "labels.text.fill",
			"stylers": [
				{
				"color": "#616161"
				}
			]
			},
			{
			"elementType": "labels.text.stroke",
			"stylers": [
				{
				"color": "#f5f5f5"
				}
			]
			},
			{
			"featureType": "administrative.land_parcel",
			"elementType": "labels.text.fill",
			"stylers": [
				{
				"color": "#bdbdbd"
				}
			]
			},
			{
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [
				{
				"color": "#eeeeee"
				}
			]
			},
			{
			"featureType": "poi",
			"elementType": "labels.text.fill",
			"stylers": [
				{
				"color": "#757575"
				}
			]
			},
			{
			"featureType": "poi.business",
			"stylers": [
				{
				"visibility": "off"
				}
			]
			},
			{
			"featureType": "poi.park",
			"elementType": "geometry",
			"stylers": [
				{
				"color": "#e5e5e5"
				}
			]
			},
			{
			"featureType": "poi.park",
			"elementType": "labels.text",
			"stylers": [
				{
				"visibility": "off"
				}
			]
			},
			{
			"featureType": "poi.park",
			"elementType": "labels.text.fill",
			"stylers": [
				{
				"color": "#9e9e9e"
				}
			]
			},
			{
			"featureType": "road",
			"elementType": "geometry",
			"stylers": [
				{
				"color": "#ffffff"
				}
			]
			},
			{
			"featureType": "road.arterial",
			"elementType": "labels.text.fill",
			"stylers": [
				{
				"color": "#757575"
				}
			]
			},
			{
			"featureType": "road.highway",
			"elementType": "geometry",
			"stylers": [
				{
				"color": "#dadada"
				}
			]
			},
			{
			"featureType": "road.highway",
			"elementType": "labels.text.fill",
			"stylers": [
				{
				"color": "#616161"
				}
			]
			},
			{
			"featureType": "road.local",
			"elementType": "labels.text.fill",
			"stylers": [
				{
				"color": "#9e9e9e"
				}
			]
			},
			{
			"featureType": "transit.line",
			"elementType": "geometry",
			"stylers": [
				{
				"color": "#e5e5e5"
				}
			]
			},
			{
			"featureType": "transit.station",
			"elementType": "geometry",
			"stylers": [
				{
				"color": "#eeeeee"
				}
			]
			},
			{
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [
				{
				"color": "#c9c9c9"
				}
			]
			},
			{
			"featureType": "water",
			"elementType": "labels.text.fill",
			"stylers": [
				{
				"color": "#9e9e9e"
				}
			]
			}
		];
var clusterOptions = {
	imagePath: markerIcon,
	styles: [{
		url:markerIcon,
		height: 60,
		width: 44,
		anchor: [0, 0],
		zoomOnClick: true,
		backgroundPosition: 'top',
		textColor: '#2d3d50',
		textSize: 16
	}]
};

var markersArray = {};
var markerCluster ={};


/**
 * default parameters for map
 */
// var lat = 48.23800899780855,
// 	lng = 31.220982500000036,
// 	center = new google.maps.LatLng(lat, lng);

var lat = 50.45466,
	lng = 30.5238,
	center = new google.maps.LatLng(lat, lng);

/**
 * call info Window globally
 * @type {google.maps.InfoWindow}
 */
var infowindow   = new google.maps.InfoWindow();
/**
 * call map globally
 */
var map;

function gMap() {
	var wrapper = document.querySelector('.half_map');

	// wrapper.style.height = 'calc(100vh - '+ $('header').outerHeight() +'px)';
	 map = new google.maps.Map(document.querySelector('.half_map'), {
		 zoom: 11,
		 center: center,
		 icon: markerIcon,
		 styles: mapOptions,
		 navigationControlOptions: {
			 style: google.maps.NavigationControlStyle.ZOOM_PAN
		 },
		 mapTypeControlOptions: {
			 style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			 position: google.maps.ControlPosition.TOP_RIGHT,
			 mapTypeIds: ['terrain', 'roadmap', 'hybrid']
		 },
		 mapTypeId: google.maps.MapTypeId.ROADMAP,
		 disableDefaultUI: true,
		 navigationControl: true,
		 mapTypeControl: true,
		 streetViewControl: false,
		 scrollwheel: true,
		 fullscreenControl: true
	 });
    // google.maps.event.addDomListener(window, 'resize', function() {
    // 	if (!TEST_MAC) {
    //         map.setCenter(center);
    //     }
    // });

	 google.maps.event.addListener(map, 'click', function(evt) {
		 if (evt.pixel != 'undefined') {
			 infowindow.close();
		 }
	 });
}
if ($('.half_map').is(':visible')) {
    setTimeout(function () {
        $('.half_map').animate({
            'height': 'calc(100vh - ' +$('header').outerHeight()+ 'px)'
        }, 500, function(e) {
            // map.setCenter(new google.maps.LatLng(48.23800899780855, 31.220982500000036));
            is_mapInit = true;
        });
        gMap();
    }, 500)
}


function buildTemplate(object) {
    var secondTime = '';
    if (typeof object.workTime2 !== 'undefined'){
        secondTime = "<span class='shop_time'>" + object.workTime2 + "</span>";
    }
	return  "<div class='open_store_info'>" +
				"<span class='shop_address'>"+object.addressStore+"</span>" +
				"<span class='shop_time'>" + object.workTime + "</span>" +
                secondTime +
			"</div>"
}

/**
 * Наносит маркер ресторана на карту
 */
function add_markers( object ) {
	var markers;
	if (markerCluster.clusters_) {
		markerCluster.clearMarkers();
		map.setZoom(6);
		map.setCenter(center);
		infowindow.close();
	}
    map.setCenter(center);
	markerCluster = new MarkerClusterer(map, markers, clusterOptions);

	
	markers = object.map(function(object, i) {
		var message = buildTemplate(object);

		var marker = new google.maps.Marker({
			position: {lat : object.lat, lng:object.lng},
			map: map,
			icon: markerIcon,
			markerContent : {
				addressStore: object.addressStore,
				workTime: object.workTime,
				workTime2: object.workTime2,
				phones: object.phones
			}
		});
		markersArray[i] = marker;
		marker.setMap(map);
		google.maps.event.addListener(marker, 'click', function(evt) {
			infowindow.setContent(message);
			infowindow.open(map, marker);
		    map.setCenter(new google.maps.LatLng(object.lat, object.lng));
		    map.setZoom(15);
		    return false;
		});
		return marker;
	});
	markerCluster = new MarkerClusterer(map, markers, clusterOptions);
}

function openMarkerInfo(id){
	infowindow.close();
	var marker = markersArray[id];
	var message = buildTemplate(marker.markerContent);
	scrollToElem($('.shop_main'), $('header').outerHeight()+50);
	scrollToElem($('.shop_inner.with_map'), $('header').outerHeight()+50);
	map.setZoom(15);
	map.setCenter( marker.getPosition() );
	infowindow = new google.maps.InfoWindow({
		content: message
	});

	infowindow.open(marker.get('map'), marker);
}

$('[data-point-id]').click(function () {
	openMarkerInfo($(this).attr('data-point-id'));
});





//
// //добавляем текст при клике
// function attachMessage(marker, message, forclicklat, lng) {
//
// 	var infowindow = new google.maps.InfoWindow({
// 		content: message,
// 		disableAutoPan: true
// 	});
//
// 	var mapshere = marker.get('map');
// 	google.maps.event.addListener(marker, 'click', function() {
// 		infowindow.open(mapshere, marker);
// 		mapshere.setZoom(9);
// 		mapshere.setCenter({lat:forclicklat, lng:lng});
// 	});
//
// 	google.maps.event.addListener(map, 'click', function() {
// 		infowindow.close();
// 	});
// }
//
// //создание инфо блока
// function getMessage(id, address, phone, time) {
//
// 	if (time.length > 0) {
// 		var text_time   = $("#text_time").val();
// 		time   = "<b>"+text_time+"</b><span class='shop_time'>"+time+"</span>";
// 	}
// 	markersMessages[id] = "<div class='open_store_info'><span class='shop_adress'>"+address+"</span>"+time+"<span class='shop_phone'>"+phone+"</span></div>";
//
// 	return markersMessages[id];
// }
//
//
//
//
// function changeMap()
// {
// 	clearMarkers();
// 	$('#form_maps').submit();
// 	return false;
// }
//
//
// // Removes the markers from the map, but keeps them in the array.
// function clearMarkers() {
// 	//setAllMap(null);
// 	markersArray.forEach(function(item, i, arr) {
// 		markersArray[i].setMap(null);
// 	});
// }
//
// function showStore(str) {
// 	$('.store__item').hide();
// 	$(str).show();
// }

/**
 * Наносит маркер магазина на карту
 */
//function add_open_marker( latLng, titleStore, addresStore, phones ) {
//    var latlngStr = latLng.split(',', 2);
//    var lat = parseFloat(latlngStr[0]);
//    var lng = parseFloat(latlngStr[1]);
//    var location = new google.maps.LatLng(lat, lng);
//
//    var image = new google.maps.MarkerImage('/design/promo/img/mapsG.png');
//
//    var marker = new google.maps.Marker({
//        position: location,
//        map: map,
//        icon:image,
//        title: titleStore
//    });

//    var info_content = getMessage(titleStore, addresStore, phones);
//
//    var infowindow = new google.maps.InfoWindow({
//        content: info_content
//    });
//
//    map.setCenter( marker.getPosition() );
//    map.setZoom(12);
//    infowindow.open(map, marker);
//  infowindow.setContent(info_content);

//    markersArray.push(marker);
//}









