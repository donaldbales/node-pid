# node-pid

Creates a pid file and returns the filename, if an existing pid file does not exist, or the corresponding process for the pid in an existsing file is no longer running. Otherwise, it returns any empty string..

## Release

0.0.3 Added support for all node v8 platforms.


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
const pidFilename = await nodePid.create(logger, 'myPidFilename');
if (pifFilename) {
	// Another process by this name is not running
	// so go ahead and do your processing...


  // All done: delete the pid file:
  fs.unlinkSync(pidFilename);    
} else {
	// Sorry, already running!
	process.exit(1);
}
```

## Support

Supports Node versions 8+.

Feel free to email don@donaldbales.com with and complaints and questions.
