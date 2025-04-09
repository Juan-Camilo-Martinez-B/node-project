import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Person from './Person';
import '@testing-library/jest-dom';

describe('Componente Person', () => {
  const mockPerson = {
    name: { first: 'Camila', last: 'Ramírez' },
    location: { country: 'Colombia' },
    picture: { medium: 'https://randomuser.me/api/portraits/med/women/45.jpg' },
    login: { uuid: 'abc123' }
  };

  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza nombre, país e imagen correctamente', () => {
    render(<Person person={mockPerson} onSelect={mockOnSelect} />);

    expect(screen.getByText('Camila Ramírez')).toBeInTheDocument();
    expect(screen.getByText('Colombia')).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockPerson.picture.medium);
    expect(image).toHaveAttribute('alt', 'Camila Ramírez');
  });

  test('llama a onSelect cuando se hace clic en Ver Ficha', () => {
    render(<Person person={mockPerson} onSelect={mockOnSelect} />);
  
    const boton = screen.getByText('Ver Ficha');
    fireEvent.click(boton);
  
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(mockPerson);
  });
  

  test('llama a onSelect al hacer clic en la tarjeta completa', () => {
    render(<Person person={mockPerson} onSelect={mockOnSelect} />);

    const tarjeta = screen.getByText('Camila Ramírez').closest('.person-card');
    fireEvent.click(tarjeta);

    expect(mockOnSelect).toHaveBeenCalledWith(mockPerson);
  });
});
