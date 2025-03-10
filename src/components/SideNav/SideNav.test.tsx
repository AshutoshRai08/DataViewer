import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import SideNav from './SideNav'

test('renders the side navigation with menu items', () => {
  render(
    <MemoryRouter>
      <SideNav />
    </MemoryRouter>
  );

  expect(screen.getByText(/Stores/i)).toBeInTheDocument();
  expect(screen.getByText(/SKUs/i)).toBeInTheDocument();
  expect(screen.getByText(/Planning/i)).toBeInTheDocument();
  expect(screen.getByText(/Chart/i)).toBeInTheDocument();
});