// @ts-check
import { init, trackPages } from '../web_modules/insights-js.js';

init('fWF3tu0I8FSImuhJ');
trackPages();

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('sw.js');
}

export { track } from '../web_modules/insights-js.js';
