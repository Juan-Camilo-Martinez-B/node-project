import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FichaPersonal from './FichaPersonal';
import '@testing-library/jest-dom'; // Actualizado esta línea

describe('Componente FichaPersonal', () => {
  // Datos de prueba
  const mockPerson = {
    name: {
      first: 'John',
      last: 'Doe'
    },
    gender: 'male',
    dob: {
      age: 30
    },
    location: {
      country: 'USA',
      city: 'New York'
    },
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    picture: {
      large: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    login: {
      uuid: '12345' // Añadido para el key único
    }
  };

  const mockOnBack = jest.fn();

  test('renderiza mensaje cuando no hay persona seleccionada', () => {
    render(<FichaPersonal person={null} onBack={mockOnBack} />);
    
    expect(screen.getByText('Ficha de Personal')).toBeInTheDocument();
    expect(screen.getByText('No se ha seleccionado ninguna persona.')).toBeInTheDocument();
    expect(screen.getByText('Volver a resultados')).toBeInTheDocument();
  });

  test('renderiza correctamente los datos de la persona', () => {
    render(<FichaPersonal person={mockPerson} onBack={mockOnBack} />);
    
    // Verificar que los datos básicos se muestren
    expect(screen.getByText('Ficha de Personal')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30 años')).toBeInTheDocument();
    expect(screen.getByText('Masculino')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    
    // Verificar que la imagen se renderiza correctamente
    const image = screen.getByAltText('Foto de John');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockPerson.picture.large);
  });

  test('el botón de volver llama a la función onBack', () => {
    render(<FichaPersonal person={mockPerson} onBack={mockOnBack} />);
    
    const botonVolver = screen.getByText('Volver a resultados');
    fireEvent.click(botonVolver);
    
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  test('renderiza correctamente para género femenino', () => {
    const femalePerson = {
      ...mockPerson,
      gender: 'female',
      name: { first: 'Jane', last: 'Doe' },
      picture: { large: 'https://randomuser.me/api/portraits/women/1.jpg' }
    };
    
    render(<FichaPersonal person={femalePerson} onBack={mockOnBack} />);
    
    expect(screen.getByText('Femenino')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByAltText('Foto de Jane')).toHaveAttribute('src', femalePerson.picture.large);
  });
});