Stellar
=======

Just a test at the moment, it should help you build more advanced Meteor apps faster.

To use
------

To use this code copy the stellar directory into your meteor folder package folder.
Then use:

    meteor add stellar

Example
-------

Code sample:

    Posts = new Stellar.Collection('posts');

    HomeController = new Stellar.Controller('home');
    HomeController.index = function() {
      Stellar.render('hello', {greeting: 'Welcome home son'});
    }

    NewPageController = new Stellar.Controller('new_page');
    NewPageController.index = function() {
      Stellar.render('hello', {greeting: 'Welcome home girl'});
    }


This code above sets up seperate controllers `home` and `new_page` these also have an action.
Clicking /new_page/ will show the new page controller.
The Posts collection doesn't have any client side helpers so is secure straight away.


To use the functionality of above your template must look like:

    <head>
      <title>App name</title>
    </head>

    <body>
      {{#stellar_page}}{{/stellar_page}}
    </body>

    <template name="hello">
      <div class="hello">
        <h1>Oh Stellar!</h1>
        {{greeting}}
        <a href="/home/new_page/">New page</a>
      </div>
    </template>


For a working code version of this example visit: [Interstellar](https://github.com/jonathanKingston/interstellar)


Session Usage
=============
This is a little more complex and you need to be carefull to keep this secure. Because of Meteor not being able to directly set cookies on the client side this needs to be done in several stages.


There are 4 helper functions:
Server side:
Stellar.session.get
Stellar.session.set

Client side:
Stellar.session.getKey
Stellar.session.updateKey


Get and set, do what you would expect and set and get the content of the session.
These methods should be used in a login function like so:

    Meteor.methods({
      login: doLogin
    });
    function doLogin(username, password) {
      if(username && password == valid) { //psudocode
        key = Stellar.session.set(userObject);
        return {key: key}
      }
    }



Then on the client side you then need to updateKey and getKey in a similar way. So all my methods needing a logged in user pass the key stored on the client side.