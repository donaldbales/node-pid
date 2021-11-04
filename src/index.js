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
exports.main = exports.create = exports.checkWindowsProcesses = exports.checkUnixProcesses = exports.checkOpenBsdProcesses = exports.checkFreeBsdProcesses = exports.checkAixProcesses = exports.windowsNodeProcesses = exports.unixNodeProcesses = exports.openBsdNodeProcesses = exports.freeBsdNodeProcesses = exports.aixNodeProcesses = void 0;
const fs = require("fs");
const path = require("path");
const executor_1 = require("./executor");
const logger_1 = require("./logger");
const moduleName = 'index';
const pidPath = process.env.PID_PATH || '.';
exports.aixNodeProcesses = `ps -Ao pid,comm | grep node | grep -v grep`;
exports.freeBsdNodeProcesses = `ps -ao pid,command | grep node | grep -v grep`;
exports.openBsdNodeProcesses = `ps -Ao pid,command | grep node | grep -v grep`;
exports.unixNodeProcesses = `ps -eo pid,command | grep node | grep -v grep`;
exports.windowsNodeProcesses = `tasklist /fo csv`;
function checkAixProcesses(logger, pidFilePid) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'checkAixProcesses';
        logger.debug({ moduleName, methodName, pidFilePid }, `Starting...`);
        const runningNodeProcesses = yield (0, executor_1.exec)(logger, exports.aixNodeProcesses);
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
                logger.info({ moduleName, methodName, pidFilePid, linePid }, `Sorry, already running.`);
                return true;
            }
        }
        return false;
    });
}
exports.checkAixProcesses = checkAixProcesses;
function checkFreeBsdProcesses(logger, pidFilePid) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'checkFreeBsdProcesses';
        logger.debug({ moduleName, methodName, pidFilePid }, `Starting...`);
        const runningNodeProcesses = yield (0, executor_1.exec)(logger, exports.freeBsdNodeProcesses);
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
                logger.info({ moduleName, methodName, pidFilePid, linePid }, `Sorry, already running.`);
                return true;
            }
        }
        return false;
    });
}
exports.checkFreeBsdProcesses = checkFreeBsdProcesses;
function checkOpenBsdProcesses(logger, pidFilePid) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'checkOpenBsdProcesses';
        logger.debug({ moduleName, methodName, pidFilePid }, `Starting...`);
        const runningNodeProcesses = yield (0, executor_1.exec)(logger, exports.openBsdNodeProcesses);
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
                logger.info({ moduleName, methodName, pidFilePid, linePid }, `Sorry, already running.`);
                return true;
            }
        }
        return false;
    });
}
exports.checkOpenBsdProcesses = checkOpenBsdProcesses;
function checkUnixProcesses(logger, pidFilePid) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'checkUnixProcesses';
        logger.debug({ moduleName, methodName, pidFilePid }, `Starting...`);
        const runningNodeProcesses = yield (0, executor_1.exec)(logger, exports.unixNodeProcesses);
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
                logger.info({ moduleName, methodName, pidFilePid, linePid }, `Sorry, already running.`);
                return true;
            }
        }
        return false;
    });
}
exports.checkUnixProcesses = checkUnixProcesses;
function checkWindowsProcesses(logger, pidFilePid) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'checkWindowsProcesses';
        logger.debug({ moduleName, methodName, pidFilePid }, `Starting...`);
        const runningNodeProcesses = yield (0, executor_1.exec)(logger, exports.windowsNodeProcesses);
        logger.debug({ moduleName, methodName, runningNodeProcesses });
        const lines = runningNodeProcesses.stdout.split('\n') || [];
        logger.debug({ moduleName, methodName, lines });
        for (const line of lines) {
            logger.debug({ moduleName, methodName, line });
            if (line) {
                const fields = line.split(',');
                if (fields.length > 1) {
                    const linePid = fields[1].slice(1, fields[1].length - 1).trim();
                    logger.debug({ moduleName, methodName, linePid });
                    if (linePid === pidFilePid) {
                        logger.info({ moduleName, methodName, pidFilePid, linePid }, `Sorry, already running.`);
                        return true;
                    }
                }
            }
        }
        return false;
    });
}
exports.checkWindowsProcesses = checkWindowsProcesses;
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
        // darwin, linux, win32
        if (pidFilePid) {
            let alreadyRunning = false;
            switch (process.platform) {
                case 'aix':
                    alreadyRunning = yield checkUnixProcesses(logger, pidFilePid);
                    break;
                case 'darwin':
                    alreadyRunning = yield checkUnixProcesses(logger, pidFilePid);
                    break;
                case 'freebsd':
                    alreadyRunning = yield checkFreeBsdProcesses(logger, pidFilePid);
                    break;
                case 'linux':
                    alreadyRunning = yield checkUnixProcesses(logger, pidFilePid);
                    break;
                case 'openbsd':
                    alreadyRunning = yield checkOpenBsdProcesses(logger, pidFilePid);
                    break;
                case 'sunos':
                    alreadyRunning = yield checkUnixProcesses(logger, pidFilePid);
                    break;
                case 'win32':
                    alreadyRunning = yield checkWindowsProcesses(logger, pidFilePid);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBRTdCLHlDQUFrQztBQUNsQyxxQ0FBcUM7QUFHckMsTUFBTSxVQUFVLEdBQVcsT0FBTyxDQUFDO0FBQ25DLE1BQU0sT0FBTyxHQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBbUIsSUFBSSxHQUFHLENBQUM7QUFFckQsUUFBQSxnQkFBZ0IsR0FBVyw0Q0FBNEMsQ0FBQztBQUN4RSxRQUFBLG9CQUFvQixHQUFXLCtDQUErQyxDQUFDO0FBQy9FLFFBQUEsb0JBQW9CLEdBQVcsK0NBQStDLENBQUM7QUFDL0UsUUFBQSxpQkFBaUIsR0FBVywrQ0FBK0MsQ0FBQztBQUM1RSxRQUFBLG9CQUFvQixHQUFXLGtCQUFrQixDQUFDO0FBRTdELFNBQXNCLGlCQUFpQixDQUFDLE1BQWMsRUFBRSxVQUFrQjs7UUFDekUsTUFBTSxVQUFVLEdBQVcsbUJBQW1CLENBQUM7UUFDL0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFcEUsTUFBTSxvQkFBb0IsR0FBUSxNQUFNLElBQUEsZUFBSSxFQUFDLE1BQU0sRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUUvRCxNQUFNLEtBQUssR0FBYSxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0RSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRWhELE1BQU0sR0FBRyxHQUFXLEtBQUssQ0FB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