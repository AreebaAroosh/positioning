import {expect} from 'chai';
import {Positioning} from '../src/positioning';

const positioning = new Positioning();
const documentMargin = document.documentElement.style.margin;
const bodyMargin = document.body.style.margin;
const bodyHeight = document.body.style.height;
const bodyWidth = document.body.style.width;

function createElement(height: number, width: number, marginTop: number, marginLeft: number): HTMLElement {
  let el = document.createElement('div');
  el.style.display = 'inline-block';
  el.style.height = height + 'px';
  el.style.width = width + 'px';
  el.style.marginTop = marginTop + 'px';
  el.style.marginLeft = marginLeft + 'px';

  return el;
}

let element = createElement(200, 300, 100, 150);
document.body.appendChild(element);
let targetElement = createElement(50, 100, 10, 20);
document.body.appendChild(targetElement);

document.documentElement.style.margin = '0';
document.body.style.margin = '0';
document.body.style.height = '2000px';
document.body.style.width = '2000px';

it('should calculate the element offset', () => {
  let position = positioning.offset(element);

  expect(position.height).to.equal(200);
  expect(position.width).to.equal(300);
  expect(position.top).to.equal(100);
  expect(position.bottom).to.equal(300);
  expect(position.left).to.equal(150);
  expect(position.right).to.equal(450);
});

it('should calculate the element offset when scrolled', () => {
  document.documentElement.scrollTop = 1000;
  document.documentElement.scrollLeft = 1000;

  let position = positioning.offset(element);

  expect(position.top).to.equal(100);
  expect(position.bottom).to.equal(300);
  expect(position.left).to.equal(150);
  expect(position.right).to.equal(450);

  document.documentElement.scrollTop = 0;
  document.documentElement.scrollLeft = 0;
});

it('should calculate the element position', () => {
  let position = positioning.position(element);

  expect(position.height).to.equal(200);
  expect(position.width).to.equal(300);
  expect(position.top).to.equal(100);
  expect(position.bottom).to.equal(300);
  expect(position.left).to.equal(150);
  expect(position.right).to.equal(450);
});

it('should calculate the element position when scrolled', () => {
  document.documentElement.scrollTop = 1000;
  document.documentElement.scrollLeft = 1000;

  let position = positioning.position(element);

  expect(position.top).to.equal(100);
  expect(position.bottom).to.equal(300);
  expect(position.left).to.equal(150);
  expect(position.right).to.equal(450);

  document.documentElement.scrollTop = 0;
  document.documentElement.scrollLeft = 0;
});

it('should calculate the element position on positioned ancestor', () => {
  let childElement = createElement(100, 150, 50, 75);

  element.style.position = 'relative';
  element.appendChild(childElement);

  let position = positioning.position(childElement);

  expect(position.top).to.equal(50);
  expect(position.bottom).to.equal(150);
  expect(position.left).to.equal(75);
  expect(position.right).to.equal(225);

  element.style.position = '';
  element.removeChild(childElement);
});

it('should position the element top-left', () => {
  let position = positioning.positionElements(element, targetElement, 'top-left');

  expect(position.top).to.equal(50);
  expect(position.left).to.equal(150);
});

it('should position the element top-center', () => {
  let position = positioning.positionElements(element, targetElement, 'top');

  expect(position.top).to.equal(50);
  expect(position.left).to.equal(250);
});

it('should position the element top-right', () => {
  let position = positioning.positionElements(element, targetElement, 'top-right');

  expect(position.top).to.equal(50);
  expect(position.left).to.equal(350);
});

it('should position the element bottom-left', () => {
  let position = positioning.positionElements(element, targetElement, 'bottom-left');

  expect(position.top).to.equal(300);
  expect(position.left).to.equal(150);
});

it('should position the element bottom-center', () => {
  let position = positioning.positionElements(element, targetElement, 'bottom');

  expect(position.top).to.equal(300);
  expect(position.left).to.equal(250);
});

it('should position the element bottom-right', () => {
  let position = positioning.positionElements(element, targetElement, 'bottom-right');

  expect(position.top).to.equal(300);
  expect(position.left).to.equal(350);
});

it('should position the element left-top', () => {
  let position = positioning.positionElements(element, targetElement, 'left-top');

  expect(position.top).to.equal(100);
  expect(position.left).to.equal(50);
});

it('should position the element left-center', () => {
  let position = positioning.positionElements(element, targetElement, 'left');

  expect(position.top).to.equal(175);
  expect(position.left).to.equal(50);
});

it('should position the element left-bottom', () => {
  let position = positioning.positionElements(element, targetElement, 'left-bottom');

  expect(position.top).to.equal(250);
  expect(position.left).to.equal(50);
});

it('should position the element right-top', () => {
  let position = positioning.positionElements(element, targetElement, 'right-top');

  expect(position.top).to.equal(100);
  expect(position.left).to.equal(450);
});

it('should position the element right-center', () => {
  let position = positioning.positionElements(element, targetElement, 'right');

  expect(position.top).to.equal(175);
  expect(position.left).to.equal(450);
});

it('should position the element right-bottom', () => {
  let position = positioning.positionElements(element, targetElement, 'right-bottom');

  expect(position.top).to.equal(250);
  expect(position.left).to.equal(450);
});

it('cleanUp', () => {
  document.body.removeChild(element);
  document.body.removeChild(targetElement);
  document.documentElement.style.margin = documentMargin;
  document.body.style.margin = bodyMargin;
  document.body.style.height = bodyHeight;
  document.body.style.width = bodyWidth;
});
