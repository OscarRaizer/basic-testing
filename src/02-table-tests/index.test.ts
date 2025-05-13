// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 13, b: 2, action: Action.Subtract, expected: 11 },
  { a: 14, b: 2, action: Action.Divide, expected: 7 },
  { a: 32, b: 2, action: Action.Divide, expected: 16 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 12, action: Action.Multiply, expected: 36 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 10, action: 'bug', expected: null },
  { a: 'bug', b: 2, action: Action.Exponentiate, expected: null },
  { a: 2, b: 'bug', action: Action.Exponentiate, expected: null },
  { a: 'bug', b: 'bug', action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'given $a, $b, $action should return $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
