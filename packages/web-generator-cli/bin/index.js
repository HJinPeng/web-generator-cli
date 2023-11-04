#!/usr/bin/env node

import { Command } from "commander";
import { create } from "./create/index.js";

const program = new Command();

program
  .name("web-generator-cli")
  .description("CLI to generate projects and modules")
  .version("1.0.0");

// 创建项目
program
  .command("create")
  .description("Create a project")
  .argument("<your-project-name>", "your project name")
  .action((projectName, options) => {
    create(projectName, options);
  });

program.parse();
