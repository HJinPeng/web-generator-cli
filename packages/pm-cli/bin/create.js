import path, { dirname } from 'node:path'
import fs from 'fs-extra'
import { fileURLToPath } from 'node:url';
import { confirm, input, select  } from '@inquirer/prompts';
import { exec, execSync } from 'node:child_process'
import { isCommandInstalled } from './tool.js'
import mustache from 'mustache'


const __dirname = dirname(fileURLToPath(import.meta.url));

export async function create(projectName, options) {
  // 执行命令的目录
  const cwd = process.cwd();
  // 创建项目的目录地址
  const targetDir = path.resolve(cwd, projectName);
  // 目录存在
  if(fs.existsSync(targetDir)) {
    const reName = await confirm({message: 'The directory already exists. Do you want to re-enter the name?'})
    if(reName) {
      const name = await input({ message: 'Enter the name' });
      await create(name, options)
    }else {
      process.exit()
    }
  }else {
    const { framework, pkg } = await getProjectConfig();
    console.log('framework', framework);
    await fs.ensureDir(targetDir);
    if(framework === 'vue2') {
      const frameworkDir = path.resolve(__dirname, '../templates/vue2')
      await fs.copy(
        path.resolve(frameworkDir, './base'),
        targetDir
      )
      await generatePackageJson(targetDir, frameworkDir, projectName)
      // console.log('package.json',generatePackageJson(targetDir, frameworkDir));
      // if(isCommandInstalled('pnpm')) {
      //   console.log('pnpm1', targetDir);
      //   execSync('pnpm install', {  cwd: targetDir });
      //   console.log('pnpm2');
      // }else 

      if(isCommandInstalled(pkg)) {
        console.log('yarn1');
        execSync(`${pkg} install`, { cwd: targetDir });
        console.log('yarn2');
      }else {
        console.log('npm1');
        execSync('npm install', { stdio: 'inherit' });
        console.log('npm2');
      }
      console.log(`\r\n  cd ${projectName}`)
      console.log('  npm run dev\r\n')
    }
  }
}



/**
 * 获取用户输入的配置
 * @author jinpengh
 *
 * @async
 * @returns {Object}
 */
async function getProjectConfig() {
  const config = {};
  config.framework = await select({
    message: 'Select a frontend framework',
    choices: [
      {
        name: 'vue2',
        value: 'vue2',
        description: 'vue2 - use options API, use vue-cli, can be used for IE',
      },
      {
        name: 'vue3',
        value: 'vue3',
        description: 'vue3 - use composition API, use vite, faster and smaller',
      },
    ],
  });
  config.pkg = await select({
    message: 'Choose a tool to manage your project',
    choices: [
      {
        name: 'yarn',
        value: 'yarn',
        description: 'yarn - 一个成熟的开源包管理器，用于管理 JavaScript 项目中的依赖项',
      },
      {
        name: 'npm',
        value: 'npm',
        description: 'npm - npm包管理器',
      },
      {
        name: 'pnpm',
        value: 'pnpm',
        description: 'pnpm - 速度快、节省磁盘空间的软件包管理器',
      }
    ],
  });
  return config;
}

async function generatePackageJson(targetDir, frameworkDir, projectName) {
  const packageJson = await fs.readFile(path.resolve(frameworkDir, './tpl/package.json.mustache'), 'utf8');
  const result = mustache.render(packageJson, {projectName})
  await fs.outputFile(path.resolve(targetDir, './package.json'), result)
}