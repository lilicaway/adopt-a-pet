import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };

  static getDerivedStateFromProps({ media }) {
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }
    return { photos };
  }
  // The semantics help binding this
  // This doesn't create a new context, so it refers to the lexical scope is in
  handleIndexClick = event => {
    this.setState({
      // we coerse the String in there and we coerse it with +
      active: +event.target.dataset.index
    });
  };
  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active].value} alt="Primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            /* eslint-disable-next-line */
            <img
              // we need to be carefull with the context of this
              onClick={this.handleIndexClick}
              key={photo.value}
              data-index={index}
              src={photo.value}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
