<template>
<form id="register_form" @submit.prevent="onSubmit">
    <h3 class="uk-card-title uk-text-center">Sign up today. It's free1!</h3>

    <text-input-component
        custom-class="jsValidator"
        type="text"
        name="name"
        placeholder="Read your name"
        icon="user"
        validators="required length"
        min_length="5"
        max_length="100"
        v-model="name">
    </text-input-component>

    <text-input-component
        custom-class="jsValidator"
        type="email"
        name="email"
        placeholder="Read your email"
        icon="mail"
        validators="required email"
        v-model="email">
    </text-input-component>

    <text-input-component
        custom-class="jsValidator"
        type="password"
        name="password"
        placeholder="Set your password"
        icon="lock"
        validators="required length"
        min_length="8"
        v-model="password">
    </text-input-component>

    <text-input-component
        custom-class="jsValidator"
        type="password"
        name="password_confirmation"
        placeholder="Confirm your password"
        icon="lock"
        validators="required length"
        min_length="8"
        v-model="password_confirmation">
    </text-input-component>

    <checkbox-input-component
        custom-class="jsValidator"
        name="terms"
        text="I agree the terms and conditions."
        validators="checked"
        v-model="terms"></checkbox-input-component>

    <button-component
        custom-class="uk-button-primary uk-button-large uk-width-1-1"
        :disabled="disabled"
        value="Register"
    ></button-component>
   
    <div class="uk-text-small uk-text-center">
        Already have an account? <a href="#" uk-switcher-item="1">Log in</a>
    </div>
</form>
</template>

<script>
    import TextInputComponent from '../components/forms/TextInputComponent.vue';
    import CheckboxInputComponent from '../components/forms/CheckboxInputComponent.vue';
    import ButtonComponent from '../components/ButtonComponent.vue';

    export default{
        components: {
            TextInputComponent,
            CheckboxInputComponent,
            ButtonComponent
        },

        emits: {
            submit: (payload) => {
                return payload
            }
        },

        data(){
            return{
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                terms: false,
                disabled: false,
                registerFormValidator: undefined
            }
        },

        mounted(){
            
            this.registerFormValidator = new JSValidator('register_form').init();
        },

        methods:{
            onSubmit(){
                
                //this.disabled = true;

                if(this.registerFormValidator.status && this.terms){

                    //Disable button
                    this.disabled = true;
                    
                    //To send form
                    axios.post('/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.password_confirmation
                    }).then( res => {
                        //console.log(res);
                        this.$emit('submit', {
                            message: "Record created successfully",
                            res: res,
                        });
                    }).catch( error => {
                        //console.log(error.response);
                        this.disabled = false;

                        UIkit.notification({
                            message: 'An unexpected error has ocurred',
                            status: 'danger'
                    });    
                    })
                }else{

                    this.disabled = false;
                    
                    UIkit.notification({
                        message: 'Error of validation',
                        status: 'danger'
                    });
                }
            }
        }
    }
</script>