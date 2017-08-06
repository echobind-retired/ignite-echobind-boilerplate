// Ignite CLI plugin for EchobindBoilerplate
// ----------------------------------------------------------------------------

const PLUGIN_PATH = __dirname;
const APP_PATH = process.cwd();

// NOTE: This wack indenting is to make it look right in the final package.json
const NPM_SCRIPTS = `"test": "jest",
          "test:watch": "jest --watch",
          "test:coverage": "jest --coverage",
          "clean": "rm -rf $TMPDIR/react-* && watchman watch-del-all && npm cache clean --force",
          "clean:android": "cd android/ && ./gradlew clean && cd .. && react-native run-android",
          "newclear": "rm -rf $TMPDIR/react-* && watchman watch-del-all && rm -rf ios/build && rm -rf node_modules/ && npm cache clean --force && npm i",
          "android:build": "cd android && ./gradlew assembleRelease",
          "android:install": "cd android && ./gradlew assembleRelease && ./gradlew installRelease",
          "android:devices": "$ANDROID_HOME/platform-tools/adb devices",
          "precommit": "lint-staged"`;

const add = async function(context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { ignite, filesystem } = context;

  // install an NPM module and link it
  await ignite.addModule('react-native-config', {
    link: true,
    version: '^0.2.1'
  });
  await ignite.addModule('react-native-device-info', {
    link: true,
    version: '^0.10.0'
  });
  await ignite.addModule('react-navigation', {
    link: true,
    version: '^1.0.0-beta.7'
  });

  // dev dependencies
  await ignite.addModule('husky', { dev: true, version: '^0.13.4' });
  await ignite.addModule('lint-staged', { dev: true, version: '^3.6.1' });
  await ignite.addModule('prettier-eslint-cli', {
    dev: true,
    version: '^4.1.0'
  });
  await ignite.addModule('babel-eslint', { dev: true, version: '^7.2.3' });
  await ignite.addModule('eslint-plugin-react', {
    dev: true,
    version: '^7.1.0'
  });
  await ignite.addModule('eslint-plugin-react-native', {
    dev: true,
    version: '^2.3.2'
  });

  // Example of copying templates/EchobindBoilerplate to App/EchobindBoilerplate
  // if (!filesystem.exists(`${APP_PATH}/App/EchobindBoilerplate`)) {
  //   filesystem.copy(`${PLUGIN_PATH}/templates/EchobindBoilerplate`, `${APP_PATH}/App/EchobindBoilerplate`)
  // }

  // Example of patching a file
  // ignite.patchInFile(`${APP_PATH}/App/Config/AppConfig.js`, {
  //   insert: `import '../EchobindBoilerplate/EchobindBoilerplate'\n`,
  //   before: `export default {`
  // })
  ignite.patchInFile(`${APP_PATH}/package.json`, {
    insert: NPM_SCRIPTS,
    replace: '"test": "jest"'
  });

  // "test": "jest"
};

/**
 * Remove yourself from the project.
 */
const remove = async function(context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { ignite, filesystem } = context;

  // remove the npm module and unlink it
  await ignite.removeModule('react-native-config', { unlink: true });
  await ignite.removeModule('react-native-device-info', { unlink: true });
  await ignite.removeModule('react-navigation', { unlink: true });

  await ignite.removeModule('husky');
  await ignite.removeModule('lint-staged');
  await ignite.removeModule('prettier-eslint-cli');

  // Example of removing App/EchobindBoilerplate folder
  // const removeEchobindBoilerplate = await context.prompt.confirm(
  //   'Do you want to remove App/EchobindBoilerplate?'
  // )
  // if (removeEchobindBoilerplate) { filesystem.remove(`${APP_PATH}/App/EchobindBoilerplate`) }

  // Example of unpatching a file
  // ignite.patchInFile(`${APP_PATH}/App/Config/AppConfig.js`, {
  //   delete: `import '../EchobindBoilerplate/EchobindBoilerplate'\n`
  // )
};

// Required in all Ignite CLI plugins
module.exports = { add, remove };
