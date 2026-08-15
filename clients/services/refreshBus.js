const listeners = new Set();

export const subscribeRefresh = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

export const triggerRefresh = () => {
  listeners.forEach((callback) => {
    try {
      callback();
    } catch {
      // ignore individual listener errors
    }
  });
};
