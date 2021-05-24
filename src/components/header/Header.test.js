import { toHaveAttribute } from '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from 'utils/testing-utils';
import Header from './Header';

const mockedSetViewType = jest.fn();

beforeEach(() => {
  const providerProps = {
    value: { setSearchTerm: jest.fn((value) => {}) },
  };
  customRender(<Header setViewType={mockedSetViewType} />, { providerProps });
});

test('renders the Search input & displays correct value', async () => {
  const searchInput = screen.getByPlaceholderText(/search/i);
  userEvent.type(searchInput, 'Michael');
  expect(searchInput).toHaveValue('Michael');
});

// test('toggle view button toggles the viewType correctly', () => {
//   const toggleBtn = screen.getByTestId('toggle-view-btn');
//   expect(toggleBtn).toHaveTextContent(/map/i);
//   userEvent.click(toggleBtn);
//   expect(mockedSetViewType).toHaveBeenCalledTimes(1);
// });
