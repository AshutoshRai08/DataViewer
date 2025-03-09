import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SKUs from './SKUs';

test('renders the SKUs page with initial data', async () => {
  render(<SKUs />);

  
  await waitFor(() => {
    
    const skuElement = screen.getByText((content, element) => content.includes('Cotton Polo Shirt'));
    expect(skuElement).toBeInTheDocument();
  });
});

test('adds a new SKU', async () => {
  render(<SKUs />);

  
  fireEvent.click(screen.getByText(/NEW SKU/i));

  
  fireEvent.change(screen.getByLabelText(/SKU Name/i), { target: { value: 'New SKU' } });
  fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '100' } });
  fireEvent.change(screen.getByLabelText(/Cost/i), { target: { value: '50' } });

  
  fireEvent.click(screen.getByText(/Save/i));

  screen.debug();
  
  await waitFor(() => {
    
    const newSkuElement = screen.getByText((content, element) => content.includes('New SKU'));
    expect(newSkuElement).toBeInTheDocument();
  });
});