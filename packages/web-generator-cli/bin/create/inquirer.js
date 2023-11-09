import fs from "fs-extra";
import { confirm, input, select, checkbox } from "@inquirer/prompts";
import { cwdResolve } from "../tool.js";

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
      // {
      //   name: "vue3 + ts",
      //   value: "vue3",
      //   description: "vue3 + ts + vite + vue-router + pinia + axios",
      // },
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
      // {
      //   name: "Element UI",
      //   value: "element",
      // },
    ],
  });
  return compLib;
}

/**
 * 选择页面组件
 * @author jinpengh
 *
 * @export
 * @async
 * @returns {Promise<Array>}
 */
export async function checkPageComp() {
  let pageComp = await checkbox({
    message: "选择页面组件（默认内置【欢迎页、异常页】）：",
    choices: [
      {
        name: "登录",
        value: "login",
      },
      {
        name: "用户管理",
        value: "user",
      },
      {
        name: "角色管理",
        value: "role",
      },
      {
        name: "菜单管理",
        value: "menu",
      },
      {
        name: "字典管理",
        value: "dict",
      },
      {
        name: "页面栈示例",
        value: "viewStack",
      },
      {
        name: "echarts示例",
        value: "echarts",
      },
      // {
      //   name: "文件管理",
      //   value: "file",
      // },
      // {
      //   name: "echarts看板",
      //   value: "echarts",
      // },
      // {
      //   name: "antv-g6示例",
      //   value: "g6",
      // },
    ],
  });
  if (pageComp.includes("login")) {
    const loginMode = await select({
      message: "请选择登录模式：",
      choices: [
        {
          name: "账密",
          value: "login:account",
        },
        // {
        //   name: "单点登录",
        //   value: "login:sso",
        // },
        // {
        //   name: "账密+单点登录",
        //   value: "login:account+sso",
        // },
      ],
    });
    pageComp.push(loginMode);
  }
  return pageComp;
}

/**
 * 是否支持ie11
 * @author jinpengh
 *
 * @export
 * @async
 * @returns {Promise<boolean>}
 */
export async function confirmSupportIE11() {
  const ie11 = await confirm({
    message: "支持ie11 ?（默认不支持）",
    default: false,
  });
  return ie11;
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
