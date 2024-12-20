import { useEffect } from "react";
import { useMUD } from "./MUDContext";

export const useKeyboardMovement = () => {
  const {
    systemCalls: { moveBy , wallExists},
  } = useMUD();

  // const walls = [
  //   { position: [9, 2, 1.5], size: [4.5, 4, 0.5] },     // 1A
  //   { position: [7, 2, 5], size: [0.5, 4, 7]},         // 1B
  //   { position: [5.5, 2, 8.5], size: [3.5, 4, 0.5]},   // 1C

  //   { position: [7.5, 2, -1], size: [5, 4, 0.5] },       // 2A
  //   { position: [5, 2, -5.5], size: [0.5, 4, 9.5] },     // 2B
  //   { position: [3.5, 2, 1.5], size: [3.5, 4, 0.5] },   // 2C
  //   { position: [5, 2, 4], size: [0.5, 4, 5] },         // 2D
  //   { position: [2, 2, -1.5], size: [0.5, 4, 6] },        // 2E
  //   { position: [3.5, 2, -4.5], size: [3.5, 4, 0.5] }, // 2F

  //   { position: [2.5, 2, 7], size: [0.5, 4, 6] },       // 3A
  //   { position: [0, 2, 7], size: [5, 4, 0.5] },         // 3B

  //   { position: [-0.5, 2, -4], size: [0.5, 4, 7] },    // 4A
  //   { position: [-1, 2, -7.5], size: [6, 4, 0.5] },    // 4A

  //   { position: [-5, 2, -5], size: [4, 4, 0.5] },    // 4A
  //   { position: [-7, 2, -6], size: [0.5, 4, 8] },    // 4A


  //   { position: [-0.5, 2, 3], size: [0.5, 4, 4] },    // 5A
  //   { position: [-2, 2, 5], size: [3.5, 4, 0.5] },    // 5B
  //   { position: [-4, 2, 1.5], size: [0.5, 4, 7.5] },  // 5C

  //   { position: [-7, 2, 2.5], size: [0.5, 4, 5.5] },  // 7A
  //   { position: [-8.5, 2, 5], size: [3, 4, 0.5] },      // 7B

  //   { position: [-4, 2, 8.5], size: [0.5, 4, 3] },    // 8A
  //   { position: [-5.5, 2, 7], size: [3.5, 4, 0.5] },  // 8B
  //   { position: [-7, 2, 8.5], size: [0.5, 4, 3] },    // 8C

  //   { position: [-10, 2, 0], size: [0.5, 8, 20] },    // 9A
  //   { position: [10, 2, 0], size: [0.5, 8, 20] },     // 9B
  //   { position: [0, 2, -10], size: [20, 8, 0.5] },     // 9C
  //   { position: [0, 2, 10], size: [20, 8, 0.5] },     // 9D

  // ];

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "w") {
        moveBy(1, 0, 0);
      }
      if (e.key === "s") {
        moveBy(-1, 0, 0);
      }
      if (e.key === "a") {
        moveBy(0, 0, -1);
      }
      if (e.key === "d") {
        moveBy(0, 0, 1);
      }
      if (e.key === "t") {
        moveBy(0, 1, 0);
      }
      if (e.key === "g") {
        moveBy(0, -1, 0);
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [moveBy]);
};