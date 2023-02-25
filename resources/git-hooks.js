'use strict';

const fs = require('fs');
const path = require('path');

const gitFolder = path.resolve(process.env.INIT_CWD, '.git');
const hookFolder = path.resolve(gitFolder, 'hooks');
const hookSourceFolder = __dirname;
const prePushFile = path.resolve(hookFolder, 'pre-push');

const FILE_PERMS = 0o755;

/**
 * Adds a hook to the .git/hooks folder
 * @param {string} targetHook path where the hook file should be added
 * @param {string} sourceScript path where the hook code is
 */
function addHook (targetHook, sourceScript) {
  const copyOrLink = fs.copyFileSync ? fs.copyFileSync : fs.symlinkSync;

  if (fs.existsSync(targetHook)) {
    fs.unlinkSync(targetHook);
  }
  copyOrLink(sourceScript, targetHook);
  fs.chmodSync(targetHook, FILE_PERMS);
}

if (fs.existsSync(gitFolder)) {
  if (!fs.existsSync(hookFolder)) {
    fs.mkdirSync('.git/hooks');
  }
  addHook(prePushFile, path.resolve(hookSourceFolder, 'pre-push-hook.sh'));

  console.log('Created git hooks');
}
