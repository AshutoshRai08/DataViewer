import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stores from './Stores';

test('renders the stores page with initial data', () => {
  render(<Stores />);

  expect(screen.getByText(/Nashville Melody Music Store/i)).toBeInTheDocument();
  expect(screen.getByText(/Miami Breeze Apparel/i)).toBeInTheDocument();
});

test('adds a new store', () => {
  render(<Stores />);

  fireEvent.click(screen.getByText(/NEW STORE/i));
  fireEvent.change(screen.getByLabelText(/Store Name/i), { target: { value: 'New Store' } });
  fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'New City' } });
  fireEvent.change(screen.getByLabelText(/State/i), { target: { value: 'New State' } });
  fireEvent.click(screen.getByText(/Save/i));

  expect(screen.getByText(/New Store/i)).toBeInTheDocument();
});