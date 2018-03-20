const url = 'http://localhost:3030/';
let config_url = {
    user: {
        login: 'user/login',
        register: 'user/register'
    },
    index: {
        list: 'list/article'
    }
};
let config = {};
for (let name in config_url) {

    for (let name2 in config_url[name]) {
        config[name2] = url + config_url[name][name2];
    }
}

module.exports = config;