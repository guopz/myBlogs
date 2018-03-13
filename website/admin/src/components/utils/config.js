const url = 'http://localhost:3030/';
let config_url = {
    user: {
        login: 'user/login',
        register: 'user/register'
    },
    index: {
        list: 'index/list'
    }
};
let config = {};
for (let name in config_url) {

    for (let name2 in config_url[name]) {
        config[name2] = url + config_url[name][name2];
    }
}
console.log(config);
module.exports = config;