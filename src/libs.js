// @ts-check
import {
  init,
  trackPages,
  track,
} from 'insights-js';

init('fWF3tu0I8FSImuhJ');
trackPages();

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('sw.js');
}

export { track };
