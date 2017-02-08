((app) => {
    'use strict'
    app.component('addProducts', {
        templateUrl: 'js/components/addProducts/addProducts.html',
        controller: ['ProductsServices', 'OwnersServices', '$state', '$stateParams',
            function(ProductsServices, OwnersServices, $state, $stateParams) {


                let _previous = {}


                this.save = (product, file) => {

                    ProductsServices.upload(file)

                    // Call save method form PostsService with post
                  product.picture = `img/${file.name}`



                    ProductsServices.save(product).then((res) => {
                            // Change editMode value to false
                            this.editMode = false
                            if (!this.product._id) {
                                // if it's new post (when post._id doesn't exist) we affect to post variable response data (post created)
                                this.product = res.data
                            }
                        })
                        /*         ownersServices.update(this.owner).then(() => {
                               Materialize.toast('Saved', 4000, 'toast-warning')
                           })*/
                }


                this.addImg = () => {
                    ProductsServices.upload(this.products.picture)
                    this.selectedUser.image = `static/img/${this.products.picture}`;
                    OwnersServices.add(this.product.picture).then((res) => {
                        console.log(res)
                    })
                }


                this.cancel = (product) => {
                    this.product = _previous[product._id]
                }


            }
        ]
    })
})(angular.module('app.addProducts'))
