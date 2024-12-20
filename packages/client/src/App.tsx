/* eslint-disable react/no-unknown-property */
// Workaround react-three-fiber types by disabling unknown properties:
// https://github.com/pmndrs/react-three-fiber/discussions/2487

import { Canvas, Color, ThreeElements, useThree } from "@react-three/fiber";
import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { getComponentValueStrict, Has } from "@latticexyz/recs";
import { useMUD } from "./MUDContext";
import { useKeyboardMovement } from "./useKeyboardMovement";
import React from "react";
import * as THREE from "three";

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

  { id: 12, position: [-1, 2, -4], size: [0.5, 4, 7], colour: "#F5F5DC"},    // 4A
  { id: 13, position: [-1, 2, -7.5], size: [6, 4, 0.5], colour: "#F5F5DC"},    // 4B

  { id: 14, position: [-5, 2, -5], size: [4, 4, 0.5], colour: "#F5F5DC"},    // 10A
  { id: 15, position: [-7, 2, -6], size: [0.5, 4, 8], colour: "#F5F5DC"},    // 10B


  { id: 16, position: [-1, 2, 3], size: [0.5, 4, 4], colour: "#F5F5DC"},    // 5A
  { id: 17, position: [-2.5, 2, 5], size: [3.5, 4, 0.5], colour: "#F5F5DC"},    // 5B
  { id: 18, position: [-4, 2, 1.5], size: [0.5, 4, 7.5], colour: "#F5F5DC"},  // 5C

  { id: 19, position: [-7, 2, 2.5], size: [0.5, 4, 5.5], colour: "#F5F5DC"},  // 7A
  { id: 20, position: [-8.5, 2, 5], size: [3, 4, 0.5], colour: "#F5F5DC"},      // 7B

  { id: 21, position: [-4, 2, 8.5], size: [0.5, 4, 3], colour: "#F5F5DC"},    // 8A
  { id: 22, position: [-5.5, 2, 7], size: [3.5, 4, 0.5], colour: "#F5F5DC"},  // 8B
  { id: 23, position: [-7, 2, 8.5], size: [0.5, 4, 3], colour: "#F5F5DC"},    // 8C

  { id: 24, position: [-10, 2, 0], size: [0.5, 8, 20], colour: "#54473F"},    // 9A
  { id: 25, position: [10, 2, 0], size: [0.5, 8, 20], colour: "#54473F"},     // 9B
  { id: 26, position: [0, 2, -10], size: [20, 8, 0.5], colour: "#54473F"},     // 9C
  { id: 27, position: [0, 2, 10], size: [20, 8, 0.5], colour: "#54473F"},     // 9D

];

const collectables = [
  { id: 1, position: [2, 2, 3] },
  { id: 2, position: [4, 2, -3] },
  { id: 3, position: [-2, 2, 4] },
  { id: 4, position: [-6, 2, -4] },
  { id: 5, position: [1, 2, 8] },
  { id: 6, position: [8, 2, 8] },
  { id: 7, position: [9, 2, 9] },
  { id: 8, position: [4, 2, -8] },
  { id: 9, position: [-6, 2, -7] },
  { id: 10, position: [-9, 2, -6] },
];

const goal = [
  { id: 1, position: [9, 2, 0] },
];


const Plane = () => {

  return (
    <>
      {/* Collectables */}
      {collectables.map((item) => (
      <mesh key={item.id} position={item.position}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#C9E9D2" />
      </mesh>
    ))}
      
      {/* Floor */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[20, 0.1, 20]} />
        <meshStandardMaterial color="#B6A28E" />
      </mesh>

      {/* Goal */}
      {goal.map((ball) => (
      <mesh key={ball.id} position={ball.position}>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFFF00" />
      </mesh>
      ))}

      {/* Walls */}
      {walls.map((wall, id) => (
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
        <meshStandardMaterial color={props.color} emissive="#73EC8B"/>
      </mesh>
    </>
  );
};

const Scene = () => {

  const {
    components: { Position , Score},
    network: { playerEntity },
    systemCalls: { collectPoints },
  } = useMUD();


  const playerPosition = useComponentValue(Position, playerEntity);


  React.useEffect(() => {
    console.log("Walls Data:", walls);
    console.log("Player Position:", playerPosition);

    if (!playerPosition) return;
    
     // Check for collisions
    for (let i = collectables.length - 1; i >= 0; i--) {
      const item = collectables[i];
      if (
        playerPosition.x === item.position[0] &&
        playerPosition.z === item.position[2]
      ) {
        console.log(`Collision detected with collectable ${item.id}`);

        // Remove collectable
        collectables.splice(i, 1);

        // Award points
        collectPoints(100);

      }

      if (
        playerPosition.x === 7 &&
        playerPosition.z === 0
      ) {
        console.log(`Collision detected with goal`);
    
        // Award points for reaching the goal
        collectPoints(1000);
        }
    
    }
  }, [playerPosition, collectPoints]);

  const playerScore = useComponentValue(Score, playerEntity);
  console.log(playerScore)

  

  useKeyboardMovement();

  const players = useEntityQuery([Has(Position)]).map((entity) => {
    const position = getComponentValueStrict(Position, entity);
    return {
      entity,
      position,
    };
  });


  
  useThree(({ camera }) => {
    if (playerPosition) {
      // camera.position.set(playerPosition.x - 5, playerPosition.y + 5, playerPosition.z + 5);
      camera.position.set(playerPosition.x - 5, playerPosition.y + 15, playerPosition.z + 5);
    } else {
      camera.position.set(-5, 15, 5);
    }
    camera.rotation.order = "YXZ";
    camera.rotation.y = -Math.PI / 4;
    camera.rotation.x = Math.atan(-1 / Math.sqrt(0.2));
  });

  useThree(({ camera }) => {
    if (playerPosition && playerPosition.x === 9 && playerPosition.z === 0) {
      alert("Congratulations!");
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
      <p> Welcome to the maze! Press <b>W</b>, <b>A</b>, <b>S</b> or <b>D</b> to start moving around. </p>
      <p>Earn points by collecting the balls around you and you'll win by finding the yellow ball! :)</p>
    </>
  );
};

const PlayerInfo = () => {
  const {
    components: { Position , Score },
    network: { playerEntity },
  } = useMUD();

  const playerPosition = useComponentValue(Position, playerEntity);
  const playerScore = useComponentValue(Score, playerEntity)?.points || 0;

  if (!playerPosition) {

    return (

      <div
        style={{
          backgroundColor: "#D8D2C2",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px",
          fontFamily: "'Arial', sans-serif",
          fontSize: "16px",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Score Section */}
        <div style={{ textAlign: "center", fontWeight: "bold", color: "#000" }}>
          <h3 style={{ margin: "0", fontSize: "1.2em" }}>Score</h3>
          <p style={{ fontSize: "1.5em", margin: "5px 0" }}>0</p>
        </div>

        {/* Instructions Section */}
        <div style={{ textAlign: "center" }}>
          <h3 style={{ margin: "0", fontSize: "1.2em" }}>Instructions</h3>
          <p>You've not spawned yet.</p>
          <Directions />
        </div>

        {/* Coordinates Section */}
        <div style={{ textAlign: "right", color: "#333" }}>
          <h3 style={{ margin: "0", fontSize: "1.2em" }}>Coordinates</h3>
          <p style={{ margin: "5px 0" }}>
            <strong>X:</strong> -
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Y:</strong> -
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Z:</strong> -
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#D8D2C2",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px",
        fontFamily: "'Arial', sans-serif",
        fontSize: "16px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Score Section */}
      <div style={{ textAlign: "center", fontWeight: "bold", color: "#000" }}>
        <h3 style={{ margin: "0", fontSize: "1.2em" }}>Score</h3>
        <p style={{ fontSize: "1.5em", margin: "5px 0" }}>{playerScore}</p>
      </div>

      {/* Instructions Section */}
      <div style={{ textAlign: "center" }}>
        <h3 style={{ margin: "0", fontSize: "1.2em" }}>Instructions</h3>
        <Directions />
      </div>

      {/* Coordinates Section */}
      <div style={{ textAlign: "right", color: "#333" }}>
        <h3 style={{ margin: "0", fontSize: "1.2em" }}>Coordinates</h3>
        <p style={{ margin: "5px 0" }}>
          <strong>X:</strong> {playerPosition.x}
        </p>
        <p style={{ margin: "5px 0" }}>
          <strong>Y:</strong> {playerPosition.y}
        </p>
        <p style={{ margin: "5px 0" }}>
          <strong>Z:</strong> {playerPosition.z}
        </p>
      </div>
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
}