import { execSync } from 'node:child_process'

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
    execSync(`${command} -v`, { stdio: 'ignore' })
    return true;
  } catch (error) {
    return false;
  }
}
