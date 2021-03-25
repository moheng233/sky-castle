var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// src/server.ts
__markAsModule(exports);
__export(exports, {
  WingsServer: () => WingsServer
});
var import_socket = __toModule(require("socket.io"));

// src/interfaces.ts
var WingsPeerStatus;
(function(WingsPeerStatus2) {
  WingsPeerStatus2[WingsPeerStatus2["BEFROM"] = 0] = "BEFROM";
  WingsPeerStatus2[WingsPeerStatus2["INITING"] = 1] = "INITING";
  WingsPeerStatus2[WingsPeerStatus2["INITIALIZED"] = 2] = "INITIALIZED";
})(WingsPeerStatus || (WingsPeerStatus = {}));

// src/common.ts
var WingsPeer = class {
  constructor() {
    this.modules = new Map();
    this.status = WingsPeerStatus.BEFROM;
  }
  local_exec(moduleName, RPCName, data) {
    let module2 = this.modules.get(moduleName);
    if (module2 == void 0) {
      throw new Error("\u4E0D\u5B58\u5728\u7684\u6A21\u5757");
    }
    return module2.exec(RPCName, data);
  }
  module(name) {
    return (target) => {
      if (this.modules.has(name)) {
        throw new Error("\u91CD\u590D\u7684\u6A21\u5757\u540D\u79F0");
      }
      this.modules.set(name, target.OBJECT);
    };
  }
};
var _WingsModule = class {
  constructor() {
    this.functions = new Map();
  }
  exec(RPCName, data) {
    let rpc = this.functions.get(RPCName);
    if (rpc == void 0) {
      throw new Error("\u4E0D\u5B58\u5728\u7684\u8C03\u7528");
      return;
    }
    return rpc(data);
  }
  rpc(name) {
    return (target, RPCName, descriptor) => {
      if (this.functions.has(name != null ? name : RPCName)) {
        throw new Error("\u91CD\u590D\u7684RPC\u8C03\u7528\u540D");
      }
      this.functions.set(name != null ? name : RPCName, target);
    };
  }
};
var WingsModule = _WingsModule;
WingsModule.OBJECT = new _WingsModule();

// src/server.ts
var WingsServer = class extends WingsPeer {
  constructor(config = {
    port: 8080,
    dir: "./",
    ioconfig: void 0
  }) {
    super();
    this.config = config;
    var _a;
    this.ioserver = new import_socket.Server((_a = this == null ? void 0 : this.config) == null ? void 0 : _a.ioconfig);
  }
  run() {
    this.ioserver.listen(this.config.port);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WingsServer
});
