/**
 * @jest-environment jsdom
 */

import { Game } from '../src/modules/Game';
import { TestsUnits } from './TestsUnits';

const testUnitManager = new TestsUnits(Game.getGame());

test('Test 1', () => {
  const isTrue = testUnitManager.testUnit1()
  expect(isTrue).toBe(true);
});
test('Test 2', () => {
  const isTrue = testUnitManager.testUnit2()
  expect(isTrue).toBe(true);
});
test('Test 3', () => {
  const isTrue = testUnitManager.testUnit3()
  expect(isTrue).toBe(true);
});
test('Test 4', () => {
  const isTrue = testUnitManager.testUnit4()
  expect(isTrue).toBe(true);
});
test('Test 5', () => {
  const isTrue = testUnitManager.testUnit5()
  expect(isTrue).toBe(true);
});
test('Test 6', () => {
  const isTrue = testUnitManager.testUnit6()
  expect(isTrue).toBe(true);
});
test('Test 7', () => {
  const isTrue = testUnitManager.testUnit7()
  expect(isTrue).toBe(true);
});
test('Test 8', () => {
  const isTrue = testUnitManager.testUnit8()
  expect(isTrue).toBe(true);
});
test('Test 9', () => {
  const isTrue = testUnitManager.testUnit9()
  expect(isTrue).toBe(true);
});
test('Test 10', () => {
  const isTrue = testUnitManager.testUnit10()
  expect(isTrue).toBe(true);
});
test('Test 11', () => {
  const isTrue = testUnitManager.testUnit11()
  expect(isTrue).toBe(true);
});
test('Test 12', () => {
  const isTrue = testUnitManager.testUnit12()
  expect(isTrue).toBe(true);
});