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
                            <v-list-item-icon>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Home</v-list-item-title>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-account</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Account</v-list-item-title>
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
                                <v-text-field v-model="message4" label="Product name" outlined clearable></v-text-field>

                                <v-card-text>Product categorie</v-card-text>
                                <v-select :items="categories" label="Product categorie" outlined></v-select>

                                <v-card-text>Product price</v-card-text>
                                <v-text-field label="Product price" value="" outlined prefix="$"></v-text-field>
                            </v-card-title>

                            <v-card-actions>
                                <v-btn color="deep-orange lighten-2" text @click="addProduct()">
                                    Add product
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-card class="mx-auto my-12" max-width="274" dark elevation="16" outlined v-for="item in items"
                            v-bind:key="item.productId">
                            <template slot="progress">
                                <v-progress-linear color="deep-orange" height="10" indeterminate></v-progress-linear>
                            </template>

                            <v-img height="250" v-bind:src="item.productImage"></v-img>

                            <v-card-title>{{ item.productName }}</v-card-title>

                            <v-card-text>
                                <v-row align="center" class="mx-0">

                                </v-row>

                                <div class="my-4 text-subtitle-1">
                                    Categorie: {{ item.productCategorie }}
                                </div>

                                <v-card-tittle>Price: ${{ item.productPrice }}</v-card-tittle>
                            </v-card-text>

                            <v-divider class="mx-4"></v-divider>

                            <v-card-actions>
                                <v-btn color="deep-orange lighten-2" text @click="updateProduct(item)">
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
import products from '../assets/products.json';

export default {
    data: () => ({
        drawer: false,
        group: null,
        categories: ['Men', 'Children', 'Women', 'Sports'],
        loading: false,
    }),
    computed: {
        items() {
            return products.map((item) => {
                return item;
            })
        },
    },
    methods: {
        addProduct() {
            this.loading = true
            setTimeout(() => (this.loading = false), 2000)
        }
    }
}
</script>