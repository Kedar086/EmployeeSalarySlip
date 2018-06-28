# Payslip-Generator
======================================

Required Version
node - >=v8.11.2
npm - 5.6.0

### introduction

Payslip-Generator, it allows generation of payslip of employee for specific month :


## API

### Employee management api

 ## generate Payslip         
 * POST  /api/payslip ->  `Body parameter` content-type will be `application/x-www-form-urlencoded`
 	- fname
 	- lname        
 	- salary        
 	- srate
 	- date        
```

### How to run

Run following commands

<pre>
	<code>
	git clone https://github.com/Kedar086/Payslip-Generator
	npm install
	bower install
    Start the Project 
    node server/app.js by default run on development
	</code>
</pre>




## Environment variables
Environment variables is the main mechanism of manipulating application settings. Currently application recognizes
following environment variables:

| Variable             | Default value | Description              |
| -------------------- | ------------- | ------------------------ |
| IP                   | 0.0.0.0       | Address to listen on     |
| PORT                 | 9000          | Port to listen on        |
| NODE_ENV             | development   | Application Enviroment   |

### Command to run in different Enviroment

```js
// in Production
NODE_ENV=production node server/app.js

// in development
NODE_ENV=development PORT=9000 node server/app.js

// in testing
NODE_ENV=testing PORT=9000 node server/app.js

```
### Project Structure

Overview

```
├── client
│   ├── app                 - All of our app specific components go in here
│   ├── components          - Our reusable components, non-specific to to our app
│   
│
├
└── server
    ├── api                 - Our apps server api
    ├── components          - Our reusable or app-wide components
    ├── config              - Where we do the bulk of our apps configuration
    │   └── local.env.js    - Keep our environment variables out of source control
    │   └── environment     - Configuration specific to the node environment
    └── views               - Server rendered views
```

An example client component in client/app

```
payslip
├── payslip.js                 - Routes
├── payslip.controller.js      - Controller for our payslip route
├── payslip.html               - View

```

