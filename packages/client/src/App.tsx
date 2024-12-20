/* eslint-disable react/no-unknown-property */
// Workaround react-three-fiber types by disabling unknown properties:
// https://github.com/pmndrs/react-three-fiber/discussions/2487

import { Canvas, Color, ThreeElements, useThree } from "@react-three/fiber";
import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { getComponentValueStrict, Has } from "@latticexyz/recs";
import { useMUD } from "./MUDContext";
import { useKeyboardMovement } from "./useKeyboardMovement";
import React from "react";

const headerStyle = { backgroundColor: "black", color: "white" };
const cellStyle = { padding: 20 };


const walls = [
  { id: 1, position: [9, 2, 1.5], size: [4.5, 4, 0.5], colour: "#F5F5DC" },     // 1A
  { id: 2, position: [7, 2, 5], size: [0.5, 4, 7], colour: "#F5F5DC" },         // 1B
  { id: 3, position: [5.5, 2, 8.5], size: [3.5, 4, 0.5], colour: "#F5F5DC" },   // 1C

  { id: 4, position: [7.5, 2, -1], size: [5, 4, 0.5], colour: "#F5F5DC"},       // 2A
  { id: 5, position: [5, 2, -5.5], size: [0.5, 4, 9.5], colour: "#F5F5DC"},     // 2B
  { id: 7, position: [3.5, 2, 1.5], size: [3.5, 4, 0.5], colour: "#F5F5DC" },   // 2C
  { id: 8, position: [5, 2, 4], size: [0.5, 4, 5], colour: "#F5F5DC" },         // 2D
  { id: 6, position: [2, 2, -1.5], size: [0.5, 4, 6], colour: "#F5F5DC" },        // 2E
  { id: 9, position: [3.5, 2, -4.5], size: [3.5, 4, 0.5], colour: "#F5F5DC" }, // 2F

  { id: 10, position: [2.5, 2, 7], size: [0.5, 4, 6], colour: "#F5F5DC" },       // 3A
  { id: 11, position: [0, 2, 7], size: [5, 4, 0.5], colour: "#F5F5DC"},         // 3B

  { id: 12, position: [-0.5, 2, -4], size: [0.5, 4, 7], colour: "#F5F5DC"},    // 4A
  { id: 13, position: [-1, 2, -7.5], size: [6, 4, 0.5], colour: "#F5F5DC"},    // 4A

  { id: 14, position: [-5, 2, -5], size: [4, 4, 0.5], colour: "#F5F5DC"},    // 4A
  { id: 15, position: [-7, 2, -6], size: [0.5, 4, 8], colour: "#F5F5DC"},    // 4A


  { id: 16, position: [-0.5, 2, 3], size: [0.5, 4, 4], colour: "#F5F5DC"},    // 5A
  { id: 17, position: [-2, 2, 5], size: [3.5, 4, 0.5], colour: "#F5F5DC"},    // 5B
  { id: 18, position: [-4, 2, 1.5], size: [0.5, 4, 7.5], colour: "#F5F5DC"},  // 5C

  { id: 19, position: [-7, 2, 2.5], size: [0.5, 4, 5.5], colour: "#F5F5DC"},  // 7A
  { id: 20, position: [-8.5, 2, 5], size: [3, 4, 0.5], colour: "#F5F5DC"},      // 7B

  { id: 21, position: [-4, 2, 8.5], size: [0.5, 4, 3], colour: "#F5F5DC"},    // 8A
  { id: 22, position: [-5.5, 2, 7], size: [3.5, 4, 0.5], colour: "#F5F5DC"},  // 8B
  { id: 23, position: [-7, 2, 8.5], size: [0.5, 4, 3], colour: "#F5F5DC"},    // 8C

  { id: 24, position: [-10, 2, 0], size: [0.5, 8, 20], colour: "#E07B39"},    // 9A
  { id: 24, position: [10, 2, 0], size: [0.5, 8, 20], colour: "#E07B39"},     // 9B
  { id: 24, position: [0, 2, -10], size: [20, 8, 0.5], colour: "#E07B39"},     // 9C
  { id: 24, position: [0, 2, 10], size: [20, 8, 0.5], colour: "#E07B39"},     // 9D

];

const Plane = () => {
  
  const collectables = [
    { id: 1, position: [2, 1.5, 2] },
    { id: 2, position: [4, 1.5, -3] },
    { id: 3, position: [-1, 1.5, 4] },
    { id: 4, position: [-6, 1.5, -4] },
    { id: 4, position: [1, 1.5, 8] },
    { id: 4, position: [8, 1.5, 8] },
  ];


  return (
    <>
      {/* Collectables */}
      {collectables.map((item) => (
      <mesh key={item.id} position={item.position}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="gold" />
      </mesh>
    ))}
      
      {/* Floor */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[20, 0.1, 20]} />
        <meshStandardMaterial color="#B6A28E" />
      </mesh>

      {/* Goal */}
      <mesh position={[9, 2, 0]}>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFFF00" />
      </mesh>

      {/* Walls */}
      {walls.map((wall, index) => (
        <mesh key={wall.id} position={wall.position}>
        <boxGeometry args={wall.size} />
        <meshStandardMaterial color={wall.colour} />
      </mesh>
      ))}
    </>
  );
};

const Player = (props: ThreeElements["mesh"] & { color: Color }) => {
  return (
    <>
      <mesh {...props}>
        <boxGeometry args={[0.5, 6, 0.5]} />
        <meshStandardMaterial color={props.color} />
      </mesh>
    </>
  );
};

const Scene = ({ points, setPoints, collectables, setCollectables }) => {

  const {
    components: { Position },
    network: { playerEntity },
  } = useMUD();



  const playerPosition = useComponentValue(Position, playerEntity);
  const players = useEntityQuery([Has(Position)]).map((entity) => {
    const position = getComponentValueStrict(Position, entity);
    return {
      entity,
      position,
    };
  });
  
  useKeyboardMovement(playerPosition, collectables, setCollectables);

  
  useThree(({ camera }) => {
    if (playerPosition) {
      // camera.position.set(playerPosition.x - 5, playerPosition.y + 5, playerPosition.z + 5);
      camera.position.set(playerPosition.x - 5, playerPosition.y + 15, playerPosition.z + 5);
    } else {
      camera.position.set(-5, 5, 5);
    }
    camera.rotation.order = "YXZ";
    camera.rotation.y = -Math.PI / 4;
    camera.rotation.x = Math.atan(-1 / Math.sqrt(0.2));
  });

  useThree(({ camera }) => {
    if (playerPosition && playerPosition.x === 10 && playerPosition.z === 0) {
      alert("You Win!");
    }
  });

  return (
    <group>
      <ambientLight />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <pointLight position={[10, 10, 10]} />
      <Plane />
      {players.map((p, i) => (
        <Player
          key={i}
          color={Math.floor(parseInt(p.entity) * 123456) % 16777215}
          position={[p.position.x, p.position.y, p.position.z]}
        />
      ))}
    </group>
  );
};

const styles = { height: "100vh" };

const Directions = () => {
  return (
    <>
      <p>
        You are a purple block moving around the maze! To move, use <b>W</b>, <b>A</b>, <b>S</b>, and <b>D</b>.
      </p>
    </>
  );
};

const PlayerInfo = () => {
  const {
    components: { Position },
    network: { playerEntity },
  } = useMUD();

  const playerPosition = useComponentValue(Position, playerEntity);

  if (!playerPosition) {
    return (
      <div style={headerStyle}>
        <table>
          <tbody>
            <tr>
              <td>
                <h2>Reading player position</h2>
              </td>
              <td>
                <Directions />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div style={headerStyle}>
      <table>
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <th>Coordinate</th>
                    <th>Value</th>
                  </tr>
                  <tr>
                    <th>x</th>
                    <td align="right">{playerPosition.x}</td>
                  </tr>
                  <tr>
                    <th>y</th>
                    <td align="right">{playerPosition.y}</td>
                  </tr>
                  <tr>
                    <th>z</th>
                    <td align="right">{playerPosition.z}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td style={cellStyle}>
              <Directions />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const App = () => {
  return (
    <>
      <PlayerInfo />
      <Canvas style={styles}>
        <Scene />
      </Canvas>
    </>
  );
};