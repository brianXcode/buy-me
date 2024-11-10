// import { ConsoleLogger } from '@nestjs/common';
// import * as fs from 'fs';
// import * as path from 'path';

// export class MyLogger extends ConsoleLogger {
//   private logFilePath: string;

//   constructor() {
//     super();
//     // Define the log file path
//     const logDir = path.join(__dirname, 'logs');
//     if (!fs.existsSync(logDir)) {
//       fs.mkdirSync(logDir); // Create the logs directory if it doesn't exist
//     }
//     this.logFilePath = path.join(logDir, 'error.log');
//   }

//   error(message: any, stack?: string, context?: string) {
//     // Format the log entry with a timestamp, message, context, and stack if available
//     const logEntry = `[${new Date().toISOString()}] [ERROR] ${context || ''} - ${message}\n${
//       stack ? `Stack: ${stack}\n` : ''
//     }`;

//     // Write log entry to the console
//     super.error(...arguments);

//     // Append log entry to the error log file
//     fs.appendFile(this.logFilePath, logEntry, (err) => {
//       if (err) {
//         super.error('Failed to write to log file', err.message);
//       }
//     });
//   }
// }
