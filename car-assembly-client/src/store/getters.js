const getters = {
    sidebar: state=> state.app.sidebar,
    device: state=> state.app.device,
    token: state=> state.user.token,
    avatar: state=> state.user.avatar,
    username: state=> state.user.username,
    userInfo: state=> state.user.userInfo
};

export default getters;
