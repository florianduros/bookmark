import { isVimeo, isFlickr } from '../urlHandler'

it('isVimeo', () => {
  expect(isVimeo('')).toBeFalsy()
  expect(isVimeo('http://flickr')).toBeFalsy()
  expect(isVimeo('http://flickrd.co/fffklfjklj')).toBeFalsy()
  expect(isVimeo('https://vimeo.com/250953833')).toBeTruthy()
  expect(isVimeo('http://vimeo.com/250953833')).toBeTruthy()
  expect(isVimeo('http://vimeo.com/groups/250953833')).toBeTruthy()
});

it('isFlickr', () => {
  expect(isFlickr('')).toBeFalsy()
  expect(isFlickr('https://vimeo.com/250953833')).toBeFalsy()
  expect(isFlickr('http://flickr')).toBeFalsy()
  expect(isFlickr('http://flickr.com/flksfjlk')).toBeTruthy()
  expect(isFlickr('https://flickr.com/fffklfjklj')).toBeTruthy()
});
