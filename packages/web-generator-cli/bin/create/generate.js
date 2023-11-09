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
    ie11,
    npmUtil,
  } = options;

  // 模板路径
  const templateDir = path.resolve(__dirname, "../../templates/vue2");
  // 拷贝
  copyAndRenderFiles(templateDir, projectDir, options);
  // 安装依赖
  await installDependencies(npmUtil, projectDir, projectName);
}

/**
 * 将模板复制到指定目录下，并将ejs渲染
 * @author jinpengh
 *
 * @param {*} templateDir
 * @param {*} projectDir
 * @param {{}} [options={}]
 * @returns {*}
 */
function copyAndRenderFiles(templateDir, projectDir, options = {}) {
  for (let item of fs.readdirSync(templateDir)) {
    const templateItemPath = path.join(templateDir, item);
    const projectItemPath = path.join(projectDir, item);

    // 可选文件/文件夹判断
    // 页面组件--login
    if (skipPageComp("login", options.pageComp, templateItemPath)) continue;

    // 页面组件--user
    if (skipPageComp("user", options.pageComp, templateItemPath)) continue;

    // 页面组件--role
    if (skipPageComp("role", options.pageComp, templateItemPath)) continue;

    // 页面组件--menu
    if (skipPageComp("menu", options.pageComp, templateItemPath)) continue;

    // 页面组件--dict
    if (skipPageComp("dict", options.pageComp, templateItemPath)) continue;

    // 页面组件--viewStack
    if (skipPageComp("viewStack", options.pageComp, templateItemPath)) continue;

    if (fs.lstatSync(templateItemPath).isDirectory()) {
      // fixbug: 文件夹下没有文件时不需要创建该文件夹
      // fs.ensureDirSync(projectItemPath);
      copyAndRenderFiles(templateItemPath, projectItemPath, options);
    } else {
      if (item.endsWith(".ejs")) {
        ejs.renderFile(templateItemPath, options, function (err, data) {
          fs.outputFileSync(projectItemPath.replace(".ejs", ""), data);
        });
      } else {
        fs.copySync(templateItemPath, projectItemPath);
      }
    }
  }
}

// 页面组件对应的文件/文件夹路径
const pageCompMap = {
  login: [path.join("views", "login")],
  user: [path.join("views", "system", "user")],
  role: [path.join("views", "system", "role")],
  menu: [path.join("views", "system", "menu")],
  dict: [path.join("views", "system", "dict")],
  viewStack: [path.join("views", "test", "view-stack")],
};

/**
 * 跳过某些文件/文件夹的复制
 * @author jinpengh
 *
 * @param {string} compName
 * @param {Array} pageComp
 * @param {string} templateItemPath
 * @returns {boolean}
 */
function skipPageComp(compName, pageComp, templateItemPath) {
  const allPath = pageCompMap[compName];
  if (!pageComp.includes(compName)) {
    for (let path of allPath) {
      if (templateItemPath.indexOf(path) !== -1) {
        return true;
      }
    }
  }
  return false;
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
