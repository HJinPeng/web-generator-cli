#!/usr/bin/env node

import { program } from 'commander'
import { create } from './create.js'

program
  .name('pm-cli')
  .description('CLI to generate projects and modules')
  .version('1.0.0');

program.command('create')
  .description('Create a project')
  .argument('<projectName>', 'project name')
  .action((projectName, options) => {
    // console.log(projectName, options)
    create(projectName, options)
  });

program.parse()