<template>
  <v-card class="overflow-hidden">
    <v-app-bar relative color="#000000" dark shrink-on-scroll
      src="https://www.edesk.com/wp-content/uploads/2021/03/find-trending-products-sell-ecommerce-1024x489.png"
      fade-img-on-scroll scroll-target="#scrolling-techniques-3">
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(0,0,0,.1), rgba(0,0,0,.1)"></v-img>
      </template>

      <h1>
        <v-card-title>My Store</v-card-title>
      </h1>

      <v-spacer></v-spacer>

      <v-btn icon router-link to="/about">
        <v-icon>mdi-shopping</v-icon>{{ productsInCart }}
      </v-btn>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab router-link to="/">Products</v-tab>
          <v-tab router-link to="/about">Cart</v-tab>
        </v-tabs>
      </template>

    </v-app-bar>
    <v-sheet id="scrolling-techniques-3" class="overflow-y-auto" max-height="600">
      <v-container>
        <br><br>
        <v-card-title>
          Products List
        </v-card-title>
        <v-divider></v-divider>
        <v-row>
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
              <v-btn color="deep-orange lighten-2" text @click="addCart(item)">
                Add to cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-container>
    </v-sheet>
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>Shopping Cart</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-card>
</template>

<script>
import ShoppingCart from '../components/ShoppingCart.vue';
import products from '../assets/products.json';

export default {
  name: 'ShoppingCart',
  data: () => ({
    drawer: false,
    group: null,
    loading: false,
    selection: 1,
    cart: [],
  }),
  components: {
    ShoppingCart
  },
  methods: {
    addCart(productCart) {
      const itemCart = this.cart.filter((itemC) => itemC.productId == productCart.productId)[0];
      if (itemCart != undefined) {
        itemCart.productQ++;
      } else {
        const itemCart = {
          productId: productCart.productId,
          productName: productCart.productName,
          productImage: productCart.productImage,
          productCategorie: productCart.productCategorie,
          productPrice: productCart.productPrice,
          productQ: 1
        };
        this.cart.push(itemCart);
      }
      this.$toast.success(`Product added`, { position: 'top-right' });
    }
  },
  computed: {
    items() {
      return products.map((item) => {
        return item;
      })
    },
    productsInCart() {
      return this.cart.reduce((acc, item) => acc + item.productQ, 0);
    }
  }
}
</script>

<style>
.v-btn {
  text-decoration: none;
}
</style>
