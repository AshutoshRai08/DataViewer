import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Planning from '../pages/Planning';

test('renders the planning page with initial data', async () => {
  render(<Planning />);

  await waitFor(() => {
    
    const storeElement = screen.getByTitle((content, element) => content.includes('ABC'));
    // const skuElement = screen.getByText((content, element) => content.includes('Ragged Utility Jacket'));

    
    console.log(storeElement);
    // console.log(skuElement);

    expect(storeElement).toBeInTheDocument();
    // expect(skuElement).toBeInTheDocument();
  });
});