function modalConstructor(modal, openLink, cross, overlay, openClass) {
  var self = this;
  this.openClass = openClass;
  this.modal = modal;
  this.overlay = overlay;

  openLink.addEventListener('click', function(event) {
    event.preventDefault();
    self.toggleModal();
  });

  overlay.addEventListener('click', this.toggleModal.bind(this));
  cross.addEventListener('click', this.toggleModal.bind(this));
}

modalConstructor.prototype.toggleModal = function() {
  var classList = this.modal.className.split(' ');
  var index = classList.indexOf(this.openClass);

  if (index != -1) {
    classList.splice(index, 1);
    this.modal.className = classList.join(' ');
    this.overlay.style.display = 'none';
  } else {
    this.modal.className += ' ' + this.openClass;
    this.overlay.style.display = 'block';
  }
}

new modalConstructor(
  document.querySelector('.modal-write-us'),
  document.getElementById('write-us-link'),
  document.querySelector('.modal-write-us .modal-close'),
  document.querySelector('.modal-write-us + .modal-overlay'),
  'modal-write-us-show'
);


(function() {
  var form = document.querySelector('.write-us-form');
  var fields = {
    name: document.getElementById('write-us-name'),
    email: document.getElementById('write-us-email'),
    text: document.getElementById('write-us-text')
  };
  var button = form.querySelector('button[type=submit]');
  var modal = document.querySelector('.modal-write-us');

  button.addEventListener('click', function() {
    var fieldsIsValid = (
      fields.name.validity.valid &&
      fields.email.validity.valid &&
      fields.text.validity.valid
    );

    if (!fieldsIsValid) {
      modal.classList.remove('modal-write-us-animate');
      void modal.offsetWidth;
      modal.classList.add('modal-write-us-animate');
    }
  }, false);
})();
