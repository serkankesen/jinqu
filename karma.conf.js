const browsers = process.platform === "win32"
    ? ["ChromeHeadless", "FirefoxHeadless", "IE"]
    : ["ChromeHeadless", "FirefoxHeadless"];

module.exports = function (config) {
    config.set({
        frameworks: ["mocha", "chai-as-promised", "chai", "karma-typescript"],

        files: [
            "test/shim.ts",
            "index.ts",
            {
                pattern: "lib/**/*.ts"
            },
            {
                pattern: "test/**/*.ts"
            }
        ],

        preprocessors: {
            "**/*.ts": ["karma-typescript"]
        },

        karmaTypescriptConfig: {
            tsconfig: "tsconfig.json",
            include: [
                "./index.ts",
                "./lib/**/*.ts",
                "./test/**/*.ts"
            ]
        },
        
        reporters: ["dots", "karma-typescript"],

        browsers,

        singleRun: true
    });
};