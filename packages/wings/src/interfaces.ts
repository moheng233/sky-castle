import { ServerOptions as IOServerOptions } from "socket.io";

export interface WingsServerConfig {
  port: number;
  dir: string;

  ioconfig?: IOServerOptions;
}

export interface WingsClientConfig {
    ws: string
}

export enum WingsPeerStatus {
    BEFROM,
    INITING,
    INITIALIZED
}

export type WingsModuleRPC = (data: any) => Promise<any>;
