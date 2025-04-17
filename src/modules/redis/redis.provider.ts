// import { Injectable } from '@nestjs/common';
// import Redis from 'ioredis';

// @Injectable()
// export class RedisProvider extends Redis {
//   constructor() {
//     super();
//     const logMessage = (message: string) => {
//       const timestamp = new Date().toLocaleString();
//       console.log(
//         `\x1b[32m[Nest] ${process.pid}  - ${timestamp}   \x1b[0m\x1b[33m   LOG\x1b[0m \x1b[36m[RedisProvider]\x1b[0m \x1b[37m${message}\x1b[0m`,
//       );
//     };

//     super.on('error', (err) => {
//       logMessage(`Redis error: ${err}`);
//     });

//     super.on('connect', () => {
//       logMessage('Redis connected');
//     });

//     super.on('ready', () => {
//       logMessage('Redis ready');
//     });
//   }
// }
