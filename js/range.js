(function() {
  var slider = document.getElementById('two-range-slider');
  var min = document.getElementById('min-price'),
      max = document.getElementById('max-price');

  noUiSlider.create(slider, {
    start: [0, 7500],
    connect: true,
    step: 500,
    margin: 2000,
    range: {
        'min': 0,
        'max': 15000
    }
  });

  slider.noUiSlider.on('update', function (values, handle) {
    (handle ? max : min).value = String(values[handle]).slice(0, -3);
  });
})();
