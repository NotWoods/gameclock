// @ts-check
/** @typedef {ReturnType<typeof initClock>} Clock */

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MIN = 60;
const STARTING_SECONDS = 60;

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
    // Exact time that the clock was paused last, or started.
    lastPaused: -1,
    // Last value (in seconds) that was rendered
    lastDisplayed: STARTING_SECONDS
  };
}

/**
 * Returns time on the clock that has elapsed, in milliseconds
 * @param {Clock} clock Clock with `lastPaused` set.
 * @param {number} now Current time in milliseconds.
 */
function getDuration(clock, now) {
  return (now - clock.lastPaused) + clock.elapsedSoFar;
}

/**
 * Pauses countdown timer for the given clock
 * @param {Clock} clock
 * @param {number} now Current time in milliseconds.
 */
function pauseClock(clock, now) {
  // Remove class from previously active clock
  clock.display.classList.remove('clock--active');

  clock.active = false;
  clock.elapsedSoFar = getDuration(clock, now);
  clock.lastPaused = now;
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
  clock.button.addEventListener('click', () => switchActive(clock))
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
  let seconds;
  if (!clock.active) {
    const duration = clock.elapsedSoFar;
    seconds = Math.max(0, Math.floor(duration / MILLISECONDS_PER_SECOND));
  } else if (clock.lastPaused !== -1) {
    const duration = getDuration(clock, now);
    seconds = Math.max(0, Math.floor(duration / MILLISECONDS_PER_SECOND));
  }

  // Don't re-render if the same second count will be displayed
  if (seconds === clock.lastDisplayed) return;
  const min = String(Math.floor(seconds / SECONDS_PER_MIN));
  const sec = String(seconds % SECONDS_PER_MIN).padStart(2, '0');
  clock.display.textContent = `${min}:${sec}`;
}
requestAnimationFrame(function renderLoop() {
  const now = Date.now();
  clocks.forEach(clock => renderClockNumber(clock, now));
  requestAnimationFrame(renderLoop);
});
