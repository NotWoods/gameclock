// @ts-check
/** @typedef {ReturnType<typeof initClock>} Clock */

const insightsModule = import('../web_modules/insights-js.js').then(
  insights => {
    insights.init('fWF3tu0I8FSImuhJ');
    insights.trackPages();
    return insights;
  },
);

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js');
}

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MIN = 60;
const STARTING_SECONDS = 60;
const STARTING_MILLISECONDS = STARTING_SECONDS * MILLISECONDS_PER_SECOND;

/** @type {Clock | undefined} */
let active;
const clocks = [initClock('clock--top'), initClock('clock--bottom')];

/** @type {HTMLButtonElement} */
const pause = document.querySelector('.button--pause');
/** @type {HTMLButtonElement} */
const reset = document.querySelector('.button--reset');

function initClock(className) {
  /** @type {HTMLButtonElement} */
  const button = document.querySelector(`.${className}`);
  /** @type {HTMLTimeElement} */
  const display = button.querySelector('.clock');

  return {
    // Reference to button container element
    button,
    // Reference to time element with text inside
    display,
    // If false, then the clock is paused
    active: false,
    // Milliseconds that elapsed before pausing
    elapsedSoFar: 0,
    // Exact time that the clock was paused last, or started. -1 means reset.
    lastPaused: -1,
    // Last value (in seconds) that was rendered
    lastDisplayed: STARTING_SECONDS,
  };
}

/**
 * Returns time on the clock that has elapsed, in milliseconds
 * @param {Clock} clock Clock with `lastPaused` set.
 * @param {number} now Current time in milliseconds.
 */
function getDuration(clock, now) {
  if (!clock.active) {
    return clock.elapsedSoFar;
  } else if (clock.lastPaused !== -1) {
    return now - clock.lastPaused + clock.elapsedSoFar;
  } else {
    return 0;
  }
}

/**
 * Pauses countdown timer for the given clock
 * @param {Clock} clock
 * @param {number} now Current time in milliseconds.
 */
function pauseClock(clock, now) {
  // Remove class from previously active clock
  clock.display.classList.remove('clock--active');

  console.log(clock);
  if (clock.lastPaused !== -1) {
    clock.elapsedSoFar = getDuration(clock, now);
  }
  clock.active = false;
  clock.lastPaused = now;
  console.log(clock);
}
function pauseAll(now = Date.now()) {
  active = undefined;
  pause.hidden = true;
  clocks.forEach(clock => pauseClock(clock, now));
}

/**
 * Bound click event listener for clock buttons.
 * Changes the currently active timer.
 * @param {Clock} clock
 */
function switchActive(clock, now = Date.now()) {
  /** @type {Clock} */
  let newActive;
  if (!active) {
    newActive = clock;
    pause.hidden = false;
    if (clock.lastPaused === -1) {
      // Track when a timer is started after reset (or first time)
      insightsModule.then(({ track }) => track({ id: 'start-timer' }));
    }
  } else {
    for (const clock of clocks) {
      if (active !== clock) {
        newActive = clock;
        break;
      }
    }

    // Pause the timer
    pauseClock(active, now);
  }

  newActive.display.classList.add('clock--active');
  active = newActive;

  // Start the timer
  newActive.active = true;
  newActive.lastPaused = now;
}
clocks.forEach(clock =>
  clock.button.addEventListener('click', () => switchActive(clock)),
);

pause.addEventListener('click', () => pauseAll());
reset.addEventListener('click', () => {
  pauseAll();
  clocks.forEach(clock => {
    clock.elapsedSoFar = 0;
    clock.lastPaused = -1;
  });
});

/**
 * Renders the current time on the clock
 * @param {Clock} clock
 */
function renderClockNumber(clock, now = Date.now()) {
  const duration = STARTING_MILLISECONDS - getDuration(clock, now);
  const seconds = Math.max(0, Math.floor(duration / MILLISECONDS_PER_SECOND));

  // Don't re-render if the same second count will be displayed
  if (seconds === clock.lastDisplayed) return;
  const min = String(Math.floor(seconds / SECONDS_PER_MIN));
  const sec = String(seconds % SECONDS_PER_MIN);
  clock.display.textContent = `${min}:${sec.padStart(2, '0')}`;
  clock.display.dateTime = `PT${min}M${sec}S`;
  clock.lastDisplayed = seconds;
}
requestAnimationFrame(function renderLoop() {
  const now = Date.now();
  clocks.forEach(clock => renderClockNumber(clock, now));
  requestAnimationFrame(renderLoop);
});
