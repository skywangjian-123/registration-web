import React from 'react';
import { getCountryByCode, getGenderByCode} from './utils';

test('getCountryByCode', () => {
  let result = getCountryByCode('ch');
  expect(result).toBe('China');
  result = getCountryByCode('il');
  expect(result).toBe(undefined);
});


test('getGenderByCode', () => {
  let result = getGenderByCode('F');
  expect(result).toBe('Female');
  result = getGenderByCode('t');
  expect(result).toBe(undefined);
});
