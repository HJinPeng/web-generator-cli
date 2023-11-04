import { execSync } from "node:child_process";
import path from "node:path";

/**
 * 判断 {command} 指令是否已安装
 * @author jinpengh
 *
 * @export
 * @param {'pnpm' | 'yarn' | 'npm'} command
 * @returns {boolean}
 */
export function isCommandInstalled(command) {
  try {
    execSync(`${command} -v`, { stdio: "ignore" });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 执行目录下的路径解析
 * @author jinpengh
 *
 * @param {*} url
 * @returns {*}
 */
export function cwdResolve(url) {
  // 执行命令的目录
  const cwd = process.cwd();
  return path.resolve(cwd, url);
}
