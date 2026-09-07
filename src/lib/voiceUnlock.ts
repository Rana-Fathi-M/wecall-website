type PlayingFn = (on: boolean) => void;

let node: HTMLAudioElement | null = null;
let want = false;
let started = false;
let userStopped = false;
let armed = false;
const playingFns = new Set<PlayingFn>();

function notifyPlaying(on: boolean) {
  playingFns.forEach((fn) => fn(on));
}

export function registerRosterAudio(el: HTMLAudioElement | null) {
  node = el;
}

export function onRosterPlaying(fn: PlayingFn) {
  playingFns.add(fn);
  return () => {
    playingFns.delete(fn);
  };
}

function kick() {
  if (!want || started || userStopped || !node) return;
  node.loop = false;
  node.muted = false;
  node.volume = 1;
  try {
    if (node.currentTime > 0.05 || node.ended) node.currentTime = 0;
  } catch {
    /* ignore seek errors */
  }
  void node
    .play()
    .then(() => {
      started = true;
      notifyPlaying(true);
    })
    .catch(() => undefined);
}

export function armSectionPlay() {
  if (userStopped || started) return;
  want = true;
  kick();
}

export function requestRosterPlay() {
  userStopped = false;
  started = false;
  want = true;
  kick();
}

export function stopRosterPlay() {
  userStopped = true;
  want = false;
  started = false;
  if (node) {
    node.pause();
    node.currentTime = 0;
  }
  notifyPlaying(false);
}

export function markRosterEnded() {
  started = true;
  want = false;
  notifyPlaying(false);
}

export function armVoiceUnlock() {
  if (armed) return;
  armed = true;

  const onGesture = (e: Event) => {
    const t = e.target;
    if (t instanceof Element && t.closest(".ap-toggle")) return;
    kick();
  };

  for (const ev of ["touchstart", "touchmove", "touchend", "pointerdown", "mousedown", "keydown", "click"] as const) {
    window.addEventListener(ev, onGesture, { capture: true, passive: true });
  }
}
