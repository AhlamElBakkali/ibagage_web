/*

  Script to propagate all query params in the current url to any link clicked on the page.
  This help us minimise duplicated pages on Google Search and allow us to have complete tracing of campaign visitors that browse our site.
  More info: https://developers.google.com/search/blog/2007/09/google-duplicate-content-caused-by-url

*/
let queryParams = new URLSearchParams(window.location.search)

function appendQueryParams(url) {
  if (!queryParams.toString()) return url;

  let concatChar = (url.indexOf('?') != -1) ? '&' : '?';
  let filteredParams = new URLSearchParams();
  for (let [key, value] of queryParams.entries()) {
    if (key !== 'message') {
      filteredParams.append(key, value);
    }
  }
  let encodedParams = decodeURIComponent(filteredParams.toString());
  let processedParams = encodedParams.replace(/\?/g, '&');
  return `${url}${concatChar}${processedParams}`;
}


// Delegate click on every <a/> tag instead of attaching individual listeners to avoid performance issues:
document.body.addEventListener('click', e => {

  // Support <a/> tags with child elements
  let target = (e.target.tagName === 'A') ? e.target : event.target.closest('a');

  /*
    Make sure we have a valid target, with href attribute.
    Make sure we have query params to append.
  */
  if (target && target.hasAttribute('href') && queryParams.toString() !== '') {
    let currentHref = target.getAttribute('href')

    // Make sure links to cabify.com or to an absolute path
    let pointsToCabify = (currentHref.indexOf('cabify.com') != -1 || currentHref.startsWith('/'))

    if (pointsToCabify) {
      // Check if current href already has query params.
      target.setAttribute('href', appendQueryParams(currentHref))
    }
  }

})

// Propagate query params to heroiframe component
// Make sure we have query params and a heroiframe component on the page
let iframe = document.querySelector('[data-select=heroiframe]')
if (queryParams.toString() !== '' && iframe) {
  iframe.setAttribute('src', appendQueryParams(iframe.src))
}
