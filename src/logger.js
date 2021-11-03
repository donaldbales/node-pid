"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = void 0;
const bunyan = require("bunyan");
let logger = null;
const moduleName = 'logger';
function getLogger(name) {
    if (!logger) {
        logger = bunyan.createLogger({ name });
    }
    return logger;
}
exports.getLogger = getLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUlqQyxJQUFJLE1BQU0sR0FBUSxJQUFJLENBQUM7QUFDdkIsTUFBTSxVQUFVLEdBQVcsUUFBUSxDQUFDO0FBRXBDLFNBQWdCLFNBQVMsQ0FBQyxJQUFZO0lBQ3BDLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDWCxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7S0FDeEM7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBTkQsOEJBTUMifQ==