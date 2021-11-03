"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.create = exports.nodeProcesses = void 0;
const fs = require("fs");
const path = require("path");
const executor_1 = require("./executor");
const logger_1 = require("./logger");
const moduleName = 'index';
const pidPath = process.env.PID_PATH || '.';
exports.nodeProcesses = `ps -eo pid,command | grep node | grep -v grep`;
//export let nodeProcesses: string = `ps -eo pid,command | grep -v grep`;
function create(logger, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'create';
        logger.debug({ moduleName, methodName, name }, `Starting...`);
        const processPid = process.pid.toString();
        logger.debug({ moduleName, methodName, processPid }, `Starting...`);
        const pidFilename = `${path.join(pidPath, name)}.pid`;
        logger.debug({ moduleName, methodName, pidFilename }, `Starting...`);
        let pidFilePid = '';
        try {
            const pidFileBuf = fs.readFileSync(pidFilename);
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
            const runningNodeProcesses = yield (0, executor_1.exec)(logger, exports.nodeProcesses);
            logger.debug({ moduleName, methodName, runningNodeProcesses });
            const lines = runningNodeProcesses.stdout.split('\n') || [];
            logger.debug({ moduleName, methodName, lines });
            const end = lines.length > 0 && lines[0].indexOf('PID') !== -1 ? lines[0].indexOf('PID') + 3 : 5;
            logger.debug({ moduleName, methodName, end });
            for (const line of lines) {
                logger.debug({ moduleName, methodName, line });
                const linePid = line.slice(0, end).trim();
                logger.debug({ moduleName, methodName, linePid });
                if (linePid === pidFilePid) {
                    logger.debug({ moduleName, methodName, name }, `Sorry, already running.`);
                    return false;
                }
            }
        }
        try {
            fs.writeFileSync(pidFilename, Buffer.from(processPid));
            return true;
        }
        catch (err) {
            logger.error({ moduleName, methodName, err });
            process.exit(2);
        }
    });
}
exports.create = create;
function main(name = 'node-pid') {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'main';
        const logger = (0, logger_1.getLogger)(moduleName);
        const logLevel = process.env.LOG_LEVEL || 'debug';
        if (logLevel) {
            logger.level(logLevel);
        }
        logger.info({ moduleName, methodName, name, logLevel, loggerLevels: logger.levels() }, `Starting...`);
        return yield create(logger, name);
    });
}
exports.main = main;
// Start the program
if (require.main === module) {
    main();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBRTdCLHlDQUFrQztBQUNsQyxxQ0FBcUM7QUFHckMsTUFBTSxVQUFVLEdBQVcsT0FBTyxDQUFDO0FBQ25DLE1BQU0sT0FBTyxHQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBbUIsSUFBSSxHQUFHLENBQUM7QUFFckQsUUFBQSxhQUFhLEdBQVcsK0NBQStDLENBQUM7QUFDbkYseUVBQXlFO0FBRXpFLFNBQXNCLE1BQU0sQ0FBQyxNQUFjLEVBQUUsSUFBWTs7UUFDeEQsTUFBTSxVQUFVLEdBQVcsUUFBUSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRTlELE1BQU0sVUFBVSxHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFcEUsTUFBTSxXQUFXLEdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzlELE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXJFLElBQUksVUFBVSxHQUFXLEVBQUUsQ0FBQztRQUM1QixJQUFJO1lBQ0gsTUFBTSxVQUFVLEdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN4RCxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FB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