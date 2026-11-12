export const PROTOCOL_VERSION = 1;

export type PlayerId = string;

export type RoomId = string;

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface PlayerInput {
  sequence: number;

  movement: {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
  };

  rotationY: number;
}

export type ClientMessage =
  | {
      type: "PING";
      timestamp: number;
    }
  | {
      type: "JOIN_ROOM";
      roomId: RoomId;
      playerName: string;
    }
  | {
      type: "PLAYER_INPUT";
      input: PlayerInput;
    }
  | {
      type: "LEAVE_ROOM";
    };

export type ServerMessage =
  | {
      type: "CONNECTION_ESTABLISHED";
      protocolVersion: typeof PROTOCOL_VERSION;
      serverId: string;
    }
  | {
      type: "PONG";
      timestamp: number;
    }
  | {
      type: "ROOM_JOINED";
      roomId: RoomId;
      playerId: PlayerId;
    }
  | {
      type: "ERROR";
      code: string;
      message: string;
    };
