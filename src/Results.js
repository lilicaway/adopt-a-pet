import React from "react";
import pf from "petfinder-client";
import Pet from "./Pet";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: []
    };
  }
  componentDidMount() {
    petfinder.pet
      .find({ output: "full", location: "Seattle, WA" })
      .then(data => {
        let pets;
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          // if exists
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            // if it founds only one animal wrap it in an array
            pets = [data.petfinder.pets.pet];
          }
        } else {
          // no pets were found
          pets = [];
        }
        // this is how we tell react that something change
        // react wraps all calls of setState into one => good for perfomance
        // performs a shallow merge, only update pets
        this.setState({
          pets: pets
        });
      });
  }

  render() {
    return (
      <div className="search">
        {this.state.pets.map(pet => {
          let breed;
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              key={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }
}

export default Results;
