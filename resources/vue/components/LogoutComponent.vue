<template>
    
    <a href="#"
        @click="logout"
    >
    {{ text }}
    </a>

</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: "Exit"
        }
    },

    methods: {

        logout(){

            axios.post('/logout').then( res => {

                store.commit('auth', null);

                window.location.href = '//' + location.host;

            }).catch( error => {

                console.log(error);

            });
        }
    }
}
</script>