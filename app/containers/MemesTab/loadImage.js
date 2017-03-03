function loadImage(event) {
  let that = this;
  let reader = new FileReader();
  reader.onload = function (evt) {
    that.props.pickMeme(evt.target.result);
  }
  reader.readAsDataURL(event.target.files[0]);
}

function loadImageURL(event) {
  const URL = window.URL;
  const url = URL.createObjectURL(event.target.files[0]);
  this.props.addMeme(url);
}
