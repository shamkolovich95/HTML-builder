const path = require('path');
const fs = require('fs');

fs.rm(
  path.join(__dirname, 'project-dist'),
  { recursive: true },
  () => {
    createDirectory();
  },
);

function createDirectory() {
  fs.promises
    .mkdir(
      path.join(__dirname, 'project-dist'),
      { recursive: true, force: true },
    )
    .then(
      fs.promises.copyFile(
        path.join(__dirname, 'template.html'),
        path.join(__dirname, 'project-dist', 'index.html'),
      ),
      fs.promises.writeFile(
        path.join(__dirname, 'project-dist', 'style.css'),
        '',
      ),
      fs.promises.mkdir(
        path.join(__dirname, 'project-dist', 'assets'),
        { recursive: true, force: true },
      ),
    )
    .then(
      createHtml(),
      createCss(),
      createAssets(),
    );
}

async function createHtml() {
  let template = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf8');
  const components = await fs.promises.readdir(path.join(__dirname, 'components'), 'utf8');

  for (let component of components) {

    if (template.includes(component.split('.')[0])) {
      const comp = await fs.promises.readFile(path.join(__dirname, 'components', component));
      template = template.replace(`{{${component.split('.')[0]}}}`, comp);
    }

  }

  await fs.promises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template);
}

async function createCss() {
  const styles = await fs.promises.readdir(path.join(__dirname, 'styles'), 'utf8');

  if (!styles) return;

  for (let file of styles) {
    const style = await fs.promises.readFile(path.join(__dirname, 'styles', file), 'utf8');
    await fs.promises.appendFile(path.join(__dirname, 'project-dist', 'style.css'), `${style}\n\n`);
  }
}

async function createAssets() {
  const assets = await fs.promises.readdir(path.join(__dirname, 'assets'));

  if (!assets) return;

  for (let asset of assets) {
    const directory = await fs.promises.stat(path.join(__dirname, 'assets', asset))

    if (directory.isDirectory) {

      await fs.promises.mkdir(
        path.join(__dirname, 'project-dist/assets', asset),
        { recursive: true, force: true },
      )

      const files = await fs.promises.readdir(path.join(__dirname, 'assets', asset));

      if (!files) break;

      for (let file of files) {
        await fs.promises.copyFile(
          path.join(__dirname, 'assets', asset, file),
          path.join(__dirname, 'project-dist/assets', asset, file),
        )
      }
    }
  }
}
