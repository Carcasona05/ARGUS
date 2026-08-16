import { triggerRefresh } from "./refreshBus";

const scrollToTopListeners = new Set();

export const subscribeScrollToTop = (callback) => {
  scrollToTopListeners.add(callback);
  return () => scrollToTopListeners.delete(callback);
};

export const scrollToTop = () => {
  scrollToTopListeners.forEach((callback) => {
    try {
      callback();
    } catch {
      // ignore individual listener errors
    }
  });
  triggerRefresh();
};
