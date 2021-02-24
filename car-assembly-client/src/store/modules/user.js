import {login, logout, getInfo} from '@/api/user';
import {getToken, setToken, removeToken} from '@/utils/auth';
import {resetRouter} from '@/router';

const getDefaultState = ()=> ({
    token: getToken(),
    name: '',
    avatar: '',
    userInfo: null
});

const state = getDefaultState();

const mutations = {
    RESET_STATE: state=> {
        Object.assign(state, getDefaultState());
    },
    SET_TOKEN: (state, token)=> {
        state.token = token;
    },
    SET_NAME: (state, username)=> {
        state.username = username;
    },
    SET_AVATAR: (state, avatar)=> {
        state.avatar = avatar;
    },
    SET_USERINFO: (state, userInfo)=> {
        state.userInfo = userInfo;
    }
};

const actions = {
    // user login
    login({commit}, userInfo) {
        const {username, password} = userInfo;

        return new Promise((resolve, reject)=> {
            login({username: username.trim(),
                password: password}).then(response=> {
                const {data} = response;

                commit('SET_TOKEN', data.access_token);
                setToken(data.access_token);
                resolve();
            }).catch(error=> {
                reject(error);
            });
        });
    },

    // get user info
    getInfo({commit, state}) {
        return new Promise((resolve, reject)=> {
            getInfo().then(response=> {
                const {data} = response;
                const {userInfo} = data;

                if (!data) {
                    return reject('Verification failed, please Login again.');
                }

                const {username, avatar} = userInfo;

                commit('SET_NAME', username);
                commit('SET_AVATAR', avatar);
                commit('SET_USERINFO', userInfo);
                resolve(data);
            }).catch(error=> {
                reject(error);
            });
        });
    },

    // user logout
    logout({commit, state}) {
        return new Promise((resolve, reject)=> {
            removeToken(); // must remove  token  first
            resetRouter();
            commit('RESET_STATE');
            
            resolve();
        });
    },

    // remove token
    resetToken({commit}) {
        return new Promise(resolve=> {
            removeToken(); // must remove  token  first
            commit('RESET_STATE');
            resolve();
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

