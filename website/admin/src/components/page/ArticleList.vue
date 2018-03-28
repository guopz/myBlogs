<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 文档列表</el-breadcrumb-item>
                <el-breadcrumb-item>数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <!-- <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                <el-option key="1" label="广东省" value="广东省"></el-option>
                <el-option key="2" label="湖南省" value="湖南省"></el-option>
            </el-select> -->
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="date" label="日期" sortable width="150">
            </el-table-column>
            <el-table-column prop="name" label="作者" width="120">
            </el-table-column>
            <el-table-column prop="address" label="标题" :formatter="formatter">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :page-size="page.page_count"
                    :total="page.count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    let ajax_url = require('../utils/config');
    export default {
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                // cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                page: {
                    count: 0,
                    cur_page: 1,
                    page_count: 2
                }
            }
        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function(d){
                    // console.log(d);
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if(d.name === self.del_list[i].name){
                            is_del = true;
                            break;
                        }
                    }
                    if(!is_del){
                        if(d.address.indexOf(self.select_cate) > -1 && 
                            (d.name.indexOf(self.select_word) > -1 ||
                            d.address.indexOf(self.select_word) > -1)
                        ){
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            handleCurrentChange(val){
                this.page.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                if(process.env.NODE_ENV === 'development'){
                    // self.url = '/ms/table/list';
                    // {page:self.cur_page}
                    self.url = ajax_url.show;
                };

                let username = JSON.parse(localStorage.getItem('ms_username'));
                if (!username || !username._id) {
                    self.$router.push('/login');
                };

                let listParams = {
                    uid: username._id,
                    cur_count: self.page.cur_page,
                    page_count: self.page.page_count
                };
                self.$axios.post(self.url, listParams).then((res) => {
                    let result = res.data;
                    if (result.status) {
                        // 重置页面数据
                        self.tableData = result.data.list;
                        self.page.count = result.data.count;
                        self.page.page_count = result.data.page_count;
                        
                    } else {
                        self.$message.error(result.msg);
                    };
                    // self.tableData = res.data.list;
                })
            },
            search(){
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$router.push(`/articleedit/${row._id}`);
                // this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                // 删除数据
                let self = this;
                self.$axios.post( ajax_url.del , { _id : row._id }).then((res) => {
                     let result = res.data;
                     if (result.status)  {
                        self.tableData.splice(index, 1);
                        self.$router.push('/articlelist');
                     } else {
                        self.$message.error(result.msg);
                     }   
                });;
               
            },
            delAll() {
                const self = this,
                    length = self.multipleSelection.length;
                let str = '',
                    params = [];

                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                    params.push(self.multipleSelection[i]._id);
                }
                console.log(params);
                self.$axios.post(ajax_url.delall, params).then((res) => {
                    let result = res.data;
                    if (result.status) {
                        self.$message.error('删除了'+str);
                    }
                });
                
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>