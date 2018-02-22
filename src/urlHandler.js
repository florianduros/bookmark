function getVimeoID(url) {
  const m = url.match(/^.+vimeo.com\/(.*\/)?([^#?]*)/)
  return m ? m[2] || m[1] : null
}

export function isVimeo(url) {
  return getVimeoID(url) !== null
}

export function isFlickr(url) {
  return url.match(/^https?:\/\/([a-zA-Z\d-]+\.){0,}flickr\.com.*/) !== null
}
