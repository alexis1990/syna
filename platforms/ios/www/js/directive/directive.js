app.directive('ngMap', function(){
	
	return{

		defaults: {
			tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
			maxZoom: 14,
			path: {
				weight: 10,
				color: '#800000',
				opacity: 1
			}
		},
		center: {
			lat: 51.505,
			lng: -0.09,
			zoom: 8
		}
	}
});



