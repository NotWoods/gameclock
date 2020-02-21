// @ts-check
import { init, trackPages, track as _track } from 'https://cdn.pika.dev/insights-js@^1.2.9';

init('fWF3tu0I8FSImuhJ');
trackPages();

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('sw.js');
}

export const track = /** @type {import('insights-js').track} */ (_track);
