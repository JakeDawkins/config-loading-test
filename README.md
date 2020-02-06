config-loading
==============



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/config-loading.svg)](https://npmjs.org/package/config-loading)
[![Downloads/week](https://img.shields.io/npm/dw/config-loading.svg)](https://npmjs.org/package/config-loading)
[![License](https://img.shields.io/npm/l/config-loading.svg)](https://github.com/JakeDawkins/config-loading/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g config-loading
$ config-loading COMMAND
running command...
$ config-loading (-v|--version|version)
config-loading/0.0.0 darwin-x64 node-v10.15.3
$ config-loading --help [COMMAND]
USAGE
  $ config-loading COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`config-loading hello [FILE]`](#config-loading-hello-file)
* [`config-loading help [COMMAND]`](#config-loading-help-command)

## `config-loading hello [FILE]`

describe the command here

```
USAGE
  $ config-loading hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ config-loading hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/JakeDawkins/config-loading/blob/v0.0.0/src/commands/hello.ts)_

## `config-loading help [COMMAND]`

display help for config-loading

```
USAGE
  $ config-loading help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->
