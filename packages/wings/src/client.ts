import { io as IOClient, Socket as IOClientSocket } from "socket.io-client";
import { WingsPeer } from "./main";

export class WingsClient extends WingsPeer {
    ioclient: IOClientSocket;

    constructor(ws: string){
        super();
        this.ioclient = IOClient(ws);
    }
}