// CLASSLIST POLYFILL

// Источник: https://gist.github.com/k-gun/c2ea7c49edf7b757fe9561ba37cb19ca
;
(function () {
  // helpers
  var regExp = function (name) {
    return new RegExp('(^| )' + name + '( |$)');
  };
  var forEach = function (list, fn, scope) {
    for (var i = 0; i < list.length; i++) {
      fn.call(scope, list[i]);
    }
  };

  // class list object with basic methods
  function ClassList(element) {
    this.element = element;
  }

  ClassList.prototype = {
    add: function () {
      forEach(arguments, function (name) {
        if (!this.contains(name)) {
          this.element.className += ' ' + name;
        }
      }, this);
    },
    remove: function () {
      forEach(arguments, function (name) {
        this.element.className =
          this.element.className.replace(regExp(name), '');
      }, this);
    },
    toggle: function (name) {
      return this.contains(name) ?
        (this.remove(name), false) : (this.add(name), true);
    },
    contains: function (name) {
      return regExp(name).test(this.element.className);
    },
    // bonus..
    replace: function (oldName, newName) {
      this.remove(oldName), this.add(newName);
    }
  };

  // IE8/9, Safari
  if (!('classList' in Element.prototype)) {
    Object.defineProperty(Element.prototype, 'classList', {
      get: function () {
        return new ClassList(this);
      }
    });
  }

  // replace() support for others
  if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
    DOMTokenList.prototype.replace = ClassList.prototype.replace;
  }
})();

// ---------------------------------------------------------

// GOOGLE MAP
function initMap() {
  var petersburg = {
    lat: 59.938794,
    lng: 30.323083
  };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: petersburg
  });
  var marker = new google.maps.Marker({
    position: petersburg,
    map: map
  });
  var infowindow = new google.maps.InfoWindow({
    content: '<p>Большая Конюшенная ул., 19</p>'
  });

  infowindow.open(map, marker);
  marker.addListener('click', function () {
    infowindow.open(map, marker);
  });
}

(function () {
  // MODAL
  function Modal(options) {
    this.options = options;

    options.openLink.addEventListener('click', this.toggle.bind(this));
    options.overlay && options.overlay.addEventListener('click', this.toggle.bind(this));
    options.cross && options.cross.addEventListener('click', this.toggle.bind(this));

    window.addEventListener('keydown', function(event) {
      var modal = options.container
      var modalOpenClass = options.modalOpenClass;

      if (event.keyCode === 27 && modal.classList.contains(modalOpenClass)) {
        event.preventDefault();
        modal.classList.remove(modalOpenClass);
        if (!options.overlay || !options.overlayOpenClass) { return; }
        options.overlay.classList.remove(options.overlayOpenClass);
      }
    });
  }

  Modal.prototype.toggle = function(event) {
    event.preventDefault();
    var options = this.options;

    options.animateClass && options.container.classList.remove(options.animateClass);
    options.container.classList.toggle(options.modalOpenClass);
    options.overlay && options.overlay.classList.toggle(options.overlayOpenClass);
    options.fieldToFocus && options.fieldToFocus.focus();
  }

  // FORM VALIDATION
  function FormValidation(options) {
    var button = options.form.querySelector('button[type=submit]');

    button.addEventListener('click', function () {
      options.scopeFunction.apply(this, [options.scope, options.fields]);
    });
  }

  // RANGE SLIDER
  function RangeSlider(options) {
    noUiSlider.create(options.container, options.sliderParams);

    options.container.noUiSlider.on('update', function (values, handle) {
      var value = String(values[handle]).slice(0, -3);
      (handle ? options.maxContainer : options.minContainer).value = value;
    });
  }

  // SLIDER
  function Slider(options) {
    var control, slide;
    var slides = options.slides;
    var controls = options.controls;

    for (var i = 0; i < slides.length; i++) {
      control = controls[i];
      slide = slides[i];

      control.addEventListener('click', function (slide) {
        for (var j = 0; j < slides.length; j++) {
          slides[j].classList.add(options.hiddenSlideClass);
          controls[j].classList.remove(options.activeControlClass);
        }

        slide.classList.remove(options.hiddenSlideClass);
        this.classList.add(options.activeControlClass);
      }.bind(control, slide));
    }
  }

  // ----------------------------------------------------------
  // create objects
  new Modal({
    container: document.querySelector('.modal-write-us'),
    openLink: document.querySelector('#write-us-link'),
    modalOpenClass: 'modal-write-us-show',
    cross: document.querySelector('.modal-write-us .modal-close'),
    overlay: document.querySelector('.modal-write-us + .modal-overlay'),
    overlayOpenClass: 'modal-overlay-show',
    fieldToFocus: document.querySelector('#write-us-name'),
    animateClass: 'modal-write-us-error'
  });

  new FormValidation({
    form: document.querySelector('.write-us-form'),
    fields: [
      document.getElementById('write-us-name'),
      document.getElementById('write-us-email'),
      document.getElementById('write-us-text')
    ],
    scope: document.querySelector('.modal-write-us'),
    scopeFunction: function (modal, fields) {
      var fieldsIsValid;

      for (var i = 0; i < fields.length; i++) {
        fieldsIsValid = fields[i].validity.valid;
        if (fieldsIsValid === false) { break; }
      }

      if (fieldsIsValid) { return; }
      modal.classList.remove('modal-write-us-error');
      void modal.offsetWidth;
      modal.classList.add('modal-write-us-error');
    }
  });

  if (document.getElementById('two-range-slider')) {
    new RangeSlider({
      container: document.getElementById('two-range-slider'),
      minContainer: document.getElementById('min-price'),
      maxContainer: document.getElementById('max-price'),
      sliderParams: {
        start: [0, 7500],
        connect: true,
        step: 500,
        margin: 2000,
        range: {
          'min': 0,
          'max': 15000
        }
      }
    });
  } else if (document.querySelector('.slider-list')) {
    new Slider({
      slides: document.querySelectorAll('.slider-list .slider-item'),
      controls: document.querySelectorAll('.slider-controls button'),
      hiddenSlideClass: 'slider-item-hidden',
      activeControlClass: 'selected-control'
    });
  }
})();
