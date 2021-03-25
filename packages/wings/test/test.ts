import { WingsModule, WingsServer } from "../src/main";

const server = new WingsServer();

@server.module("test")
class TestModule extends WingsModule {

}