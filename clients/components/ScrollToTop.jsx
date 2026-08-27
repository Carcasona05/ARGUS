import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButton) return null;

  return (
    <Fab
      onClick={scrollToTop}
      aria-label="scroll to top"
      sx={{
        position: "fixed",
        bottom: 25,
        right: 25,
        zIndex: 9999,
        width: 50,
        height: 50,
        backgroundColor: "#422800",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#5a3800",
        },
      }}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
};

export default ScrollToTop;