module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|@unimodules/.*|unimodules|sentry-expo|native-base)"
  ]
};