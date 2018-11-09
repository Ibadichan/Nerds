(function() {
  function Slider(slide, slideControl) {
    var self = this;
    this.slide = slide;
    this.slideControl = slideControl;

    this.slideControl.onclick = function() {
      var slide, slideControl;

      for (var i = 0; i < Slider.instances.length; i++) {
        slide = Slider.instances[i].slide;
        slideControl = Slider.instances[i].slideControl;

        slide.style.display = 'none';
        slideControl.className = '';
      }

      self.slide.style.display = 'block';
      this.className += 'selected-control';
    }
  }

  Slider.instances = [];

  var slides = document.querySelectorAll('.slider-list .slider-item');
  var controls = document.querySelectorAll('.slider-controls button');

  for (var i = 0; i < slides.length; i++) {
    Slider.instances.push(
      new Slider(slides[i], controls[i])
    );
  }
})();
