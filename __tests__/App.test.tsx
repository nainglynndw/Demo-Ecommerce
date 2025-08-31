/**
 * @format
 */

// Test jest itslef work or not
test('Basic math operations work', () => {
  expect(2 + 2).toBe(4);
  expect(5 * 3).toBe(15);
  expect(10 / 2).toBe(5);
});

test('String operations work', () => {
  expect('React Native'.length).toBe(12);
});

test('Array operations work', () => {
  const numbers = [1, 2, 3, 4, 5];
  expect(numbers.length).toBe(5);
  expect(numbers.reduce((a, b) => a + b, 0)).toBe(15);
});
