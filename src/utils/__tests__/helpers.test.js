import { performSearch, sortBy } from 'utils/helpers';
import mockData from 'mocks/data';

describe('performSearch Function', () => {
  it(`returns an empty array if searchTerm doesn't match any record`, () => {
    expect(performSearch(mockData.results, 'abcd')).toStrictEqual([]);
  });

  it('performs search and returns result as expected', () => {
    expect(performSearch(mockData.results, 'Mic')).toStrictEqual([mockData.results[0]]);
  });
});

describe('sortBy function', () => {
  it(`returns the data if column parameter is null`, () => {
    expect(sortBy(mockData.results, null)).toStrictEqual(mockData.results);
  });

  it('should sort the data in ascending', () => {
    const sorted = sortBy(mockData.results, 'email', 'ascending');
    expect(sorted[0].email).toMatch(/amparo/i);
  });

  it('should sort the data in descending', () => {
    const sorted = sortBy(mockData.results, 'email', 'descending');
    expect(sorted[0].email).toMatch(/michael/i);
  });
});
