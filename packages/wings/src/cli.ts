#!/usr/bin/env ts-node-script

import { program } from "commander";

program
    .name("wings")
    .addHelpText("before","Wings的辅助命令行库");

program
    .command("generate <dir> <target>","生成对应的客户端调用声明文件")
    .addHelpText("after", ``)
    .action(() => {

    });


program.parseAsync();