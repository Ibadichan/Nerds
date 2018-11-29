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

// HIDDEN POLYFILL
if (document.documentElement.hidden === undefined) {
  Object.defineProperty(Element.prototype, "hidden", {
    set: function (value) {
      this.setAttribute('hidden', value);
    },
    get: function () {
      return this.getAttribute('hidden');
    }
  });
}

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
    var self = this;
    this.options = options;

    options.openLink.addEventListener('click', function (event) {
      event.preventDefault();
      self.toggle();
    });

    options.overlay.addEventListener('click', self.toggle.bind(self));
    options.cross.addEventListener('click', self.toggle.bind(self));
  }

  Modal.prototype.toggle = function () {
    var options = this.options;

    options.container.classList.toggle(options.openClass);
    options.overlay.hidden = !options.overlay.hidden;
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
    var self = this,
      control, slide;

    this.slides = document.querySelectorAll(options.slidesClass);
    this.controls = document.querySelectorAll(options.controlsClass);

    for (var i = 0; i < this.slides.length; i++) {
      control = this.controls[i];
      slide = this.slides[i];

      control.addEventListener('click', function (slide) {
        for (var j = 0; j < self.slides.length; j++) {
          self.slides[j].classList.add('slider-item-hidden');
          self.controls[j].classList.remove('selected-control');
        }

        slide.classList.remove('slider-item-hidden');
        this.classList.add('selected-control');
      }.bind(control, slide));
    }
  }

  // ----------------------------------------------------------
  // create objects
  new Modal({
    container: document.querySelector('.modal-write-us'),
    openLink: document.getElementById('write-us-link'),
    cross: document.querySelector('.modal-write-us .modal-close'),
    overlay: document.querySelector('.modal-write-us + .modal-overlay'),
    openClass: 'modal-write-us-show'
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
      modal.classList.remove('modal-write-us-animate');
      void modal.offsetWidth;
      modal.classList.add('modal-write-us-animate');
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
      slidesClass: '.slider-list .slider-item',
      controlsClass: '.slider-controls button'
    });
  }
})();
