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
      Stellar.page.set('home');
    },
    basicPage: function(controller) {
      Stellar.page.set(controller);
    },
    actionPage: function(controller, action) {
      Stellar.page.set(controller, action);
    }
  });
  Router = new StellarRouter;
}