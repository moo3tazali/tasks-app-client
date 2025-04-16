import fs from 'fs';
import path from 'path';
import { Plugin } from 'vite';

const includedDirs = [
  'components',
  'utils',
  'hooks',
  'interfaces',
];

const generateIndexFile = (dir: string) => {
  const entries = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  const directFiles = entries
    .filter(
      (entry) =>
        entry.isFile() &&
        (entry.name.endsWith('.ts') ||
          entry.name.endsWith('.tsx')) &&
        entry.name !== 'index.ts'
    )
    .map(
      (entry) =>
        `export * from './${entry.name.replace(/\.tsx?$/, '')}';`
    );

  const subfolderIndexes = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(dir, entry.name, 'index.ts'))
    .filter((indexPath) => fs.existsSync(indexPath))
    .map((indexPath) => {
      const subfolderName = path.basename(
        path.dirname(indexPath)
      );
      return `export * from './${subfolderName}';`;
    });

  const allExports = [...directFiles, ...subfolderIndexes].join(
    '\n'
  );

  if (allExports) {
    fs.writeFileSync(
      path.join(dir, 'index.ts'),
      allExports + '\n',
      'utf8'
    );
  }
};

const scanFolders = () => {
  const srcDir = path.resolve('src');
  includedDirs.forEach((folderName) => {
    const fullPath = path.join(srcDir, folderName);
    if (fs.existsSync(fullPath)) {
      generateIndexFile(fullPath);
    }
  });
};

export function VitePluginGenerateExports(): Plugin {
  return {
    name: 'vite-plugin-generate-exports',
    apply: 'serve',
    buildStart() {
      scanFolders();
    },
    handleHotUpdate({ file }) {
      const srcPath = path.resolve('src');

      if (
        (file.endsWith('.tsx') || file.endsWith('.ts')) &&
        file.startsWith(srcPath)
      ) {
        const relativePath = path.relative(srcPath, file);
        const parts = relativePath.split(path.sep);
        const topFolder = parts[0];

        if (includedDirs.includes(topFolder)) {
          const folderPath = path.join(srcPath, topFolder);
          generateIndexFile(folderPath);
        }
      }
    },
  };
}
