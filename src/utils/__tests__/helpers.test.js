import { performSearch } from 'utils/helpers';
import mockData from 'mocks/data';

describe('performSearch Function', () => {
  it(`returns an empty array if searchTerm doesn't match any record`, () => {
    expect(performSearch(mockData.results, 'abcd')).toStrictEqual([]);
  });

  it('performs search and returns result as expected', () => {
    expect(performSearch(mockData.results, 'Mic')).toStrictEqual([mockData.results[0]]);
  });
});
