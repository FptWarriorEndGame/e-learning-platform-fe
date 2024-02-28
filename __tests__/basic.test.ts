import { describe, expect, test } from 'vitest';

describe.each([
    { a: 1, b: 1, expected: 2 },
    { a: 1, b: 2, expected: 3 },
    { a: 2, b: 1, expected: 3 },
  ])('describe object add($a, $b)', ({ a, b, expected }) => {
    test(`returns ${expected}`, () => {
      expect(a + b).toBe(expected)
    })
  
    test(`returned value not be greater than ${expected}`, () => {
      expect(a + b).not.toBeGreaterThan(expected)
    })
  
    test(`returned value not be less than ${expected}`, () => {
      expect(a + b).not.toBeLessThan(expected)
    })
  })