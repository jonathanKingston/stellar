Stellar = {};
Stellar._controllers = [];
Stellar.client = {};
Stellar.page = {};

Stellar.client.init = function() {
  if(Meteor.is_client) {
    Stellar.log('Init');
    Session.set('loaded', true);
    Backbone.history.start({pushState: true});
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

Stellar.navigate = function(path, load) {
  Stellar.logPageLoad(path);
  Router.navigate(path, load);
}

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

Stellar.page.set = function(controller, action) {
  Stellar.log('Set page called');
  Stellar.log('Controller: ' + controller);
  Stellar.log('Action: ' + action);
  Stellar.page.controller = controller;
  Stellar.page.action = action;
}

Stellar.Controller = function(name) {
  self = this;
  self.name = name;

  Stellar._controllers.push(self);
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

Stellar.client.init();
