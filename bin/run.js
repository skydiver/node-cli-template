#!/usr/bin/env node

const cli = require('sywac');
const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

updateNotifier({ pkg }).notify({ isGlobal: true });

// import commands
const command1 = require('../commands/command1');

// get app parameters
const { name } = pkg;
const version = chalk.green(pkg.version);

// Preface: define a slogan to display at the beginning of generated help text
cli.preface(`${name} ${version}`);

// Usage: define your own static usage string for help text, or customize each part of the generated usage string
cli.usage({
  prefix: `${chalk.yellow('Usage:')}\n  $0`,
  commandPlaceholder: 'command',
  optionsPlaceholder: false,
});

// commands list
cli
  .command('command1', { desc: 'your command 1 description', run: command1 })
  .command('command2', { desc: 'your command 2 description', run: command1 });

// help & version config
cli
  .help('-h, --help', {
    desc: 'Display this help message',
    implicitCommand: false,
  })
  .version('-v, --version', {
    desc: 'Display this application version',
    implicitCommand: false,
    version,
  });

// Enable a mode that outputs help text when no arguments or options are given on the command line.
cli.showHelpByDefault();

// Configure output settings for generated help text.
cli.outputSettings({ maxWidth: 150 });

module.exports = cli;

async function main() {
  await cli.parseAndExit();
}

if (require.main === module) main();
