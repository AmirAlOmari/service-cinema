// eslint-disable-next-line import/no-extraneous-dependencies
const glob = require('glob');
const fs = require('fs').promises;

module.exports.lint = async function lint(modulesPath = 'src/modules/') {
  const allBoundedContexts = await fs.readdir(modulesPath);

  const promise = () => {
    const errors = [];

    return new Promise((resolve, reject) => {
      glob(`${modulesPath}**/*.ts`, {}, async (error, files) => {
        if (error) {
          reject(error);
        }

        // eslint-disable-next-line no-restricted-syntax
        for (const file of files) {
          const currentBoundedContext = file.split(modulesPath)[1].split('/')[0];
          const allOtherBoundedContexts = getOtherBoundedContexts(
            allBoundedContexts,
            currentBoundedContext,
          );

          // eslint-disable-next-line no-await-in-loop
          const importLines = await getImportLines(file);

          importLines.reduce((acc, line) => {
            // Lines that does not use aliases
            if (line.match(new RegExp('src/'))) {
              acc.push({
                file,
                line,
                boundedContext: currentBoundedContext,
              });

              return acc;
            }

            allOtherBoundedContexts.forEach((boundedContext) => {
              // Cross bounded context import
              if (
                line.match(new RegExp(`@${boundedContext}`)) ||
                line.match(new RegExp(`\\.\\.(?:.*)\\/${boundedContext}`))
              ) {
                acc.push({
                  file,
                  line,
                  boundedContext: currentBoundedContext,
                });
              }
            });

            return acc;
          }, errors);
        }

        resolve(errors);
      });
    });
  };

  const errors = await promise();

  if (errors.length) {
    console.log('Bounded contexts isolation not respected', errors);

    process.exit(1);
  }
};

async function getImportLines(filePath) {
  const fileContent = await fs.readFile(filePath, 'utf-8');

  return fileContent.match(/(^import.*)/gm) || [];
}

function getOtherBoundedContexts(allBoundedContexts, currentBoundedContext) {
  const index = allBoundedContexts.indexOf(currentBoundedContext);

  if (index === -1) {
    return [];
  }

  // eslint-disable-next-line id-length
  return allBoundedContexts.filter((_, i) => i !== index);
}
