import TestUtility from '../../utils/TestUtility';
import MultipleKeyboardsDestroyDemo from '../MultipleKeyboardsDestroyDemo';

jest.useFakeTimers();

let testUtil = new TestUtility();

it('Demo will load', () => {
  testUtil.setDOM();

  let demo = new MultipleKeyboardsDestroyDemo();
});

it('Demo onDOMLoaded will work', () => {
  testUtil.setDOM();

  let demo = new MultipleKeyboardsDestroyDemo();

  expect(demo.keyboard).toBeTruthy();
});

it('Demo onChange will work', () => {
  testUtil.setDOM();

  let demo = new MultipleKeyboardsDestroyDemo();

  demo.onChange("test");
  demo.keyboard2.getButtonElement("q").click();
  
  expect(document.body.querySelector('.input').value).toBe("test");
  expect(document.body.querySelector('.input2').value).toBe("q");
});

it('Demo onChange will work', () => {
  testUtil.setDOM();

  let demo = new MultipleKeyboardsDestroyDemo();

  demo.keyboard.getButtonElement("q").onclick();
  
  expect(document.body.querySelector('.input').value).toBe("q");
});

it('Demo input change will work', () => {
  testUtil.setDOM();

  let demo = new MultipleKeyboardsDestroyDemo();

  document.body.querySelector('.input').value = "test";
  document.body.querySelector('.input').dispatchEvent(new Event('input'));

  document.body.querySelector('.input2').value = "test2";
  document.body.querySelector('.input2').dispatchEvent(new Event('input'));
  
  expect(demo.keyboard.getInput()).toBe("test");
  expect(demo.keyboard2.getInput()).toBe("test2");
});

it('Demo handleShiftButton will work', () => {
  testUtil.setDOM();

  let demo = new MultipleKeyboardsDestroyDemo();

  demo.keyboard.getButtonElement("{shift}")[0].onclick();
  expect(demo.keyboard.options.layoutName).toBe("shift");

  demo.keyboard.getButtonElement("{shift}")[0].onclick();
  expect(demo.keyboard.options.layoutName).toBe("default");
});

it('MultipleKeyboardsDestroyDemo will run all timers', () => {
  testUtil.setDOM();

  let demo = new MultipleKeyboardsDestroyDemo();
  jest.runAllTimers();

  expect(demo.keyboard.options.theme).toBe("hg-theme-default myTheme");

  demo.keyboard.getButtonElement("{shift}")[0].onclick();
  expect(demo.keyboard.options.layoutName).toBe("shift");

  demo.keyboard.getButtonElement("A").onclick();
  expect(demo.keyboard.input.default).toBe("A");
});