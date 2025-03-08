import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Login from './Login';

// Mock the useAuth hook
jest.mock('../contexts/AuthContext', () => ({
  ...jest.requireActual('../contexts/AuthContext'),
  useAuth: jest.fn(),
}));

const mockUseAuth = useAuth as jest.Mock;

test('renders the login page', () => {
  mockUseAuth.mockReturnValue({
    login: jest.fn(),
  });

  render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  );

  expect(screen.getAllByText(/Login/i)[0]).toBeInTheDocument();
});

test('shows error message on invalid credentials', () => {
  const mockLogin = jest.fn().mockReturnValue(false);
  mockUseAuth.mockReturnValue({
    login: mockLogin,
  });

  render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'wrong' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrong' } });
  fireEvent.click(screen.getAllByText(/Login/i)[1]);

  expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
});