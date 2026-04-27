import { spawn } from 'child_process';
import os from 'os';

const pnpm = os.platform() === 'win32' ? 'pnpm.cmd' : 'pnpm';

const server = spawn(pnpm, ['run', 'dev:server'], { stdio: ['ignore', 'inherit', 'inherit'] });
const metro = spawn(pnpm, ['run', 'dev:metro'], { stdio: 'inherit' });

const cleanup = () => {
  server.kill('SIGINT');
  metro.kill('SIGINT');
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

server.on('exit', (code) => {
  if (code !== null) process.exit(code);
});

metro.on('exit', (code) => {
  if (code !== null) process.exit(code);
});
