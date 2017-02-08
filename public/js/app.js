((app) => {
  'use strict'
  const file = [() => {
      return {
          restrict: 'E',
          template: '<input type ="file">',
          replace: true,
          transclude: true,
          require: 'ngModel',
          link(scope, element, attr, ctrl) {

              if (!attr.class && !attr.ngClass) {
                  element.addClass('btn');
              }

              let listener = () => {
                  scope.$apply(() => {
                      attr.multiple ? ctrl.$setViewValue(element[0].files) : ctrl.$setViewValue(element[0].files[0])
                  });

              }
              element.bind('change', listener)
          }
      }
  }]

  app.directive('fichier', file)


})(require('angular').module('app', [
  require('angular-ui-router'),
  require('angular-cookies'),
  require('angular-materialize'),
  'app.services',
  'app.config',
  'app.common',
  'app.productsList',
  'app.productsItem',
  'app.addProducts',
  'app.avatarCard',
  'app.map'
]))
