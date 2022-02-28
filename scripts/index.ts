import fs from 'fs';
import glob from 'glob';
import path from 'path';
import yargs from 'yargs';

yargs
  .command('flatten', 'Flatten the generated code.', () => {
    const generated = path.resolve(__dirname, '..', 'src', 'generated');
    const globbed = glob.sync('**/*', { cwd: path.join(generated), absolute: true });
    const files = globbed.filter((item: any) => {
      const stats = fs.statSync(item);
      return stats.isFile();
    });

    const directories = globbed.filter((item: any) => {
      const stats = fs.statSync(item);
      return stats.isDirectory();
    });

    files.forEach((item: any) => {
      const to = path.join(generated, path.basename(item));
      fs.renameSync(item, to);
    });

    directories.forEach((item: any) => {
      fs.rmSync(item, { recursive: true, force: true });
    });
  })