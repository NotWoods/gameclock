// @ts-check
import { init, trackPages, track } from 'https://cdn.skypack.dev/insights-js@v1.2.10';

init('fWF3tu0I8FSImuhJ');
trackPages();

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('sw.js');
}

export { track };
