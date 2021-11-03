import Logger from 'bunyan';
import * as fs from 'fs';
import * as path from 'path';

import { exec } from './executor';
import { getLogger } from './logger';
import { inspect } from './inspect';

const moduleName: string = 'index';
const pidPath: string = (process.env.PID_PATH as string) || '.';

export let nodeProcesses: string = `ps -eo pid,command | grep node | grep -v grep`;
//export let nodeProcesses: string = `ps -eo pid,command | grep -v grep`;

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

	if (pidFilePid) {
		const runningNodeProcesses: any = await exec(logger, nodeProcesses);
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
				logger.info({ moduleName, methodName, name }, `Sorry, already running.`);
				return '';
			}
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
