((app) => {
    'use strict'
    app.component('productsList', {
        bindings: {},
        templateUrl: 'js/components/productsList/products.html',
        controller: ['ProductsServices', 'OwnersServices', '$stateParams', '$state', function(ProductsServices, OwnersServices, $stateParams, $state) {
                angular.extend(this, {
                    $onInit() {


                      OwnersServices.getCurrent().then((res) => {
                          this.owner = res
                          console.log(res);
                      }).catch(() => {
                          $state.go('login.connect')
                      })

                      ProductsServices.get().then((response) => {
                            this.products = response.data
                            console.log(this.products);
                        })

                        if ($stateParams.products) {
                            ProductsServices.filter($stateParams).then((response) => {
                                this.products = response.data
                            })

                        } else {
                            ProductsServices.get().then((response) => {
                                this.products = response.data
                            })

                        }

                    }
                })

            }] //dont delete
    }); //dont delete
})(angular.module('app.productsList'))
