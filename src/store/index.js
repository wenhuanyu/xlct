import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user";
import ws from "./modules/ws";
import terminal from "./modules/terminal";
import createPersiste from 'vue-savedata'
import axios from "axios";
import VueViewer from 'v-viewer'

const persiste = createPersiste({
    // 加密存本地, 默认为false
    ciphertext: true,
    mode: 'SS',
    LS: {
        module: user,
        storePath: 'user'
    },
    SS: [
        {
            module: ws,
            storePath: 'ws'
        }, {
            module: terminal,
            storePath: 'terminal'
        }
    ]
})
Vue.use(Vuex)
Vue.use(VueViewer)

export default new Vuex.Store({
    state: {
        examObj: {},
        played: true,
        stop: false,
        auth: [],
        cmenu: '',
        mainMenus: [],
        xiaoxi:'',
    },
    mutations: {
        setExamObj(state, obj) {
            state.examObj = obj
        },
        setPlayed(state, flag) {
            // console.log('played改变', flag)
            state.played = flag
        },
        setStop(state, flag) {
            // console.log('stop', flag)
            state.stop = flag;
        },
        setAuth(state, arr) {
            // console.log('arr',arr)
            state.auth = arr
            state.mainMenus = arr.map(item => item.name)
        },
        setCmenu(state, menu) {
            state.cmenu = menu
        },
        setXiaoxi(state,menu) {
            state.xiaoxi = menu
        }
    },
    actions: {
        GetAuth({commit}) {
            return new Promise((resolve, reject) => {
                axios.post('api/setting/user_info').then(res => {
                    if (res.data.code === 1) {
                        commit('setAuth', res.data.data.role_list)
                        resolve(res.data.data.role_list)
                    }
                }).catch(err => reject(err))
            })
        },
        GetXiao({commit}) {
            return new Promise((resolve, reject) => {
                axios.post('/api/zip/zip_list', {type:1}).then(res => {
                    commit('setXiaoxi', res.data.data)
                    resolve(res.data.data)
                })
            })

        }

    },
    modules: {user, ws, terminal},
    plugins: [persiste],
})
