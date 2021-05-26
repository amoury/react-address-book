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

describe('SearchInput', () => {
  it('clearBtn is not visible when input is empty', () => {
    expect(screen.queryByTestId('clear-btn')).not.toBeInTheDocument();
  });

  it('input renders the correct value that user types', () => {
    const searchInput = screen.getByPlaceholderText(/search/i);
    userEvent.type(searchInput, 'Michael');
    expect(searchInput).toHaveValue('Michael');
  });

  it('Search Input', () => {
    const searchInput = screen.getByPlaceholderText(/search/i);
    userEvent.type(searchInput, 'abc');
    userEvent.click(screen.getByTestId('clear-btn'));
    expect(screen.getByPlaceholderText(/search/i)).toHaveValue('');
  });
});
