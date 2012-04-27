Stellar = {};
Stellar._controllers = {};
Stellar.client = {};
Stellar.page = {};
Stellar.loaded = false;

Stellar.client.init = function() {
  if(Meteor.is_client) {
    //Call controllers when everything exists
    Stellar.page.call();

    Stellar.log('Init');
    Stellar.loaded = true;
    Meteor.startup(function() {
      Stellar.client.linkHandler();
    });
  }
}

Stellar.client.linkHandler = function() {
  $('body').on('click', 'a', function(e){
    link = $(this).attr('href');
    //TODO decide what links should use this function
    if(!link.match(/^http:\/\/www\./)) {
      e.preventDefault();
      Stellar.navigate(link, true);
      Stellar.log('Link clicked');
    }
  });
}

Stellar.client.registerHelper = function(name, func) {
  if(Meteor.is_client) {
    Handlebars.registerHelper(name, func);;
  }
};

Stellar.navigate = function(path, load) {
  Stellar.logPageLoad(path);
  Router.navigate(path, load);
}

Stellar.render = function(template, properties) {
  Stellar.log('Render called: ' + template);
  if(properties) {
    _.each(properties, function(property, key) {
      Stellar.log(key);
      Stellar.log(property);
      Template[template][key] = property;
    });
  }
  Session.set('stellar_new_page', template);
};

Stellar.logPageLoad = function(path) {
//TODO make this an event where a analytics extension can hook in instead
//  if(Stellar.analytics) {
//    Stellar.log('log page'+path);
//    Stellar.analytics.push(['_trackPageview', path]);
//  }
}

//This will allow us to turn logs off quicker
Stellar.log = function(message) {
  if(console && console.log) {
    console.log(message);
  }
}

Stellar.Controller = function(name) {
  self = this;

  Stellar._controllers[name] = self;
};

Stellar.Collection = function(name, manager, driver) {
  collection = new Meteor.Collection(name, manager, driver);
  if(Meteor.is_server) {
    Meteor.startup(function () {
      _.each(['insert', 'update', 'remove'], function(method) {
        Meteor.default_server.method_handlers['/' + name + '/' + method] = function() {};
      });
    });
  }
  return collection;
};

Stellar.page.set = function(controller, action) {
  Stellar.log('Set page called');
  Stellar.log('Controller: ' + controller);
  Stellar.log('Action: ' + action);
  Stellar.page.controller = controller;
  if(!action) {
    action = 'index';
  }
  Stellar.page.action = action;
};

Stellar.page.call = function() {  
  Stellar.log(Stellar._controllers[Stellar.page.controller.toString()]);
  Stellar.log(Stellar.page.controller);
  if(Stellar._controllers[Stellar.page.controller]) { //TODO fix missing error
    controllerObj = Stellar._controllers[Stellar.page.controller];
    Stellar.log(controllerObj);
    if(controllerObj[Stellar.page.action]) {
      controllerObj[Stellar.page.action]();
    }
  }
};

Stellar.client.registerHelper('stellar_page', function() {
  Stellar.log('Content helper');
  Session.get('stellar_new_page');

  if(Stellar.loaded) {
    //Stupid issue of home page not rendering, will refactor below to use this instead of equals
    Stellar.log(Session.get('stellar_new_page'));
    if(Template[Session.get('stellar_new_page')]) {
      console.log('Load new page');
      return Meteor.ui.chunk(function() { return Template[Session.get('stellar_new_page')]();});
    } else {
      Stellar.log('404!'); //TODO
    }
    return '';
  }
  Stellar.log('Show nowt');
  return '';
});

if(Meteor.is_client) {
  //This needs to be called so all the controllers are initialised
  $(window).load(function() {
    Stellar.client.init();
  });
  Backbone.history.start({pushState: true});
}