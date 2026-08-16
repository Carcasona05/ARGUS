import { useEffect, useRef } from "react";
import { subscribeScrollToTop } from "../services/scrollToTopBus";

export const useScrollToTop = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const unsubscribe = subscribeScrollToTop(() => {
      scrollRef.current?.scrollTo?.({ y: 0, animated: true });
    });
    return unsubscribe;
  }, []);

  return scrollRef;
};

export default useScrollToTop;
