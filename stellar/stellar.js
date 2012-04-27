Stellar = {
}

//This will allow us to turn logs off quicker
Stellar.log = function(mesage) {
  if(console && console.log) {
    console.log(message);
  }
}

Stellar.setPage = function(controller, action) {
  Stellar.log('Set page called');
  Stellar.log('Controller: ' + controller);
  Stellar.log('Action: ' + action);
}


Stellar.Collection = function(name) {
  collection = new Meteor.Collection(name);
  if(Meteor.is_server) {
    Meteor.startup(function () {
      _.each(['insert', 'update', 'remove'], function(method) {
        Meteor.default_server.method_handlers['/' + name + '/' + method] = function() {};
      });
    });
  }
  return collection;
}