import { useState } from "react";

function useHover() {
  const [showHover, setShowHover] = useState(false);

  function mouseOver() {
    setShowHover(true);
  }

  function mouseOut() {
    setShowHover(false);
  }

  const attrs = {
    onMouseOver: mouseOver,
    onMouseOut: mouseOut,
  };

  return { showHover, attrs };
}

export default useHover;
