import React from "react";
import './FichaPersonal.css';

function FichaPersonal({ person, onBack }) {
  // Datos complementarios
  const professions = ['Desarrollador', 'Diseñador', 'Gerente', 'Analista', 'Arquitecto', 'Ingeniero'];
  const maritalStatuses = ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a'];
  
  if (!person) {
    return (
      <div className="ficha-container">
        <h2>Ficha de Personal</h2>
        <p className="no-data">No se ha seleccionado ninguna persona.</p>
        <button onClick={onBack} className="btn-back">
          Volver a resultados
        </button>
      </div>
    );
  }

  const userData = {
    ...person,
    estadoCivil: maritalStatuses[Math.floor(Math.random() * maritalStatuses.length)],
    profesion: professions[Math.floor(Math.random() * professions.length)],
    genero: person.gender === 'male' ? 'Masculino' : 'Femenino'
  };

  return (
    <div className="ficha-container">
      <div className="ficha-header">
        <h2>Ficha de Personal</h2>
        <button onClick={onBack} className="btn-back">
          Volver a resultados
        </button>
      </div>
      
      <div className="ficha-content">
        <div className="ficha-foto">
          <img src={userData.picture.large} alt={`Foto de ${userData.name.first}`} />
        </div>
        
        <div className="ficha-datos">
          <h3>{`${userData.name.first} ${userData.name.last}`}</h3>
          <p><strong>Edad:</strong> {userData.dob.age} años</p>
          <p><strong>Género:</strong> {userData.genero}</p>
          <p><strong>Estado Civil:</strong> {userData.estadoCivil}</p>
          <p><strong>Profesión:</strong> {userData.profesion}</p>
          <p><strong>País:</strong> {userData.location.country}</p>
          <p><strong>Ciudad:</strong> {userData.location.city}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Teléfono:</strong> {userData.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default FichaPersonal;