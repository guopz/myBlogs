var config_url = {
    base: 'http://localhost:3030/',
    user: {
        login: 'user/login',
        register: 'user/register'
    },
    index: {
        list: 'index/list'
    }
};
var config = {};
for (var name in config_url) {
    console.log(config_url[name]);
    config[name] = config_url.base + config_url.user[name];
}
//console.log(config);
module.exports = config_url;