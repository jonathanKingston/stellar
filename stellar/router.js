if(Meteor.is_client) {
  StellarRouter = Backbone.Router.extend({
    routes: {
      ":controller/:action": "actionPage",
      ":contoller/:action/": "actionPage",
      "/": "homePage",
      "": "homePage",
      ":controller": "basicPage",
      ":controller/": "basicPage",
    },
    homePage: function() {
      Stellar.setPage('home');
    },
    basicPage: function(controller) {
      Stellar.setPage(controller);
    },
    actionPage: function(controller, action) {
      Stellar.setPage(controller, action);
    }
  });
  Router = new StellarRouter;
}