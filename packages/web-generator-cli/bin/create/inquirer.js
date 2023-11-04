import { exec } from "node:child_process";
import path from "node:path";
import fs from "fs-extra";
import { confirm, input, select } from "@inquirer/prompts";
import ora from "ora";
import { isCommandInstalled, cwdResolve } from "../tool.js";

/**
 * 获取项目名称--Promise
 * @author jinpengh
 *
 * @export
 * @param {string} projectName
 * @returns {*}
 */
export function getProjectName(projectName) {
  return new Promise(async (resolve) => {
    _getProjectName(projectName, resolve);
  });
}

// 获取项目名称--具体实现
async function _getProjectName(projectName, resolve) {
  // 项目目录
  const projectDir = cwdResolve(projectName);
  // 目录存在
  if (fs.existsSync(projectDir)) {
    const rewrite = await confirm({
      message: `目录 ${projectName} 已存在. 请重新输入项目名：`,
    });
    if (rewrite) {
      const newName = await input({
        message: "项目名（英文，且不包含空格）",
        validate: (val) => {
          if (!val) {
            return "项目名不能为空";
          }
          return true;
        },
      });
      await _getProjectName(newName, resolve);
    } else {
      process.exit();
    }
  } else {
    resolve(projectName);
  }
}

/**
 * 项目中文名称
 * @author jinpengh
 *
 * @export
 * @async
 * @param {string} projectName
 * @returns {Promise<string>}
 */
export async function inputProjectTitle(projectName) {
  const projectTitle = await input({
    message: "项目中文名：",
    default: projectName,
  });
  return projectTitle;
}

/**
 * 选择前端框架
 * @author jinpengh
 *
 * @export
 * @async
 * @returns {Promise<'vue2' | 'vue3'>}
 */
export async function selectFrame() {
  let frame = await select({
    message: "选择前端框架：",
    choices: [
      {
        name: "vue2 + js",
        value: "vue2",
        description: "vue2 + js + vue-cli + vue-router + vuex + axios",
      },
      {
        name: "vue3 + ts",
        value: "vue3",
        description: "vue3 + ts + vite + vue-router + pinia + axios",
      },
    ],
  });
  return frame;
}

/**
 * 选择组件库
 * @author jinpengh
 *
 * @export
 * @async
 * @returns {Promise<'antd' | 'element'>}
 */
export async function selectCompLib() {
  let compLib = await select({
    message: "选择组件库：",
    choices: [
      {
        name: "Ant Design Vue",
        value: "antd",
      },
      {
        name: "Element UI",
        value: "element",
      },
    ],
  });
  return compLib;
}

/**
 * 是否使用eslint
 * @author jinpengh
 *
 * @export
 * @async
 * @returns {Promise<boolean>}
 */
export async function confirmESLint() {
  const eslint = await confirm({
    message: "使用 ESLint?",
  });
  return eslint;
}

/**
 * 是否使用 Prettier
 * @author jinpengh
 *
 * @export
 * @async
 * @returns {Promise<boolean>}
 */
export async function confirmPrettier() {
  const prettier = await confirm({
    message: "使用 Prettier?",
  });
  return prettier;
}

/**
 * 是否使用 Stylelint
 * @author jinpengh
 *
 * @export
 * @async
 * @returns {Promise<boolean>}
 */
export async function confirmStylelint() {
  const stylelint = await confirm({
    message: "使用 Stylelint?",
  });
  return stylelint;
}

/**
 * 选择npm包管理工具
 * @author jinpengh
 *
 * @export
 * @async
 * @returns {Promise<'npm' | 'yarn' | 'pnpm'>}
 */
export async function selectNpmUtil() {
  let npmUtil = await select({
    message: "选择npm包管理工具：",
    choices: [
      {
        name: "yarn",
        value: "yarn",
        description:
          "yarn - 一个成熟的开源包管理器，用于管理 JavaScript 项目中的依赖项",
      },
      {
        name: "npm",
        value: "npm",
        description: "npm - npm包管理器",
      },
      {
        name: "pnpm",
        value: "pnpm",
        description: "pnpm - 速度快、节省磁盘空间的软件包管理器",
      },
    ],
  });
  return npmUtil;
}

/**
 * 使用npm管理工具安装依赖
 * @author jinpengh
 *
 * @export
 * @async
 * @param {'npm' | 'yarn' | 'pnpm'} npmUtil
 * @param {string} execDir
 * @param {string} projectName
 * @returns {Promise}
 */
export async function installDependencies(npmUtil, execDir, projectName) {
  return new Promise((resolve, reject) => {
    // 指令不存在，则用 npm
    if (!isCommandInstalled(npmUtil)) {
      npmUtil = "npm";
    }
    // Loading
    const spinner = ora("安装依赖中，请稍等...").start();

    // 执行下载安装依赖操作
    exec(`${npmUtil} install`, { cwd: execDir }, (error, stdout, stderr) => {
      if (error) {
        spinner.fail("依赖安装失败");
        reject(error);
        return;
      }
      spinner.succeed("依赖安装完成");
      console.log("\r\n");
      console.log("项目初始化完成，执行以下命令启动项目：");
      console.log("\r\n");
      console.log(`  cd ${projectName}`);
      console.log(`  ${npmUtil === "npm" ? "npm run" : npmUtil} dev`);
      console.log("\r\n");
      resolve();
    });
  });
}
