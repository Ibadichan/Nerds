function initMap() {
  var petersburg = { lat: 59.938794, lng: 30.323083 };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17, center: petersburg
  });
  var marker = new google.maps.Marker({
    position: petersburg, map: map
  });
  var infowindow = new google.maps.InfoWindow({
    content: '<p>Большая Конюшенная ул., 19</p>'
  });

  infowindow.open(map, marker);
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  }, {passive: true});
}


var firstSlide = document.querySelector('.slider-item:first-child');
var secondSlide = document.querySelector('.slider-item:nth-child(2)');
var thirdSlide = document.querySelector('.slider-item:last-child');

var firstControl = document.querySelector('.slider-controls button:first-child');
var secondControl = document.querySelector('.slider-controls button:nth-child(2)');
var thirdControl = document.querySelector('.slider-controls button:last-child');

firstControl.onclick = function() {
  secondSlide.style.display = 'none';
  thirdSlide.style.display = 'none';
  firstSlide.style.display = 'block';

  firstControl.classList.add('selected-control');
  secondControl.classList.remove('selected-control');
  thirdControl.classList.remove('selected-control');
}

secondControl.onclick = function() {
  firstSlide.style.display = 'none';
  thirdSlide.style.display = 'none';
  secondSlide.style.display = 'block';

  firstControl.classList.remove('selected-control');
  secondControl.classList.add('selected-control');
  thirdControl.classList.remove('selected-control');
}

thirdControl.onclick = function() {
  secondSlide.style.display = 'none';
  firstSlide.style.display = 'none';
  thirdSlide.style.display = 'block';

  firstControl.classList.remove('selected-control');
  secondControl.classList.remove('selected-control');
  thirdControl.classList.add('selected-control');
}
