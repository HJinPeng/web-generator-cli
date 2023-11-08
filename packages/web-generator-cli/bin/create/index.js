import {
  getProjectName,
  inputProjectTitle,
  selectFrame,
  selectCompLib,
  confirmSupportIE11,
  selectNpmUtil,
  checkPageComp,
} from "./inquirer.js";
import { cwdResolve } from "../tool.js";
import { generateProject } from "./generate.js";

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

  // 页面组件
  const pageComp = await checkPageComp();

  const ie11 = await confirmSupportIE11();

  // npm管理工具
  const npmUtil = await selectNpmUtil();

  await generateProject({
    projectName,
    projectDir,
    projectTitle,
    frame,
    compLib,
    pageComp,
    ie11,
    npmUtil,
  });
}
