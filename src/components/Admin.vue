<template>
    <div>
        <v-card class=" overflow-hidden" width="100%" height="100%">
            <v-app-bar color="deep-orange" dark>
                <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

                <v-toolbar-title>Admin</v-toolbar-title>
            </v-app-bar>

            <v-navigation-drawer v-model="drawer" absolute temporary>
                <v-list nav dense>
                    <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                        <v-list-item>
                            <v-list-item-icon router-link to="/admin">
                                <v-icon>mdi-cash</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Products</v-list-item-title>
                        </v-list-item>

                        <v-list-item router-link to="/">
                            <v-list-item-icon>
                                <v-icon>mdi-account</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Log-out</v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
            <v-sheet id="scrolling-techniques-3" class="overflow-y-auto">
                <v-container>
                    <br><br>
                    <v-card-title>
                        Products List
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-row>
                        <v-card :loading="loading" class="mx-auto my-12" max-width="274">
                            <template slot="progress">
                                <v-progress-linear color="deep-orange" height="10" indeterminate></v-progress-linear>
                            </template>

                            <v-card-title>Add product</v-card-title>

                            <v-divider class="mx-4"></v-divider>

                            <v-card-title>
                                <v-card-text>Product name</v-card-text>
                                <v-text-field label="Product name" v-model="name" outlined clearable
                                    :rules="[rules.required]" required>
                                </v-text-field>

                                <v-card-text>Product image</v-card-text>
                                <v-text-field label="Product image" v-model="image" outlined clearable
                                    :rules="[rules.required]" required>
                                </v-text-field>

                                <v-card-text>Product categorie</v-card-text>
                                <v-select :items="categories" v-model="categorie" label="Product categorie"
                                    :rules="[rules.required]" required></v-select>

                                <v-card-text>Product price</v-card-text>
                                <v-text-field label="Product price" v-model="price" value="" outlined prefix="$"
                                    :rules="[rules.required]" required>
                                </v-text-field>
                            </v-card-title>

                            <v-card-actions>
                                <v-btn color="deep-orange lighten-2" text type="submit"
                                    @click="addProduct(name, image, categorie, price)">
                                    Add product
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-card class="mx-auto my-12" max-width="274" dark elevation="16" outlined
                            v-for="item in products" v-bind:key="item.productId">
                            <template slot="progress">
                                <v-progress-linear color="deep-orange" height="10" indeterminate></v-progress-linear>
                            </template>

                            <v-img height="250" v-bind:src="item.productImage"></v-img>

                            <v-card-title>
                                <v-card-text>{{ item.productName }}</v-card-text>
                                <v-textarea label="New product name" v-model="name" outlined clearable height="130">
                                </v-textarea>

                                <v-card-text>{{ item.productImage }}</v-card-text>
                                <v-text-field label="New product image" v-model="image" outlined clearable>
                                </v-text-field>

                                <v-card-text>{{ item.productCategorie }}</v-card-text>
                                <v-select :items="categories" v-model="categorie" label="New product categorie" outlined>
                                </v-select>

                                <v-card-text>${{ item.productPrice }}</v-card-text>
                                <v-text-field label="New product price" v-model="price" prefix="$" outlined
                                    clearable>
                                </v-text-field>
                            </v-card-title>

                            <v-divider class="mx-4"></v-divider>

                            <v-card-actions>
                                <v-btn color="deep-orange lighten-2" text
                                    @click="updateProduct(item.productId, name, image, categorie, price)">
                                    Update
                                </v-btn>
                                <v-btn color="error" text @click="removeProduct(item)">
                                    Remove
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-row>
                </v-container>
            </v-sheet>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        name: '',
        image: '',
        categorie: '',
        price: 0,
        drawer: false,
        group: null,
        categories: ['Men', 'Children', 'Women', 'Sports'],
        loading: false,
        products: null,
        rules: {
            required: value => !!value || 'Required.',
        }
    }),
    mounted() {
        axios
            .get('http://localhost:9091/products/all')
            .then((result) => {
                this.products = result.data;
            })
    },
    computed: {

    },
    methods: {
        addProduct(name, image, categorie, price) {
            this.loading = true
            let productReques = {
                productName: name,
                productImage: image,
                productCategorie: categorie,
                productPrice: price
            }
            setTimeout(() => (this.loading = false), 2000)
            axios
                .post("http://localhost:9091/products/add", productReques)
                .then((result) => {
                    if (result.data.message == 'Product added') {
                        this.$swal.fire('Product added', 'Product added successfully', 'success');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        removeProduct(item) {
            axios
                .get("http://localhost:9091/products/delete/" + item.productId)
                .then((result) => {
                    if (result.data.message == 'Product deleted') {
                        this.$swal.fire({
                            title: 'Product deleted',
                            text: 'Product deleted successfully',
                            icon: 'success',
                            confirmButtonText: 'Ok',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.$router.go(0);
                            }
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        updateProduct(productId, name, image, categorie, price) {
            console.log(name);
            let productReques = {
                productName: name,
                productImage: image,
                productCategorie: categorie,
                productPrice: price
            }
            axios
                .post("http://localhost:9091/products/update/" + productId, productReques)
                .then((result) => {
                    if (result.data.message == 'Product updated') {
                        this.$swal.fire({
                            title: 'Product updated',
                            text: 'Product updated successfully',
                            icon: 'success',
                            confirmButtonText: 'Ok',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.$router.go(0);
                            }
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
}
</script>