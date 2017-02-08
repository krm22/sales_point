((app)=>{

   'use strict'

   app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
   function($locationProvider, $stateProvider, $urlRouterProvider){
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('product', {
                    templateUrl: `js/components/common/dashboard.html`,
                    url: '',
                    abstract: true
                })
                .state('product.list', {
                    url: '/',
                    template: '<products-list></products-list>'
                })
                .state('product.new', {
                    template: '<add-products></add-products>',
                    url: '/products/new'
                })
                .state('product.item', {
                    template: '<product-item></product-item>',
                    url: '/product/:id'
                })
                .state('avatar', {
                    url: '/',
                    template: '<avatar-card></avatar-card>'
                })
                .state('map', {
                    url: '/',
                    template: '<map></map>'
                })


          }])
})(require('angular').module('app.config', []))
