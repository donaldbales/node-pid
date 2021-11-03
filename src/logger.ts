import * as bunyan from 'bunyan';

import { inspect } from './inspect';

let logger: any = null;
const moduleName: string = 'logger';

export function getLogger(name: string): any {
  if (!logger) {
    logger = bunyan.createLogger({ name });
  }

  return logger;
}
