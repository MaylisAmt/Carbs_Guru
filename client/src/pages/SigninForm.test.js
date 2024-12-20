import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SigninForm from './Signin.js';
import { signin } from '../api.js';
import { setToken } from '../auth.js';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router';

// Mock de `signin`, `setToken`, et `useNavigate`
jest.mock('../api.js', () => ({
  signin: jest.fn(),
}));

jest.mock('../auth.js', () => ({
  setToken: jest.fn(),
}));

// Créez un mock pour `useNavigate`
const mockNavigate = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate, // Mock la fonction navigate pour le test
}));

describe('SigninForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("affiche un message d'erreur si l'authentification échoue", async () => {
    signin.mockRejectedValue({ message: 'Invalid credentials' });

    render(
      <MemoryRouter>
        <SigninForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  test('affiche un message de succès et redirige après une connexion réussie', async () => {
    jest.useFakeTimers();
    signin.mockResolvedValue({ token: 'fake-token' });

    render(
      <MemoryRouter>
        <SigninForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/signin successful!/i)).toBeInTheDocument();
    });

    jest.runAllTimers();

    expect(setToken).toHaveBeenCalledWith('fake-token');
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });
});

