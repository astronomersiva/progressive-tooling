import * as emotion from 'emotion';

// the same as import createExtractCritical from 'create-emotion-server/src/extract-critical';
// but without flow
const createExtractCritical = (emotion) => (html) => {
  // parse out ids from html
  // reconstruct css/rules/cache to pass
  let RGX = new RegExp(`${emotion.caches.key}-([a-zA-Z0-9-]+)`, 'gm');

  let o = { html, ids: [], css: '' };
  let match;
  let ids = {};
  while ((match = RGX.exec(html)) !== null) {
    // $FlowFixMe
    if (ids[match[1]] === undefined) {
      // $FlowFixMe
      ids[match[1]] = true;
    }
  }

  o.ids = Object.keys(emotion.caches.inserted).filter(id => {
    if (
      (ids[id] === true ||
        emotion.caches.registered[`${emotion.caches.key}-${id}`] ===
        undefined) &&
      emotion.caches.inserted[id] !== true
    ) {
      o.css += emotion.caches.inserted[id];
      return true;
    }
  });

  return o;
};

export const extractCritical = createExtractCritical(emotion);
