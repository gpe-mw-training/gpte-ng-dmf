#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ejs = require('ejs');

const environmentFilesDirectory = path.join(__dirname, './src/environments');
const targetEnvironmentTemplateFileName = 'environment.prod.ts.template';
const targetEnvironmentFileName = 'environment.prod.ts';

// Define default values in case there are no defined ones,
// but you should define only non-crucial values here,
// because build should fail if you don't provide the correct values
// for your production environment
const defaultEnvValues = {
    REST_API_URL: 'http://demo-kieserver-dm-dtf.apps.dev37.openshift.opentlc.com/',
    REST_API_USER: 'adminUser',
    REST_API_PWD: 'test1234!',
};

// Load template file
const environmentTemplate = fs.readFileSync(
  path.join(environmentFilesDirectory, targetEnvironmentTemplateFileName),
  {encoding: 'utf-8'}
);

// Generate output data
const output = ejs.render(environmentTemplate, Object.assign({}, defaultEnvValues, process.env));
// Write environment file
fs.writeFileSync(path.join(environmentFilesDirectory, targetEnvironmentFileName), output);

console.log("Written to file:" + output);
console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
console.log("REST URL:" + process.env.REST_API_URL);
console.log("REST USER:" + process.env.REST_API_USER);
console.log("REST PASSWORD:" + process.env.REST_API_PWD);
process.exit(0);