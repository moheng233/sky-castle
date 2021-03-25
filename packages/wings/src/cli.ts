#!/usr/bin/env ts-node-script

import { program } from "commander";

program
    .name("wings")
    .addHelpText("before","Wings的辅助命令行库");


program.parseAsync();