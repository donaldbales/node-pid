import Logger from 'bunyan';
import * as fs from 'fs';
import * as path from 'path';

import { exec } from './executor';
import { getLogger } from './logger';
import { inspect } from './inspect';

const moduleName: string = 'index';
const pidPath: string = (process.env.PID_PATH as string) || '.';

export let aixNodeProcesses: string = `ps -Ao pid,comm | grep node | grep -v grep`;
export let freeBsdNodeProcesses: string = `ps -ao pid,command | grep node | grep -v grep`;
export let openBsdNodeProcesses: string = `ps -Ao pid,command | grep node | grep -v grep`;
export let unixNodeProcesses: string = `ps -eo pid,command | grep -e node -e PID | grep -v grep`;
export let windowsNodeProcesses: string = `tasklist /fo csv`;

export async function checkAixProcesses(logger: Logger, pidFilePid: string): Promise<boolean> {
	const methodName: string = 'checkAixProcesses';
	logger.debug({ moduleName, methodName, pidFilePid }, `Starting...`);

	const runningNodeProcesses: any = await exec(logger, aixNodeProcesses);
	logger.debug({ moduleName, methodName, runningNodeProcesses });
	
	const lines: string[] = runningNodeProcesses.stdout.split('\n') || [];
	logger.debug({ moduleName, methodName, lines });

	const end: number = lines.length > 0 && lines[0].indexOf('PID') !== -1 ? lines[0].indexOf('PID') + 3 : 5;
	logger.debug({ moduleName, methodName, end });

	for (const line of lines) {
		logger.debug({ moduleName, methodName, line });
		
		const linePid: string = line.slice(0, end).trim();
		logger.debug({ moduleName, methodName, linePid });

		if (linePid === pidFilePid) {
			logger.info({ moduleName, methodName, pidFilePid, linePid }, `Sorry, already running.`);
			return true;
		}
	}

	return false;
}

export async function checkFreeBsdProcesses(logger: Logger, pidFilePid: string): Promise<boolean> {
	const methodName: string = 'checkFreeBsdProcesses';
	logger.debug({ moduleName, methodName, pidFilePid }, `Starting...`);

	const runningNodeProcesses: any = await exec(logger, freeBsdNodeProcesses);
	logger.debug({ moduleName, methodName, runningNodeProcesses });
	
	const lines: string[] = runningNodeProcesses.stdout.split('\n') || [];
	logger.debug({ moduleName, methodName, lines });

	const end: number = lines.length > 0 && lines[0].indexOf('PID') !== -1 ? lines[0].indexOf('PID') + 3 : 5;
	logger.debug({ moduleName, methodName, end });

	for (const line of lines) {
		logger.debug({ moduleName, methodName, line });
		
		const linePid: string = line.slice(0, end).trim();
		logger.debug({ moduleName, methodName, linePid });

		if (linePid === pidFilePid) {
			logger.info({ moduleName, methodName, pidFilePid, linePid }, `Sorry, already running.`);
			return true;
		}
	}

	return false;
}

export async function checkOpenBsdProcesses(logger: Logger, pidFilePid: string): Promise<boolean> {
	const methodName: string = 'checkOpenBsdProcesses';
	logger.debug({ moduleName, methodName, pidFilePid }, `Starting...`);

	const runningNodeProcesses: any = await exec(logger, openBsdNodeProcesses);
	logger.debug({ moduleName, methodName, runningNodeProcesses });
	
	const lines: string[] = runningNodeProcesses.stdout.split('\n') || [];
	logger.debug({ moduleName, methodName, lines });

	const end: number = lines.length > 0 && lines[0].indexOf('PID') !== -1 ? lines[0].indexOf('PID') + 3 : 5;
	logger.debug({ moduleName, methodName, end });

	for (const line of lines) {
		logger.debug({ moduleName, methodName, line });
		
		const linePid: string = line.slice(0, end).trim();
		logger.debug({ moduleName, methodName, linePid });

		if (linePid === pidFilePid) {
			logger.info({ moduleName, methodName, pidFilePid, linePid }, `Sorry, already running.`);
			return true;
		}
	}

	return false;
}

export async function checkUnixProcesses(logger: Logger, pidFilePid: string): Promise<boolean> {
	const methodName: string = 'checkUnixProcesses';
	logger.debug({ moduleName, methodName, pidFilePid }, `Starting...`);

	const runningNodeProcesses: any = await exec(logger, unixNodeProcesses);
	logger.debug({ moduleName, methodName, runningNodeProcesses });
	
	const lines: string[] = runningNodeProcesses.stdout.split('\n') || [];
	logger.debug({ moduleName, methodName, lines });
// 2454987 node --max-old-space-size=16384 --unhandled-rejections=strict src/products/index
	const end: number = lines.length > 0 && lines[0].indexOf('PID') !== -1 ? lines[0].indexOf('PID') + 3 : lines[0].indexOf(' ');
	logger.debug({ moduleName, methodName, end });

	for (const line of lines) {
		logger.debug({ moduleName, methodName, line });
		
		const linePid: string = line.slice(0, end).trim();
		logger.debug({ moduleName, methodName, linePid });

		if (linePid === pidFilePid) {
			logger.info({ moduleName, methodName, pidFilePid, linePid }, `Sorry, already running.`);
			return true;
		}
	}

	return false;
}

export async function checkWindowsProcesses(logger: Logger, pidFilePid: string): Promise<boolean> {
	const methodName: string = 'checkWindowsProcesses';
	logger.debug({ moduleName, methodName, pidFilePid }, `Starting...`);

	const runningNodeProcesses: any = await exec(logger, windowsNodeProcesses);
	logger.debug({ moduleName, methodName, runningNodeProcesses });
	
	const lines: string[] = runningNodeProcesses.stdout.split('\n') || [];
	logger.debug({ moduleName, methodName, lines });

	for (const line of lines) {
		logger.debug({ moduleName, methodName, line });
		
		if (line) {
			const fields: any[] = line.split(',');
			if (fields.length > 1) { 
				const linePid: string = fields[1].slice(1, fields[1].length - 1).trim();
				logger.debug({ moduleName, methodName, linePid });

				if (linePid === pidFilePid) {
					logger.info({ moduleName, methodName, pidFilePid, linePid }, `Sorry, already running.`);
					return true;
				}
			}
		}
	}

	return false;
}

export async function create(logger: Logger, name: string): Promise<string> {
	const methodName: string = 'create';
	logger.debug({ moduleName, methodName, name }, `Starting...`);

	const processPid: string = process.pid.toString();
	logger.debug({ moduleName, methodName, processPid }, `Starting...`);
	
	const pidFilename: string = `${path.join(pidPath, name)}.pid`;
	logger.debug({ moduleName, methodName, pidFilename }, `Starting...`);
	
	let pidFilePid: string = '';
	try {
		const pidFileBuf: Buffer = fs.readFileSync(pidFilename);
		logger.debug({ moduleName, methodName, pidFileBuf });
		pidFilePid = pidFileBuf ? pidFileBuf.toString().trim() : '';
		logger.debug({ moduleName, methodName, pidFilePid });
	}
	catch (err) {
		if (err.code !== 'ENOENT') {
			logger.error({ moduleName, methodName, err });
			process.exit(1);
		} 
	}

	// darwin, linux, win32
	if (pidFilePid) {
		let alreadyRunning: boolean = false;
		switch (process.platform) {
			case 'aix':
				alreadyRunning = await checkUnixProcesses(logger, pidFilePid); 
				break;
			case 'darwin':
				alreadyRunning = await checkUnixProcesses(logger, pidFilePid); 
			  break;
			case 'freebsd':
				alreadyRunning = await checkFreeBsdProcesses(logger, pidFilePid); 
				break;
			case 'linux':
				alreadyRunning = await checkUnixProcesses(logger, pidFilePid); 
				break;
			case 'openbsd':
				alreadyRunning = await checkOpenBsdProcesses(logger, pidFilePid); 
				break;
			case 'sunos':
				alreadyRunning = await checkUnixProcesses(logger, pidFilePid); 
				break;
			case 'win32':
				alreadyRunning = await checkWindowsProcesses(logger, pidFilePid); 
				break;
			default:
				throw `Unsupported platform ${process.platform}.`;
		}
		if (alreadyRunning) {
			return '';
		}
	}

	try {
		fs.writeFileSync(pidFilename, Buffer.from(processPid));
		logger.info({ moduleName, methodName, name, pidFilename }, `Successfully created.`);
		return pidFilename;
	}
	catch (err) {
		logger.error({ moduleName, methodName, err });
		process.exit(2);
	}
}

export async function main(name: string = 'node-pid'): Promise<any> {
	const methodName: string = 'main';
  const logger = getLogger(moduleName);
  const logLevel = (process.env.LOG_LEVEL as string) || 'debug';
  if (logLevel) {
    logger.level(logLevel);
  }
  logger.info({ moduleName, methodName, name, logLevel, loggerLevels: logger.levels() }, `Starting...`);

  return await create(logger, name);
}

// Start the program
if (require.main === module) {
  main();
}
