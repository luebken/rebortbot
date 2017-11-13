
Using up and babel:
----

# Cleanup
cd src
rm -rf ../lib/*

# Copy package.json etc. to lib/
cp package.json app.js private-key.pem up.json ../lib/
# npm install. improve by just using --production?
cd ../lib
npm install

# transpile probot
cd ../src
rm -rf ../lib/node_modules/probot/
babel node_modules/probot/ -d ../lib/node_modules/probot/ --copy-files

# transpile app.js
babel app.js -d ../lib/

# patch
../lib/node_modules/probot/bin/probot-run.js
and add
````
//require("babel-core/register");
require("babel-polyfill");
````

# patch 2
../lib/node_modules/.bin/probot
remove semver check

# test
cd ../lib/
npm start


robot.js
                github = new GitHubApi({ debug: process.env.LOG_LEVEL === 'trace' });


---
up.json:
{
  "name": "reportbot",
  "environment": {
    "APP_ID": "",
    "WEBHOOK_SECRET": "",
    "PRIVATE_KEY_PATH": "./private-key.pem",
    "DISABLE_TUNNEL": "true"
  }
}


.babelrc:
{
  //"plugins": [
  //  "transform-async-to-generator"
  //],
  "presets": [
    "es2015",
    "stage-0"
  ]
}

package.json:
{
  "name": "reportbot",
  "version": "0.0.1",
  "description": "Collects metrics over time and reports that somewhere else.",
  "main": "app.js",
  "scripts": {
    "start": "probot run ./app.js",
    "test": "jest && standard"
  },
  "dependencies": {
    "probot": "^3.0.0"
  },
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-plugin-transform-async-to-generator": "^6.24.1",
    "babel-polyfill": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-node6": "^11.0.0",
    "babel-preset-stage-0": "^6.24.1",
    "jest": "^21.2.1",
    "localtunnel": "^1.8.2",
    "standard": "^10.0.3"
  },
  "standard": {
    "env": [
      "jest"
    ]
  }
}

