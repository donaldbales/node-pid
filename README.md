# node-pid

Creates a pid file and returns true, if an existing pid file does not exist, or the correspnding process for the pid in an existsing file is no longer running. Otherwise, it returns false.

## Release

0.0.1 Just coded. Not tested very well yet. ;)


## How to clone, install modules, and compile

```
git clone git@github.com:donaldbales/node-pid.git
cd node-pid
npm install
./node_modules/.bin/tsc
```

## Environment Variables

You need to set these environment variables:

```
# Where to store the Process ID (PID) file 
export PID_PATH=.
```

## Installation

Using npm:

```
$ npm i --save node-pid
```

In Node.js:

```
const nodePid = require('node-pid');

// To create a pid file:
const name = 'myPidFilename';
if (await nodePid.create(logger, name) {
	// Another process by this name is not running
	// so go ahead and do your processing...
} else {
	// Sorry, already running!
	process.exit(1);
}
```

## Support

Supports Node versions 8+.

Feel free to email don@donaldbales.com with and complaints and questions.
