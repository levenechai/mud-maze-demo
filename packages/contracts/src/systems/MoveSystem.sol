// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;
import { System } from "@latticexyz/world/src/System.sol";
import { Position, PositionData, Wall, WallData } from "../codegen/index.sol";

function distance(PositionData memory a, PositionData memory b) pure returns (int32) {
  int32 deltaX = a.x > b.x ? a.x - b.x : b.x - a.x;
  int32 deltaY = a.y > b.y ? a.y - b.y : b.y - a.y;
  int32 deltaZ = a.z > b.z ? a.z - b.z : b.z - a.z;

  return deltaX + deltaY + deltaZ;
}

contract MoveSystem is System {

  function wallExists(int32 x, int32 y, int32 z) internal view returns (bool) {
    bytes32 wallId = bytes32(uint256(uint160((_msgSender()))));
    // Attempt to retrieve the wall from the Wall table
    WallData memory wall = Wall.get(wallId);

    // Check if the wall data exists (non-zero width, height, or depth implies existence)
    return (wall.width > 0 || wall.height > 0 || wall.depth > 0);
  }

  function move(int32 x, int32 y, int32 z) public {
    bytes32 entityId = bytes32(uint256(uint160((_msgSender()))));

    PositionData memory position = Position.get(entityId);
    PositionData memory newPosition = PositionData(x, y, z);

    require(distance(position, newPosition) == 1, "can only move to adjacent spaces");

    // Check for walls at the target position
    require(!wallExists(x, y, z), "Cannot move into a wall");

    // Update player's position
    Position.set(entityId, newPosition);
  }
}
