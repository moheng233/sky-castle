import { WingsModuleRPC, WingsPeerStatus } from "./interfaces";

/**
 * 对等体
 */
export abstract class WingsPeer {
  modules: Map<string, WingsModule> = new Map();

  status: WingsPeerStatus = WingsPeerStatus.BEFROM;

  /**
   * 执行本地的RPC调用
   * @param moduleName
   * @param RPCName
   * @param data
   * @returns
   */
  local_exec(moduleName: string, RPCName: string, data: any) {
    let module = this.modules.get(moduleName);
    if (module == undefined) {
      throw new Error("不存在的模块");
    }

    return module.exec(RPCName, data);
  }

  module(name: string) {
    return (target: typeof WingsModule) => {
      if (this.modules.has(name)) {
        throw new Error("重复的模块名称");
      }

      this.modules.set(name, target.OBJECT);
    };
  }
}

/**
 * RPC调用的基本单位
 * 模块类
 */
export class WingsModule {
  static OBJECT = new WingsModule();

  functions: Map<string, WingsModuleRPC> = new Map();

  exec(RPCName: string, data: any) {
    let rpc = this.functions.get(RPCName);

    if (rpc == undefined) {
      throw new Error("不存在的调用");
      return;
    }

    return rpc(data);
  }

  rpc(name?: string) {
    return (
      target: WingsModuleRPC,
      RPCName: string,
      descriptor: PropertyDescriptor
    ) => {
      if (this.functions.has(name ?? RPCName)) {
        throw new Error("重复的RPC调用名");
      }

      this.functions.set(name ?? RPCName, target);
    };
  }
}
