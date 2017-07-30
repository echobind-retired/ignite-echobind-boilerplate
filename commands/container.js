// @cliDescription  Generate a container
// Generates a container with styles and a test

const APP_PATH = process.cwd();

module.exports = async function(context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { parameters, strings, print, ignite } = context;
  const { pascalCase, isBlank } = strings;

  // validation
  if (isBlank(parameters.first)) {
    print.info(`ignite generate container <name>\n`);
    print.info('A name is required.');
    return;
  }

  const name = pascalCase(parameters.first);
  const props = { name };

  // Copies the `container.js.ejs` in your plugin's templates folder
  // into App/container/${name}.js.
  const jobs = [
    {
      template: 'container.js.ejs',
      target: `App/Containers/${name}/index.js`
    },
    {
      template: 'container-style.js.ejs',
      target: `App/Containers/${name}/styles.js`
    },
    {
      template: 'container-test.js.ejs',
      target: `__tests__/Containers/${name}/${name}.test.js`
    }
  ];

  // make the templates and pass in props with the third argument here
  await ignite.copyBatch(context, jobs, props);
};
