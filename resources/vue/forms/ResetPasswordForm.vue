<template>
    <form id="reset_password_form" @submit="onSubmit">
        <h3 class="uk-card-title uk-text-center">Forgot your password?</h3>
        <p class="uk-text-center uk-width-medium@s uk-margin-auto">Enter your email address and we will send you a link to reset your password.</p>
            <text-input-component
                custom-class="jsValidator"
                type="email"
                name="email"
                placeholder="Read your email"
                icon="mail"
                validators="required email"
                min_length="8"
                v-model="email">
            </text-input-component>

        <button-component
            custom-class="uk-button-primary uk-button-large uk-width-1-1"
            :disabled="disabled"
            value="Send Email"
        ></button-component>

        <div class="uk-text-small uk-text-center">
            <a href="#" uk-switcher-item="1">Back to login</a>
        </div>
    </form>
</template>

<script>
import TextInputComponent from '../components/forms/TextInputComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import axios from 'axios';

export default {
    components:{
        TextInputComponent,
        ButtonComponent
    },

    emits:{
        submit:(payload) => {
            return payload;
        }
    },

    data(){
        return{
            email: "",
            disabled: false,
            resetPasswordFormValidator: undefined
        }
    },   
    
    mounted(){
        this.resetPasswordFormValidator = new JSValidator('reset_password_form').init();
    },

    methods:{
        onSubmit(){
            if(this.resetPasswordFormValidator.status){
                
                this.disabled = true;
                
                axios.post('/forgot-password',{
                    email: this.email
                }).then( res => {

                    this.$emit('submit', {
                        message: 'We have sent an email to recover your account',
                        res: res
                    });

                }).catch( error => {
                    
                    this.disabled = false;
                   
                    UIkit.notification({
                        message: 'We have not found your email in our records',
                        status: 'danger'
                });    
                });
            }else{
                
                this.disabled = false;

                UIkit.notification({
                    message: 'Validation error',
                    status: 'danger'
                });
            }
        }
    }
}
</script>