import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Planning from '../pages/Planning';

test('renders the planning page with initial data', async () => {
  render(<Planning />);

  // Wait for the grid data to be rendered
  await waitFor(() => {
    // Use a more flexible matcher
    const storeElement = screen.getByTitle((content, element) => content.includes('ABC'));
    // const skuElement = screen.getByText((content, element) => content.includes('Ragged Utility Jacket'));

    // Debug the found elements
    console.log(storeElement);
    // console.log(skuElement);

    expect(storeElement).toBeInTheDocument();
    // expect(skuElement).toBeInTheDocument();
  });
});