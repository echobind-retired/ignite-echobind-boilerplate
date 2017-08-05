// @cliDescription  Generate a Component
// Generates a Component with styles and a test

module.exports = async function(context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { parameters, strings, print, ignite } = context;
  const { pascalCase, isBlank } = strings;

  // validation
  if (isBlank(parameters.first)) {
    print.info(`ignite generate component <name>\n`);
    print.info('A name is required.');
    return;
  }

  const name = pascalCase(parameters.first);
  const props = { name };

  // Copies the `component.js.ejs` in your plugin's templates folder
  // into App/Components/${name}.js.
  const jobs = [
    {
      template: 'component.js.ejs',
      target: `App/Components/${name}/index.js`
    },
    {
      template: 'component-style.js.ejs',
      target: `App/Components/${name}/styles.js`
    },
    {
      template: 'component-test.js.ejs',
      target: `__tests__/Components/${name}/${name}.test.js`
    }
  ];

  // make the templates and pass in props with the third argument here
  await ignite.copyBatch(context, jobs, props);
};
