module.exports = {
  preset: "jest-expo",

  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)"], // Test dosyalarını tanımlayın
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@testing-library|expo|@expo)",
  ],
};
