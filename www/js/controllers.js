angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
  }).then(function(modal) {
      $scope.modal = modal;
  });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
  };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
  };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
          $scope.closeLogin();
      }, 1000);
    };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [{
    title: 'Reggae',
    id: 1
}, {
    title: 'Chill',
    id: 2
}, {
    title: 'Dubstep',
    id: 3
}, {
    title: 'Indie',
    id: 4
}, {
    title: 'Rap',
    id: 5
}, {
    title: 'Cowbell',
    id: 6
}];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {})

.controller('MapCtrl', function($scope, $http) {


  var getDatas = function(){
    var url = 'https://api.foursquare.com/v2/venues/search?client_id=IYP1KGZ21ZAFQX32L1XG50TPYQMPUYEBSGU1ILJKIIYAYZE0&client_secret=1HCPOMLY5CPB3URSVQS2SUBCIRV4N50QJTCSBJNWEMEALK5T&v=20130815&ll=48.8534100,2.3488000&query=coffee';

    $http.get(url).success(function(data){
        for(var i = 0; i < data.response.venues.length; i++){
            createMarker(data.response.venues[i]);
        }
    });



};

getDatas();


var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(48.8534100, 2.3488000),
    mapTypeId: google.maps.MapTypeId.TERRAIN
}

$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

$scope.markers = [];

var infoWindow = new google.maps.InfoWindow();

var createMarker = function(info) {
    console.log(info);
    var marker = new google.maps.Marker({
      map: $scope.map,
      position: new google.maps.LatLng(info.location.lat, info.location.lng),
      title: info.location.address
  });
    marker.content = '<div class="infoWindowContent">' + info.name + '</div>';

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
      infoWindow.open($scope.map, marker);
  });

    $scope.markers.push(marker);

}


$scope.openInfoWindow = function(e, selectedMarker) {
    e.preventDefault();
    google.maps.event.trigger(selectedMarker, 'click');
}

});