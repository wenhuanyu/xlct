import fa from "element-ui/src/locale/lang/fa";

export default {
    state    : {
        token      : '',
        loginStatus: false,
        userInfo   : '',
        account    : '',
        username   : '',
        terminal   : {
            loginStatus: false,
            userInfo   : '',
            account    : '',
            username   : '',
            profile    : {},
        },
        hospital   : {},
        isClient   : false,
    },
    getters  : {},
    mutations: {
        setUserInfo(state, userinfo) {
            state.loginStatus = userinfo.status;
            state.userInfo    = userinfo.data;
            state.username    = userinfo.username;
        },

        setAccount(state, account) {
            state.account = account;
        },

        setTerminalUserInfo(state, userinfo) {
            state.terminal.loginStatus = userinfo.status;
            state.terminal.userInfo    = userinfo.data;
            state.terminal.username    = userinfo.username;
        },

        setTerminalAccount(state, account) {
            state.terminal.account = account;
        },

        setTerminalProfile(state, profile) {
            state.terminal.profile = profile;
        },

        setHospital(state, hospital) {
            state.hospital = hospital;
        },

        setToken(state, token) {
            state.token = token;
        },

        setClient(state, isClient) {
            state.isClient = isClient
        }
    },
    actions  : {}
}
