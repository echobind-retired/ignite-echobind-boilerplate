const options = require('./options');

/**
 * This file provides an `install` function that should install React Native,
 * copy over any folders and template files, and install any desired plugins.
 * 
 * It's a simpler version of the one found in https://github.com/infinitered/ignite-ir-boilerplate.
 * Refer to that one to see a more full featured example of what you can do.
 * 
 */

const REACT_NATIVE_VERSION = '0.45.1';

/**
 * Let's install.
 *
 * @param {any} context - The gluegun context. Docs: https://infinitered.github.io/gluegun/#/context-api.md
 */
async function install(context) {
  const APP_PATH = process.cwd();
  const PLUGIN_PATH = __dirname;

  const {
    filesystem,
    parameters,
    ignite,
    reactNative,
    print,
    system,
    prompt
  } = context;

  const name = parameters.third;
  const spinner = print
    .spin(`using the ${print.colors.cyan('Echobind')} boilerplate`)
    .succeed();

  // attempt to install React Native or die trying
  // this will also chdir into the new directory
  const rnInstall = await reactNative.install({
    name,
    version: REACT_NATIVE_VERSION
  });
  if (rnInstall.exitCode > 0) {
    process.exit(rnInstall.exitCode);
  }

  ///// COPY FILES /////
  filesystem.remove('__tests__');

  // App
  spinner.text = '▸ copying files';
  spinner.start();
  filesystem.copy(`${PLUGIN_PATH}/boilerplate/App`, `${APP_PATH}/App`, {
    overwrite: true
  });

  // tests
  filesystem.copy(
    `${PLUGIN_PATH}/boilerplate/__tests__`,
    `${APP_PATH}/__tests__`,
    {
      overwrite: true
    }
  );

  // mocks
  filesystem.copy(
    `${PLUGIN_PATH}/boilerplate/__mocks__`,
    `${APP_PATH}/__mocks__`,
    {
      overwrite: true
    }
  );
  spinner.stop();

  ///// PROMPT USER FOR EXTRA LIBS /////
  // --max, --min, interactive
  let answers;
  if (parameters.options.max) {
    answers = options.answers.max;
  } else if (parameters.options.min) {
    answers = options.answers.min;
  } else {
    answers = await prompt.ask(options.questions);
  }
  print.info('▸ Thanks for the answers. We dont have this part done yet.');

  ///// GENERATE FILES FROM TEMPLATES /////
  spinner.text = '▸ generating files';
  spinner.start();
  const templates = [
    { template: 'index.js.ejs', target: 'index.ios.js' },
    { template: 'index.js.ejs', target: 'index.android.js' },
    { template: 'ignite/ignite.json', target: 'ignite/ignite.json' }
  ];
  await ignite.copyBatch(
    context,
    templates,
    { name: name },
    {
      quiet: true,
      directory: `${PLUGIN_PATH}/boilerplate`
    }
  );
  spinner.stop();

  ///// NPM INSTALL /////
  spinner.text = '▸ installing ignite dependencies';
  spinner.start();
  await system.run('npm i');
  spinner.stop();

  ///// REACT NATIVE LINK /////
  // must use spawn & stdio: ignore or it hangs!! :(
  spinner.text = `▸ linking native libraries`;
  spinner.start();
  await system.spawn('react-native link', { stdio: 'ignore' });
  spinner.stop();

  ///// IGNITE PLUGINS /////
  // install any plugins, including ourselves if we have generators.
  // please note you should always do `stdio: 'inherit'` or it'll hang

  try {
    // pass along the debug flag if we're running in that mode
    const debugFlag = parameters.options.debug ? '--debug' : '';

    await system.spawn(`ignite add ${__dirname} ${debugFlag}`, {
      stdio: 'inherit'
    });

    // example of another plugin you could install
    // await system.spawn(`ignite add i18n ${debugFlag}`, { stdio: 'inherit' })
  } catch (e) {
    ignite.log(e);
    throw e;
  }

  ///// GIT /////
  const gitExists = await filesystem.exists('.git');
  if (!gitExists && !parameters.options['skip-git'] && system.which('git')) {
    spinner.text = 'setting up git';
    spinner.start();
    await system.run(
      'git init . && git add . && git commit -m "Generate new RN project with ignite-echobind-boilerplate."'
    );
    spinner.succeed();
  }

  ///// CHECK ANDROID INSTALL /////
  const androidInfo = isAndroidInstalled(context)
    ? ''
    : `\n\nTo run in Android, make sure you've followed the latest react-native setup instructions at https://facebook.github.io/react-native/docs/getting-started.html before using ignite.\nYou won't be able to run ${bold(
        'react-native run-android'
      )} successfully until you have.`;

  ///// SUCCESS! /////
  print.info('');
  print.info('🚀 Installed!');
  print.info('');
  print.info(print.colors.yellow(`  cd ${name}`));
  print.info(print.colors.yellow('  react-native run-ios'));
  print.info(print.colors.yellow('  react-native run-android'));
  print.info('');
}

/**
 * Is Android installed?
 *
 * $ANDROID_HOME/tools folder has to exist.
 *
 * @param {*} context - The gluegun context.
 * @returns {boolean}
 */
const isAndroidInstalled = function(context) {
  const androidHome = process.env['ANDROID_HOME'];
  const hasAndroidEnv = !context.strings.isBlank(androidHome);
  const hasAndroid =
    hasAndroidEnv &&
    context.filesystem.exists(`${androidHome}/tools`) === 'dir';

  return Boolean(hasAndroid);
};

module.exports = { install };
