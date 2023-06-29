<template>
    <form id="login_form" @submit.prevent="onSubmit">
        <h3 class="uk-card-title uk-text-center">Welcome back!</h3>
        
        <text-input-component
            custom-class="jsValidator"
            type="email"
            name="email"
            placeholder="Read your email"
            icon="mail"
            validators="required email"
            v-model="email"
            ></text-input-component>

        <text-input-component
            custom-class="jsValidator"
            type="password"
            name="password"
            placeholder="Read your password"
            icon="lock"
            validators="required"
            v-model="password"
            ></text-input-component>

        <button-component
            custom-class="uk-button-primary uk-button-large uk-width-1-1"
            :disabled="disabled"
            value="Login"
        ></button-component>

        <div class="uk-margin uk-text-right@s uk-text-center uk-text-small">
            <a href="#" uk-switcher-item="2">Forgot Password?</a>
        </div>

        <div class="uk-text-small uk-text-center">
            Not registered? <a href="#" uk-switcher-item="0">Create an account</a>
        </div>
    </form>
</template>

<script>
import TextInputComponent from '../components/forms/TextInputComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';

export default {
    components:{
        TextInputComponent,
        ButtonComponent
    },

    emits:{

        submit: (payload) => {
            
            return payload;

        }
    },

    data:() =>{
        return{
            email: "",
            password: "",
            disabled: false,
            loginFormValidator: undefined
        }
    },

    mounted(){
        this.loginFormValidator = new JSValidator('login_form').init();
    },

    methods: {

        onSubmit(){
            
            if(this.loginFormValidator.status){

                this.disabled = true;

                axios.post('/login', {
                    email: this.email,
                    password: this.password
                }).then( res => {

                    console.log(res);

                    this.$emit('submit', {
                        message: "Session start success!",
                        res: res
                    })

                }).catch( error => {

                    //console.log(error.response);

                    this.disabled = false;

                    UIkit.notification({
                        message: "We could not validate your credentials",
                        status: "danger"
                    });
                });

            }else{
                
                this.disabled = false;

                UIkit.notification({
                    message: "Validation error",
                    status: "danger"
                });
            }
        }
    }
}
</script>