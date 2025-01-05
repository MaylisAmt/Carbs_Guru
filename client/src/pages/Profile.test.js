import {React, act} from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from './Profile';
import { getProfile, getGoals, deleteGoal, signin } from '../api';

// Mock de `signin`, `setToken`, et `useNavigate`
jest.mock('../api.js', () => ({
    getProfile: jest.fn(),
    getGoals: jest.fn(),
    deleteGoal: jest.fn(),
    signin : jest.fn()
  }));
  
  jest.mock('../auth.js', () => ({
    setToken: jest.fn(),
  }));

// Mock the react-router-dom's useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock image imports
jest.mock('../assets/icon.png', () => 'icon-path');
jest.mock('../assets/editpencil.png', () => 'edit-path');
jest.mock('../assets/bin.png', () => 'bin-path');

describe('Profile Component', () => {
    const mockProfile = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    const mockGoals = {
        goals: [
          {
            goalId: 1,
            mealName: 'Breakfast',
            carbsTrain: 50,
            proteinsTrain: 30,
            fatsTrain: 20,
            carbsRest: 40,
            proteinsRest: 25,
            fatsRest: 15
          },
          {
            goalId: 2,
            mealName: 'Lunch',
            carbsTrain: 60,
            proteinsTrain: 35,
            fatsTrain: 25,
            carbsRest: 45,
            proteinsRest: 30,
            fatsRest: 20
          }
        ]
      };
    const mockGoalWithMeal = {
        goals: [
            {
              goalId: 1,
              mealName: 'Breakfast',
              carbsTrain: 50,
              proteinsTrain: 30,
              fatsTrain: 20,
              carbsRest: 40,
              proteinsRest: 25,
              fatsRest: 15,
              meals: [
                {
                  mealId: 1,
                  name: 'Sandwich',
                  goalId: 1
                }
              ]
            },
            {
                goalId: 2,
                mealName: 'Lunch',
                carbsTrain: 50,
                proteinsTrain: 30,
                fatsTrain: 20,
                carbsRest: 40,
                proteinsRest: 25,
                fatsRest: 15,
                meals: [
                  {
                    mealId: 2,
                    name: 'Pasta',
                    goalId: 2
                  }
                ]
              }
        ]
    }
    beforeEach(() => {
    jest.clearAllMocks();
    });

    describe('GET operations', () => {
        test('should display profile and goals data after successful fetch', async () => {
            getProfile.mockResolvedValueOnce(mockProfile);
            getGoals.mockResolvedValueOnce(mockGoals);
      
            render(
              <MemoryRouter>
                <Profile />
              </MemoryRouter>
            );
      
            await waitFor(() => {
              expect(screen.getByText(`Name: ${mockProfile.name}`)).toBeInTheDocument();
              expect(screen.getByText(`Email: ${mockProfile.email}`)).toBeInTheDocument();
              expect(screen.getByText(mockGoals.goals[0].mealName)).toBeInTheDocument();
            });
      
            expect(getProfile).toHaveBeenCalledTimes(1);
            expect(getGoals).toHaveBeenCalledTimes(1);
        });

        test('should render empty state when no goals exist', async () => {
            getProfile.mockResolvedValueOnce(mockProfile);
            getGoals.mockResolvedValueOnce({ goals: [] });
      
            render(
              <MemoryRouter>
                <Profile />
              </MemoryRouter>
            );
      
            await waitFor(() => {
              expect(screen.getByText('No goals yet.')).toBeInTheDocument();
              expect(screen.getByText('Add your first goal')).toBeInTheDocument();
            });
          });
    })
    
    describe('DELETE operations', () => {
        test('should delete goal without meal when targeted delete button is clicked and confirmed', async () => {
            // Configuration initiale : simuler le profil et les goals initiaux
            getProfile.mockResolvedValueOnce(mockProfile);
            getGoals.mockResolvedValueOnce(mockGoals);
    
            // Simuler la réponse après la suppression : tous les goals sauf celui supprimé
            const goalsAfterDelete = {
            goals: mockGoalWithMeal.goals.filter(goal => goal.goalId !== 1)
            };
    
            // Simuler une suppression réussie et la récupération mise à jour des goals
            deleteGoal.mockResolvedValueOnce({ message: 'Goal deleted successfully' });
            getGoals.mockResolvedValueOnce(goalsAfterDelete);

            // Simuler la confirmation de suppression
            const mockConfirm = jest.spyOn(window, 'confirm');
            mockConfirm.mockImplementation(() => true);

            // Rendre le composant
            render(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
            );

            // Attendre que les données initiales soient chargées
            await waitFor(() => {
            expect(screen.getByText('Breakfast')).toBeInTheDocument();
            expect(screen.getByText('Lunch')).toBeInTheDocument();
            });

            // Trouver et cliquer sur le bouton de suppression du premier goal
            const deleteButton = screen.getByTestId(`delete-button-${mockGoalWithMeal.goals[0].goalId}`);
            await act(async () => {
            fireEvent.click(deleteButton); // Cliquer sur le premier bouton de suppression
            });

            // Vérifier que la confirmation a été demandée
            expect(mockConfirm).toHaveBeenCalledWith('Are you sure you want to delete this goal?');

            // Vérifier que la fonction deleteGoal a été appelée avec le bon ID
            expect(deleteGoal).toHaveBeenCalledWith(1);

            // Vérifier que le goal "Breakfast" n'est plus affiché mais que "Lunch" est toujours là
            await waitFor(() => {
            expect(screen.queryByText('Breakfast')).not.toBeInTheDocument();
            expect(screen.getByText('Lunch')).toBeInTheDocument();
            });

            // Nettoyer le mock de confirm
            mockConfirm.mockRestore();
        });
    })
})
