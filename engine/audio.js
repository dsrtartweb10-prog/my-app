// engine/audio.js
export class AudioSystem {
  constructor() {
    this.cache = new Map();
    this.muted = false;
    this.volume = 1.0;
  }

  async load(name, url) {
    if (this.cache.has(name)) return this.cache.get(name);
    const a = new Audio(url);
    a.preload = "auto";
    await new Promise((res) => { a.addEventListener("canplaythrough", res); a.load(); });
    a.volume = this.volume;
    this.cache.set(name, a);
    return a;
  }

  play(name, opts = {}) {
    if (this.muted) return;
    const a = this.cache.get(name);
    if (!a) return;
    const clone = a.cloneNode();
    clone.volume = opts.volume ?? this.volume;
    clone.play().catch(() => {});
  }

  setVolume(v) {
    this.volume = v;
    for (const a of this.cache.values()) a.volume = v;
  }

  toggleMute() {
    this.muted = !this.muted;
  }
}
