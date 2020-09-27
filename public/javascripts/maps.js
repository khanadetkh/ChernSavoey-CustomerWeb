// Map

  $(document).ready(function () {
    var map = null;
    var myMarker;
    var myLatlng;

    // function initializeGMap(lat, lng) {
    //   myLatlng = new google.maps.LatLng(lat, lng);

    //   var myOptions = {
    //     zoom: 12,
    //     zoomControl: true,
    //     center: myLatlng,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   };

    //   map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    //   myMarker = new google.maps.Marker({
    //     position: myLatlng
    //   });
    //   myMarker.setMap(map);
    // }

    function initializeGMap() {
      var mapOptions = {
        center: {lat: 13.847860, lng: 100.604274},
        zoom: 18,
      }
        
      var maps = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
      
      var marker = new google.maps.Marker({
         position: new google.maps.LatLng(13.847616, 100.604736),
         map: maps,
         title: 'ถนน ลาดปลาเค้า',
         icon: 'images/camping-icon.png',
      });
    
      var info = new google.maps.InfoWindow({
        content : '<div style="font-size: 25px;color: red">ThaiCreate.Com Camping</div>'
      });
    
      google.maps.event.addListener(marker, 'click', function() {
        info.open(maps, marker);
      });
    
    }
    // Re-init map before show modal
    $('#myModal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget);
      initializeGMap(button.data('lat'), button.data('lng'));
      $("#location-map").css("width", "100%");
      $("#map_canvas").css("width", "100%");
    });

    // Trigger map resize event after modal shown
    $('#myModal').on('shown.bs.modal', function () {
      google.maps.event.trigger(map, "resize");
      map.setCenter(myLatlng);
    });
  });




      