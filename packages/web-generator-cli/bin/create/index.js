import path, { dirname } from "node:path";
import fs from "fs-extra";
import { fileURLToPath } from "node:url";
import { confirm, input, select } from "@inquirer/prompts";
import mustache from "mustache";
import {
  getProjectName,
  inputProjectTitle,
  selectFrame,
  selectCompLib,
  selectNpmUtil,
  installDependencies,
  confirmESLint,
  confirmPrettier,
  confirmStylelint,
} from "./inquirer.js";
import { cwdResolve } from "../tool.js";

// 当前文件地址
const __dirname = dirname(fileURLToPath(import.meta.url));

export async function create(projectName, options) {
  // 项目名称
  projectName = await getProjectName(projectName);

  // 项目目录
  const projectDir = cwdResolve(projectName);

  // 项目中文名
  const projectTitle = await inputProjectTitle(projectName);

  // 前端框架
  const frame = await selectFrame();

  // 前端组件库
  const compLib = await selectCompLib();

  // eslint
  const eslint = await confirmESLint();

  // prettier
  const prettier = await confirmPrettier();

  // stylelint
  const stylelint = await confirmStylelint();

  /*
  // 前端框架
  const frame = await selectFrame();

  // npm管理工具
  const npmUtil = await selectNpmUtil();

  // 确保目录存在，如果不存在，则创建目录
  await fs.ensureDir(targetDir);

  // 判断使用的框架
  if (frame === "vue2") {
    const frameworkDir = path.resolve(__dirname, "../../templates/vue2");
    await fs.copy(path.resolve(frameworkDir, "./base"), targetDir);
    await generatePackageJson(targetDir, frameworkDir, projectName);
  }
  // 最后一步：安装依赖
  await installDependencies(npmUtil, targetDir, projectName);
  */
}

async function generatePackageJson(targetDir, frameworkDir, projectName) {
  const packageJson = await fs.readFile(
    path.resolve(frameworkDir, "./tpl/package.json.mustache"),
    "utf8"
  );
  const result = mustache.render(packageJson, { projectName });
  await fs.outputFile(path.resolve(targetDir, "./package.json"), result);
}
