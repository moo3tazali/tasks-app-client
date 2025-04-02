import fs from 'fs';
import path from 'path';
import { Plugin } from 'vite';

const generateIndexFile = (dir: string) => {
  const files = fs
    .readdirSync(dir)
    .filter(
      (file) => file.endsWith('.tsx') && file !== 'index.ts'
    );

  const exports = files
    .map(
      (file) =>
        `export * from './${file.replace('.tsx', '')}';`
    )
    .join('\n');

  if (exports) {
    fs.writeFileSync(
      path.join(dir, 'index.ts'),
      exports + '\n',
      'utf8'
    );
  }
};

const scanFolders = (baseDir: string) => {
  fs.readdirSync(baseDir, { withFileTypes: true }).forEach(
    (dir) => {
      if (dir.isDirectory()) {
        generateIndexFile(path.join(baseDir, dir.name));
      }
    }
  );
};

export function VitePluginGenerateExports(): Plugin {
  return {
    name: 'vite-plugin-generate-exports',
    apply: 'serve', // يعمل فقط أثناء التطوير
    buildStart() {
      const componentsDir = path.resolve('src/components');
      if (fs.existsSync(componentsDir)) {
        scanFolders(componentsDir);
      }
    },
    handleHotUpdate({ file }) {
      if (
        file.endsWith('.tsx') &&
        file.includes('/src/components/')
      ) {
        generateIndexFile(path.dirname(file));
      }
    },
  };
}
