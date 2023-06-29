<template>
        <!-- This is the modal -->
        <div id="auth_modal" uk-modal>
        <div class="uk-modal-dialog uk-modal-body">
            <ul class="uk-tab uk-flex-center" uk-grid uk-switcher="animation: uk-animation-fade">
                <li><a href="#">Register</a></li>
                <li><a href="#">Log In</a></li>
                <li class="uk-hidden"><a>Reset password</a></li>
            </ul>
            <ul class="uk-switcher uk-margin">
                <!-- Register -->
                <li>
                    <register-form
                        @submit="submitForm"
                    ></register-form>
                </li>
                <!-- Log In -->
                <li>
                    <login-form
                        @submit="submitForm"
                    ></login-form>
                </li>
                <!-- Reset Password -->
                <li>
                    <reset-password-form
                        @submit="submitForm"
                    ></reset-password-form>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import RegisterForm from '../forms/RegisterForm.vue';
import LoginForm from '../forms/LoginForm.vue';
import ResetPasswordForm from '../forms/ResetPasswordForm.vue';

export default {
    components:{
        RegisterForm,
        LoginForm,
        ResetPasswordForm
    },
    
    methods:{
        submitForm(payload){
            store.dispatch('setAuthUser');

            UIkit.notification({
                message: payload.message,
                status: 'success'
            });

            UIkit.modal('#auth_modal').hide();
        }
    }
}
</script>