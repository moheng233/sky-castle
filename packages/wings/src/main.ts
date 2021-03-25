import { Server as IOServer, ServerOptions as IOServerOptions } from "socket.io";

/**
 * 服务端
 */
export class WingsServer {
    ioserver: IOServer;

    modules: Map<string,typeof WingsModule> = new Map();

    constructor(public config: WingsServerConfig = {
        port: 8080,
        dir: "./",
        ioconfig: undefined
    }){
        this.ioserver = new IOServer(this?.config?.ioconfig);
    }

    run(){
        this.ioserver.listen(this.config.port);
    }

    module(name: string){
        return (target: typeof WingsModule) => {
            if(this.modules.has(name)){
                throw new Error("重复的模块名称");
            };

            this.modules.set(name,target);
        }
    }
}

export interface WingsServerConfig {
    port: number;
    dir: string;

    ioconfig?: IOServerOptions
}

export type WingsModuleRPC = (data: any) => Promise<any>;

/**
 * RPC调用的基本单位
 * 模块类
 */
export class WingsModule {
    functions: Map<string,WingsModuleRPC> = new Map();

    rpc(name?: string){
        return (target: WingsModuleRPC, RPCName: string, descriptor: PropertyDescriptor) => {
            if(this.functions.has(name ?? RPCName)){
                throw new Error("重复的RPC调用名");
            }

            this.functions.set(name ?? RPCName,target);
        }
    }
}