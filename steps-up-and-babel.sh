
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


