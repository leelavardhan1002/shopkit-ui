import { spawn } from 'child_process';
import process from 'process';

const buildProcess = spawn(
  'storybook',
  ['build', '-o', 'dist/default', '--debug', '--loglevel', 'verbose'],
  {
    stdio: 'inherit',
    shell: true,
  }
);

buildProcess.on('close', (code) => {
  process.exit(code);
});
