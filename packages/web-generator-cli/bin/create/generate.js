import fs from "fs-extra";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { exec } from "node:child_process";
import ora from "ora";
import ejs from "ejs";
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

  // 模板路径
  const templateDir = path.resolve(__dirname, "../../templates/vue2");
  // 拷贝
  await copyAndRenderFiles(templateDir, projectDir, options);
  // 安装依赖
  setTimeout(async () => {
    await installDependencies(npmUtil, projectDir, projectName);
  }, 1000);
}

/**
 * 将模板复制到指定目录下，并将ejs渲染
 * @author jinpengh
 *
 * @export
 * @async
 * @param {*} templateDir
 * @param {*} projectDir
 * @param {{}} [options={}]
 * @returns {*}
 */
export async function copyAndRenderFiles(
  templateDir,
  projectDir,
  options = {}
) {
  const items = await fs.readdir(templateDir);
  items.forEach(async (item) => {
    const templateItemPath = `${templateDir}/${item}`;
    const projectItemPath = `${projectDir}/${item}`;
    const isDir = (await fs.lstat(templateItemPath)).isDirectory();
    if (isDir) {
      await fs.ensureDir(projectItemPath);
      await copyAndRenderFiles(templateItemPath, projectItemPath, options);
    } else {
      if (item.endsWith(".ejs")) {
        const data = await ejs.renderFile(templateItemPath, options);
        await fs.outputFile(projectItemPath.replace(".ejs", ""), data);
      } else {
        await fs.copy(templateItemPath, projectItemPath);
      }
    }
  });
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
