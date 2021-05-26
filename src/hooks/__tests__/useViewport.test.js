import { fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useViewport } from 'hooks/useViewport';

test('should return new size of the window', () => {
  const { result } = renderHook(() => useViewport());

  expect(result.current.width).toBe(1024);
  expect(result.current.height).toBe(768);

  act(() => {
    window.innerWidth = 600;
    window.innerHeight = 600;

    fireEvent(window, new Event('resize'));
  });

  expect(result.current.width).toBe(600);
  expect(result.current.height).toBe(600);
});
