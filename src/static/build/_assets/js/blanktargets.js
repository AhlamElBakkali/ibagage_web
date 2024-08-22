// Delegate click on every <a/> tag instead of attaching individual listeners to avoid performance issues:
document.body.addEventListener('click', e => {

  // Support <a/> tags with child elements
  let target = (e.target.tagName === 'A') ? e.target : event.target.closest('a');

  // Make sure we have a valid target, with href attribute.
  if (target && target.hasAttribute('href')) {
    let currentHref = target.getAttribute('href')

    // Detect links to cabify.com or to an absolute path
    let pointsToCabify = (currentHref.indexOf('cabify.com') != -1 || currentHref.startsWith('/'))

    // Detect downloads links hosted at cabify.com or to an absolute path
    let isDownloadsLocationAnyFile = (currentHref.startsWith('/static/downloads/') && currentHref.lastIndexOf(".") )
    let isPDF = (currentHref.lastIndexOf(".pdf") > -1)

    // Check if href starts with #
    let startsWithHash = currentHref.startsWith('#');

    if (isDownloadsLocationAnyFile || isPDF) {
        target.setAttribute('download', '')
    }

    if (!pointsToCabify) {
      target.setAttribute('target', '_blank')
    }

    if (startsWithHash) {
      e.preventDefault(); 
      // Scroll to the target anchor
      let targetElement = document.querySelector(currentHref);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
})
