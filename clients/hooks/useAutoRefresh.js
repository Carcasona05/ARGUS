import { useCallback, useRef } from "react";
import { useFocusEffect } from "expo-router";

export const useAutoRefresh = (loader, interval = 30000) => {
  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  useFocusEffect(
    useCallback(() => {
      loaderRef.current();
      const id = setInterval(() => loaderRef.current(), interval);
      return () => clearInterval(id);
    }, [interval])
  );
};

export default useAutoRefresh;
