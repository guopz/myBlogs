/*
 * @Author: GH 
 * @Date: 2018-04-06 18:34:06 
 * @Last Modified by: GH
 * @Last Modified time: 2018-04-07 00:14:30
 */

var index = {
    init() {
        this.page();
    },
    static() {
        let url = {
            show: 'list/show',
        };
        return {
            url
        }
    },
    page() {
        let u = this.static().url;
        console.log(u);
        let tpl = function(_data) {
            let listhtml = `<article class="post post-type-normal ">
                                <header class="post-header">
                                    <!-- title -->
                                    <h1 class="post-title" itemprop="name headline">
                                        <a class="post-title-link" href="/2017/04/18/GIT-Hexo/" itemprop="url">${_data.address}</a>
                                    </h1>
                                    <div class="post-meta">
                                        <span class="post-time">
                                            <span class="post-meta-item-icon">
                                                <i class="fa fa-calendar-o"></i>
                                            </span>
                                            <span class="post-meta-item-text">发表于</span>
                                            <time title="创建于">${_data.date}</time>
                                        </span>
                                        <span class="post-category">
                                            <span class="post-meta-divider">|</span>
                                            <span class="post-meta-item-icon">
                                                <i class="fa fa-folder-o"></i>
                                            </span>
                                            <span class="post-meta-item-text">分类于</span>
                                            <span >
                                                <a href="/categories/博客搭建/" >
                                                    <span itemprop="name">${_data.classify.name}</span>
                                                </a>
                                            </span>
                                        </span>
                                    </div>
                                </header>
                                <!--noindex-->
                                <div class="post-body" >
                                    <p>${_data.digest}</p>
                                    <!--noindex-->
                                    <div class="post-button text-center">
                                        <a class="btn" href="">
                                            阅读全文 &raquo;
                                        </a>
                                    </div>
                                    <!--/noindex-->
                                    <footer class="post-footer">
                                        <div class="post-eof"></div>
                                    </footer>
                                </div>
                                <!--/noindex-->
                            </article>`;
                return listhtml;
        }
        $.post(u.show, {
            uid: '5ab66de03e5c3603085259b6'
        }, (res) => {
            let html = '',
                result = res.data.list;
            console.log(result);
            result.forEach(item => {
                html += tpl(item);
                $('#posts').html(html);
            });
            console.log(res);
        }, 'json');
    }
}.init();