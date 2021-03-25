import { Server as IOServer } from "socket.io";
import { WingsServerConfig } from "./interfaces";
import { WingsPeer } from "./common";
export class WingsServer extends WingsPeer {
  ioserver: IOServer;

  constructor(
    public config: WingsServerConfig = {
      port: 8080,
      dir: "./",
      ioconfig: undefined,
    }
  ) {
    super();
    this.ioserver = new IOServer(this?.config?.ioconfig);
  }

  run() {
    this.ioserver.listen(this.config.port);
  }
}
