export default [
    {
        path: "/reset-password/:token",
        name: "ResetPassword",
        component: () => import(/* webpackChunkNAme: "ResetPassword" */ "../../views/auth/ResetPasswordView"),
        meta: {
            title: "Recovery password"
        }
    }
];