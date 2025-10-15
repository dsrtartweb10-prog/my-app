// engine/storage.js
export const Storage = {
  saveLocal(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn("Storage.saveLocal failed", e);
      return false;
    }
  },

  loadLocal(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.warn("Storage.loadLocal failed", e);
      return fallback;
    }
  },

  async saveRemote(url, payload) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (e) {
      console.warn("Storage.saveRemote failed", e);
      return null;
    }
  },

  async loadRemote(url) {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (e) {
      console.warn("Storage.loadRemote failed", e);
      return null;
    }
  }
};
