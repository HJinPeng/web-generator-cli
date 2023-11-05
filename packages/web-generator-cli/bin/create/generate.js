import fs from "fs-extra";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { exec } from "node:child_process";
import ora from "ora";
import { isCommandInstalled } from "../tool.js";

// 当前文件地址
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * 生成项目
 * @author jinpengh
 *
 * @export
 * @async
 * @param {*} options
 * @returns {*}
 */
export async function generateProject(options) {
  const {
    projectName,
    projectDir,
    projectTitle,
    frame,
    compLib,
    pageComp,
    eslint,
    prettier,
    stylelint,
    npmUtil,
  } = options;

  // 确保目录存在，如果不存在，则创建目录
  await fs.ensureDir(projectDir);

  // 模板目录
  const templateDir = path.resolve(__dirname, "../../templates/vue2");
  // 拷贝模板
  await fs.copy(templateDir, projectDir);

  // 安装依赖
  await installDependencies(npmUtil, projectDir, projectName);
}

/**
 * 使用npm管理工具安装依赖
 * @author jinpengh
 *
 * @async
 * @param {'npm' | 'yarn' | 'pnpm'} npmUtil
 * @param {string} execDir
 * @param {string} projectName
 * @returns {Promise}
 */
async function installDependencies(npmUtil, execDir, projectName) {
  return new Promise((resolve, reject) => {
    // 指令不存在，则用 npm
    if (!isCommandInstalled(npmUtil)) {
      npmUtil = "npm";
    }
    // Loading
    const spinner = ora("安装依赖中，请稍等...").start();

    // 执行下载安装依赖操作
    exec(
      `git init && ${npmUtil} install`,
      { cwd: execDir },
      (error, stdout, stderr) => {
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
      }
    );
  });
}
