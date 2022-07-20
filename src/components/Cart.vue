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

            <v-card-title>
                <v-btn icon router-link to="/cart">
                    <v-icon>mdi-shopping</v-icon>{{ productsInCart }}
                    <v-spacer></v-spacer>
                </v-btn>
                <v-btn router-link to="/">
                    Log out
                    <v-spacer></v-spacer>
                </v-btn>
            </v-card-title>

            <template v-slot:extension>
                <v-tabs align-with-title center-active>
                    <v-tab router-link to="/cart">Cart</v-tab>
                    <v-tab router-link to="/products">Products</v-tab>
                </v-tabs>
            </template>

        </v-app-bar>
        <v-sheet id="scrolling-techniques-3" class="overflow-y-auto" max-height="600">
            <v-container>
                <br><br>
                <v-card-title>
                    Your cart
                </v-card-title>
                <v-divider></v-divider><br>
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-data-table :headers="headers" :items="cart" :items-per-page="10" class="elevation-1" dark
                            calculate-widths>
                        </v-data-table>
                        <br><br>
                        <v-stepper v-model="e6" vertical dark>
                            <v-stepper-step :complete="e6 > 1" step="1">
                                Discount
                            </v-stepper-step>

                            <v-stepper-content step="1">
                                <v-card color="white lighten-1" class="mb-12" height="auto" :disabled="totalPrice === null" > 
                                    <v-container fluid>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-subheader class="black--text">Add a discount coupon</v-subheader>
                                            </v-col>
                                            <v-col cols="12" md="3">
                                                <v-text-field light label="Coupon" v-model="coupon" outlined>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="3">
                                                <v-btn color="orange" @click="applyCoupon(coupon)" width="80%"
                                                    height="65%">
                                                    Add coupon
                                                </v-btn>
                                            </v-col>
                                            <v-divider></v-divider>
                                            <v-col cols="12" md="6">
                                                <v-subheader class="black--text">Total: </v-subheader>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-subheader class="black--text">$ {{ totalPrice }}</v-subheader>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card>
                                <v-btn color="orange" @click="e6 = 2" :disabled="totalPrice === null" >
                                    Continue
                                </v-btn>
                            </v-stepper-content>

                            <v-stepper-step :complete="e6 > 2" step="2">
                                Costumer information
                            </v-stepper-step>

                            <v-stepper-content step="2">
                                <v-card color="white lighten-1" class="mb-12" height="auto">
                                    <v-container fluid>
                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <v-subheader class="black--text">Shipping Address</v-subheader>
                                            </v-col>
                                            <v-col cols="12" md="12">
                                                <v-select v-model="value" :items="countries" countries
                                                    label="Country/Region" outlined light>
                                                </v-select>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field light label="First name" outlined placeholder="First name"
                                                    clearable>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field light label="Last name" outlined placeholder="Last name"
                                                    clearable>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="12">
                                                <v-text-field light label="Address" outlined placeholder="Address"
                                                    clearable>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="12">
                                                <v-text-field light label="Apartment, suite, etc. (optional)" outlined
                                                    placeholder="Apartment, suite, etc. (optional)" clearable>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field light label="City" outlined placeholder="City" clearable>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field light label="Postal code" outlined
                                                    placeholder="Postal code" clearable>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="12">
                                                <v-text-field light label="Phone number" outlined
                                                    placeholder="Phone number" clearable>
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card>
                                <v-btn color="orange" @click="e6 = 3">
                                    Continue
                                </v-btn>
                                <v-btn text @click="e6 = 1">
                                    Cancel
                                </v-btn>
                            </v-stepper-content>

                            <v-stepper-step :complete="e6 > 3" step="3">
                                Purchase summary
                            </v-stepper-step>

                            <v-stepper-content step="3">
                                <v-card color="white lighten-1" class="mb-12" height="auto">
                                    <v-container fluid>
                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <v-subheader class="black--text">Purchase summary</v-subheader>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-subheader class="black--text">Number of items</v-subheader>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-subheader class="black--text">{{ productsInCart }}</v-subheader>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-subheader class="black--text">Total</v-subheader>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <strong>
                                                    <v-subheader class="black--text">${{ totalPrice }}</v-subheader>
                                                </strong>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card>
                                <v-btn color="green" @click="onPurchase()">
                                    Purchase
                                </v-btn>
                                <v-btn text @click="e6 = 2">
                                    Cancel
                                </v-btn>
                            </v-stepper-content>

                        </v-stepper>
                    </v-col>
                </v-row>
            </v-container><br><br><br>
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
export default {
    data() {
        return {
            headers: [
                {
                    text: 'Product',
                    align: 'start',
                    sortable: false,
                    value: 'productName',
                },
                { text: 'Categorie', value: 'productCategorie' },
                { text: 'Price ($)', value: 'productPrice' },
                { text: 'Quantity', value: 'productQ' }
            ],
            cart: [],
            e6: 1,
            coupons: [{ couponName: 'VUE20', couponDiscount: 0.20 }, { couponName: 'VUE30', couponDiscount: 0.30 }, { couponName: 'VUE50', couponDiscount: 0.50 }],
            coupon: '',
            isUsed: false,
            totalPrice: 0,
            countries: ['United States', 'Canada', 'Australia', 'New Zealand'],
        }
    },
    created() {
        let products = localStorage.getItem("cart");
        if (products != null) {
            this.cart = JSON.parse(products);
        }
        let totalPrice = localStorage.getItem("totalPrice");
        this.totalPrice = JSON.parse(totalPrice);
    },
    computed: {
        productsInCart() {
            return this.cart.reduce((acc, item) => acc + item.productQ, 0);
        }
    },
    methods: {
        applyCoupon(coupon) {
            if (!this.isUsed) {
                const aCoupon = this.coupons.filter((c) => c.couponName == coupon)[0];
                if (aCoupon != undefined) {
                    this.coupons.forEach(c => {
                        if (c.couponName == coupon) {
                            this.totalPrice -= this.totalPrice * c.couponDiscount;
                            this.isUsed = true;
                        }
                    });
                    this.$toastr.s("Coupon applied succesfully");
                } else {
                    this.$toastr.e("Invalid coupon");
                }
            } else {
                this.$toastr.e("You only can applied one coupon at the time");
            }
        },
        onPurchase() {
            this.$swal.fire('Thank You!!', 'Your purchase has been completed total: $' + this.totalPrice, 'success');
            this.cart = [];
            localStorage.removeItem('cart');
            localStorage.removeItem('totalPrice');
            this.totalPrice = 0;
            this.e6 = 1;
        },
    }
}
</script>