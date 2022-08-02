<template>
    <div>
        <v-spacer></v-spacer><br><br><br>
        <v-card class="mx-auto" width="30%" dark>
            <v-card-title class="text-h6 font-weight-regular justify-space-between">
                <span>{{ currentTitle }}</span>
            </v-card-title>

            <v-window v-model="step">
                <v-window-item :value="1">
                    <v-card-text>
                        <v-text-field label="Username" v-model="username"></v-text-field>
                        <v-text-field label="Password" type="password" v-model="password"></v-text-field>
                        <span class="text-caption red--text text--darken-1" v-if="bc">
                            Username or password incorrect
                        </span>
                        <v-btn width="100%" color="primary" depressed @click="login(username, password)">
                            Login
                        </v-btn>
                    </v-card-text>
                </v-window-item>

                <v-window-item :value="2">
                    <v-card-text>
                        <v-text-field label="Username" v-model="username"></v-text-field>
                        <v-text-field label="Email" v-model="email"></v-text-field>
                        <v-text-field label="Password" type="password" v-model="password"></v-text-field>
                        <v-btn width="100%" color="primary" depressed @click="signUp(username, email, password)">
                            Sign up
                        </v-btn>
                    </v-card-text>
                </v-window-item>

            </v-window>

            <v-divider></v-divider>

            <v-card-actions>
                <v-btn v-if="step == 1" width="100%" text @click="step = 2">
                    Create new account
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn v-if="step == 2" width="100%" text depressed @click="step = 1">
                    Login
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        step: 1,
        username: '',
        email: '',
        password: '',
        bc: false,
    }),

    computed: {
        currentTitle() {
            switch (this.step) {
                case 1: return 'Login'
                case 2: return 'Sign up'
            }
        },
    },

    methods: {
        login(username, password) {
            if (username == 'admin' && password == 'admin') {
                this.$router.push('admin');
            }
            let loginRequest = {
                name: username,
                password: password
            };
            axios
                .post("http://localhost:9093/user/login", loginRequest)
                .then((result) => {
                    if (result.data.message == 'User accepted') {
                        this.$router.push('products');
                    }
                    this.bc = true;
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        signUp(username, email, password) {
            let userRequest = {
                name: username,
                email: email,
                password: password
            };
            axios
                .post("http://localhost:9093/user/add", userRequest)
                .then((result) => {
                    if (result.data.message == 'User added') {
                        this.$swal.fire({
                            title: 'Congrats!!',
                            text: 'Your account has been created',
                            text: 'You need to login',
                            icon: 'success',
                            confirmButtonText: 'Login',
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