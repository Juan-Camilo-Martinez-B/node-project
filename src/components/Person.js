import React from 'react';
import './Person.css';

function Person({ person, onSelect }) {
  return (
    <div className="person-card" onClick={() => onSelect(person)}>
      <img src={person.picture.medium} alt={`${person.name.first} ${person.name.last}`} />
      <div className="person-info">
        <h3>{`${person.name.first} ${person.name.last}`}</h3>
        <p>{person.location.country}</p>
        <button 
          className="btn-view-profile"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(person);
          }}
        >
          Ver Ficha
        </button>
      </div>
    </div>
  );
}

export default Person;