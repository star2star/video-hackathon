Star2Star Native Web Starter Kit
=========================
TODO - update this document!!!!!

This native web starter kit provides a skeleton structure that can be built upon to create a React Native application.  
Initially this uses only react-native-web, which transpiles react native elements into DOM elements so they can be
viewed in web browser.  

This starter kit is a work in progress and will be updated frequently.

Downloading and Installing the Star2Star Web Starter Kit
--------------------------------------------------------

To download the compressed starter kit, from terminal command line:

```sh
  $ curl -u username:password -G https://npm-registry.star2star.com/star2star-native-web-starter-kit/-/star2star-native-web-starter-kit-0.0.1.tgz -s -o s2s-native-web-starter.tgz
```

To uncompress and expand the archive file:

```sh
  $ tar xvf s2s-native-web-starter.tgz --strip-component 1
```

This will download the compressed web starter kit. Extracting the files from this compressed package file will create a 'package' folder containing the file structure for the web starter kit. This folder can be moved or renamed appropriately for the project to be implemented.

Be sure to change username:password to YOUR username and password for the Star2Star npm-registry.

Project Structure
-----------------

-	**Root**

	-	package.json

	> This file holds various metadata relevant to the project. This file is used to give information to npm that allows it to identify the project as well as handle project dependencies.

	You need to change the package.json file so that 'name' is the name of your application, and the build script is updated to the correct application name.

	-	webpack.config.js > Configuration file that drives webpack functionality.

	-	README.md > This file.

-	**3rd-party** > Put any 3rd party libraries to be used by the app in here

	-	strophe.js

-	**assets**

	-	images

-	**dist** > Output from npm run build

-	**node_modules**

-	**src**

	-	action-creators/ > This folder contains the action creators for the app. Each file should contain the action creators for a specific store element. For example, the app-action-creators.js file would contain action creators for the app store element. When a new action-creator file is added, it must also be added to the action-creators.js file which aggregates all action creators for the application

	-	action-creators/index.js > Aggregator for action-creators.

	-	components/ > Application specific pure components that do not need access to store data. The sample files here are used by the alert system implemented in s2s-app-service.

	-	alertItem.js

	-	alertList.js

	-	alertLog.js

	-	index.html > This file contains the HTML that the application will be rendered.

	-	index.js > This file is the main script file for the application. It sets up the routes, initializes the store, and connects to AppService.

	-	root.js > This file

	-	js > This folder contains a few utility modules that support white labeling and internationalization.

	-	messages.js > This module aggregates the messages for the application based on the locale setting. Default setting is 'en' (US English). The strings come from the locales/ folder for the locales supported.

	-	whitelabel.js > This module returns the value from the whitelabelData.js file matching a passed in whitelabel key. This allows branding to be removed and replaced by the whitelabel value. For example, so that Star2Star can be replaced another partner name (i.e. My Partner), an entry into whitelabelData would be "companyName": "My Partner", and wherever the company name is used in the app, you would use WhiteLabel.get("companyName") to use the appropriate string.

	-	whitelabelData.js > This file contains JSON object with whitelabel keys and values.

	-	locales/ > This folder contains all locale files for the supported languages. Each locale file exports a JSON object (messages) consisting of key/ value pairs where the value is the string to be used for that locale.

	-	locale-xx.js

	-	reducers/ > This folder contains the reducers for the app. Each file should contain the reducers for a specific store element. For example, the app-reducer.js file would contain reducers for the app store element. When a new reducer file is added, it must also be added to the reducers.js file which aggregates all reducers for the application

	-	alerts-reducer.js

	-	app-reducer.js

	-	reducers/index.js > Aggregator for reducers.

	-	routes/ > This folder contains the components rendered when traversing the routes defined in index.js. These components will typically access the store and be composed of other pure components that receive their props from the route components. The Main component (main.js) contains code that accesses the store using 'connect' from react-redux.

	-	about.js

	-	login.js

	-	main.js

	-	tests > This folder contains static test code for Jest@13.2.3 as well as (in the specs/ folder) as well as code for rendered UI tests (using ui-harness@3.17.1)  
		> Refer to Jest documentation at https://facebook.github.io/jest/ > Refer to UI-Harness documentation at https://github.com/philcockfield/ui-harness

	-	alertLog-test.js

	-	settings-test.js

	-	specs/

		-	alertLog-test.js
		-	settings-test.js
		-	index.js

	-	themes

	-	theme-styles.js

Usage
-----

To run the limited functionality of the web starter kit you must perform the following:

1.	From command prompt in the project root (where package.json file is located)

```sh
  $ npm install
```

to install the node modules that the application requires.

1.	Build and run the application:

```sh
  $ npm start
```

The application will be running on localhost:8080. Navigate there using your browser (Chrome is recommended).

This will allow you to traverse the sample routes implemented in the web starter kit. If you plan on utilizing AppService to connect to the API-v5 and/or XMPP then you will need to provide an 'app key' and 'private key' for authentication to Star2Star to utilize those services.

**The app keys are located in the src/index.js file in the AppServices section, currently at line 89.**

Internationalization
--------------------

Internationalization is implemented using Yahoo React-Intl for strings and moment.js for calendar.

Refer to https://github.com/yahoo/react-intl and http://momentjs.com/

Theming
-------

TBD - Use of theming documentation will be added at a later date.

TODO
----

Complete the Theming section

History
-------

#### 10/27/2017 - Version 1.0.0

-	Initial release


License
-------

[MIT License](http://opensource.org/licenses/MIT)
