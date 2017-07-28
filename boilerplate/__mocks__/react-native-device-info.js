'use strict';

const reactNativeDeviceInfo = jest.genMockFromModule(
  'react-native-device-info'
);

reactNativeDeviceInfo.getUniqueID = jest.fn();

module.exports = reactNativeDeviceInfo;
