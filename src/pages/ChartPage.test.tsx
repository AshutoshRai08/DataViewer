import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChartPage from './ChartPage';

test('renders the chart page with initial data', () => {
  render(<ChartPage />);

  expect(screen.getByText(/Gross Margin/i)).toBeInTheDocument();
  expect(screen.getByText(/San Francisco Bay Trends/i)).toBeInTheDocument();
});

test('changes store selection', () => {
  render(<ChartPage />);

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Los Angeles Luxe' } });

  expect(screen.getByText(/Los Angeles Luxe/i)).toBeInTheDocument();
});