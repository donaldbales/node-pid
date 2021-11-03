// executor.ts
import Logger from 'bunyan';
import * as childProcess from 'child_process';

const moduleName: string = 'executor';

export async function exec(logger: Logger, command: string, options: any = {}): Promise<any> {
  const methodName: string = 'exec';
  logger.debug({ moduleName, methodName }, `Starting...`);
  
  return new Promise((resolve, reject) => {
    const result: any = { code: -1, error: null, stderr: null, stdout: null };

    const handle: any = childProcess.exec(command, options);

    handle.stdout.on('data', (data: any) => {
      logger.debug({ moduleName, methodName, data }, `stdout.on data`);
      if (!result.stdout) {
        result.stdout = '';
      }
      result.stdout += data;
    });

    handle.stderr.on('data', (data: any) => {
      logger.warn({ moduleName, methodName, data }, `stderr.on data`);
      if (!result.stderr) {
        result.stderr = '';
      }
      result.stderr += data;
    });

    handle.on('close', (code: any) => {
      logger.debug({ moduleName, methodName, code }, `on close`);
      result.code = code;
      resolve(result);
    });

    handle.on('error', (error: any) => {
      logger.error({ moduleName, methodName, error }, `on error`);
      result.error = error;
      reject(result);
    });
  });
}
