import { performSearch } from 'utils/helpers';
import mockData from 'mocks/data';

describe('performSearch Function', () => {
  it(`returns an empty array if searchTerm doesn't match any record`, () => {
    expect(performSearch(mockData, 'abcd')).toStrictEqual([]);
  });

  it('performs search and returns result as expected', () => {
    expect(performSearch(mockData, 'Mic')).toStrictEqual([mockData.results[0]]);
  });
});
