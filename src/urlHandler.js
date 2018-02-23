/**
 * Test if the url is from vimeo
 * @param {string} url
 * @return {boolean}
 */
export function isVimeo(url) {
return url.match(/^https?:\/\/([a-zA-Z\d-]+\.){0,}vimeo\.com.*/) !== null
}

/**
 * Test if the url is from flickr
 * @param {string} url
 * @return {boolean}
 */
export function isFlickr(url) {
  return url.match(/^https?:\/\/([a-zA-Z\d-]+\.){0,}flickr\.com.*/) !== null
}
