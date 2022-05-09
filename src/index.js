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
exports.unixNodeProcesses = `ps -eo pid,command | grep -e node -e PID | grep -v grep`;
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
        // 2454987 node --max-old-space-size=16384 --unhandled-rejections=strict src/products/index
        const end = lines.length > 0 && lines[0].indexOf('PID') !== -1 ? lines[0].indexOf('PID') + 3 : lines[0].indexOf(' ');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBRTdCLHlDQUFrQztBQUNsQyxxQ0FBcUM7QUFHckMsTUFBTSxVQUFVLEdBQVcsT0FBTyxDQUFDO0FBQ25DLE1BQU0sT0FBTyxHQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBbUIsSUFBSSxHQUFHLENBQUM7QUFFckQsUUFBQSxnQkFBZ0IsR0FBVyw0Q0FBNEMsQ0FBQztBQUN4RSxRQUFBLG9CQUFvQixHQUFXLCtDQUErQyxDQUFDO0FBQy9FLFFBQUEsb0JBQW9CLEdBQVcsK0NBQStDLENBQUM7QUFDL0UsUUFBQSxpQkFBaUIsR0FBVyx5REFBeUQsQ0FBQztBQUN0RixRQUFBLG9CQUFvQixHQUFXLGtCQUFrQixDQUFDO0FBRTdELFNBQXNCLGlCQUFpQixDQUFDLE1BQWMsRUFBRSxVQUFrQjs7UUFDekUsTUFBTSxVQUFVLEdBQVcsbUJBQW1CLENBQUM7UUFDL0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFcEUsTUFBTSxvQkFBb0IsR0FBUSxNQUFNLElBQUEsZUFBSSxFQUFDLE1BQU0sRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUUvRCxNQUFNLEtBQUssR0FBYSxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0RSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRWhELE1BQU0sR0FBRyxHQUFXLEtBQUssQ0FB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