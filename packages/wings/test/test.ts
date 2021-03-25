import { WingsModule } from "../src/common";
import { WingsServer } from "../src/server";

const server = new WingsServer();

@server.module("test")
class TestModule extends WingsModule {

}