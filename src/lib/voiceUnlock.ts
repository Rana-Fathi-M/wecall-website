type PlayingFn = (on: boolean) => void;

let node: HTMLAudioElement | null = null;
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

export function requestRosterPlay() {
  if (!node) return;
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
      notifyPlaying(true);
    })
    .catch(() => undefined);
}

export function stopRosterPlay() {
  if (node) {
    node.pause();
    node.currentTime = 0;
  }
  notifyPlaying(false);
}

export function markRosterEnded() {
  notifyPlaying(false);
}
