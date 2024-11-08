// SigninForm.test.js
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

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
}));

describe('SigninForm Component', () => {
  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("affiche un message d'erreur si l'authentification échoue", async () => {
    // Simule une erreur de connexion avec un message
    signin.mockRejectedValue({ message: 'Invalid credentials' });

    render(
      <MemoryRouter>
        <SigninForm />
      </MemoryRouter>
    );

    // Remplissage des champs email et mot de passe
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: 'wrongpassword' },
    });

    // Soumet le formulaire
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    // Attendre l'affichage de l'erreur
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  test('affiche un message de succès et redirige après une connexion réussie', async () => {
    // Simule un succès de connexion
    signin.mockResolvedValue({ token: 'fake-token' });

    render(
      <MemoryRouter>
        <SigninForm />
      </MemoryRouter>
    );

    // Remplissage des champs email et mot de passe
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: 'password123' },
    });

    // Soumet le formulaire
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    // Attendre l'affichage du message de succès
    await waitFor(() => {
      expect(screen.getByText(/signin successful!/i)).toBeInTheDocument();
    });

    // Vérifie que `setToken` est appelé avec le bon token
    expect(setToken).toHaveBeenCalledWith('fake-token');
    console.log("Avt der étape"),

    // Vérifie que `navigate` est appelé pour rediriger l'utilisateur
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  }, { timeout: 1500 });
});
