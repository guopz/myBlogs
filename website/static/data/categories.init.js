/*
 * @Author: GH 
 * @Date: 2018-04-06 18:34:06 
 * @Last Modified by: GH
 * @Last Modified time: 2018-04-16 22:49:36
 */

var categorie = {
    init() {
        this.page();
    },
    static() {
        let url = {
            show: '../home/categorie',
        };
        return {
            url
        }
    },
    page() {
        let u = this.static().url;
        console.log(u);
        let tpl = function(_data) {
            let listhtml = `<li class="category-list-item">
                                <a class="category-list-link" href="javascript:void(0);">${_data.name}</a>
                                <span class="category-list-count">${_data.count}</span>
                            </li>`;
                return listhtml;
        }
        $.get(u.show, (res) => {
            let html = '',
                result = res.data.data;
            
            result.forEach(item => {
                html += tpl(item);
                $('.category_list_hook').html(html);
            });
            $('.num_hook').text(result.length);
        }, 'json');
    }
}.init();