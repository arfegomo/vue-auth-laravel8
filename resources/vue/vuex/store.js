import { createStore } from "vuex";

const store = createStore({
    state(){
        return{
            authUser: null
        }
    },

    mutations:{
        auth(state, user){
            state.authUser = user;
        }
    },

    actions:{
        setAuthUser(){
            axios.get('/sanctum/csrf-cookie').then( res => {
                axios.get('/api/get-auth-user').then( res => {
                    if(res.data.validation){
                        //console.log("Ariel");
                        this.commit('auth', res.data.user);
                    }else{
                        //console.log("Pedro");
                        this.commit('auth', null);
                    }
                })
                .catch( error => {
                    this.commit('auth', null);
                });
            })
            .catch( error => {
                console.log(error);
            })
        }
    }

});

export default store;