import { defineWorld } from "@latticexyz/world";

export default defineWorld({
  namespace: "app",
  tables: {
    Position: {
      schema: {
        id: "bytes32",
        x: "int32",
        y: "int32",
        z: "int32",
      },
      key: ["id"],
    },
    Wall: {
      schema: {
        id: "bytes32",
        x: "int32",
        y: "int32",
        z: "int32",
        width: "uint32",
        height: "uint32",
        depth: "uint32",
      },
      key: ["id"],
    },
  },
});
