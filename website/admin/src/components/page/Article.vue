<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 发布文章</el-breadcrumb-item>
                <el-breadcrumb-item>文章</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box" style="width: auto;">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="文章标题">
                    <div style="width:600px">
                        <el-input v-model="form.a_title"></el-input>
                    </div>
                </el-form-item>
                
                <el-form-item label="文章分类">
                    <div class="ipt">
                         <el-select v-model="form.classify" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.aid"
                            :label="item.name"
                            :value="item">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>

                <el-form-item label="来源">
                    <div class="ipt">
                        <el-input v-model="form.b_source" placeholder="未知"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="作者">
                    <div class="ipt">
                        <el-input v-model="form.c_author" placeholder="佚名"></el-input>
                    </div>
                </el-form-item>
                
                <el-form-item label="TAG">
                    <el-tag
                    :key="tag" 
                    v-for="tag in form.dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{tag}}
                    </el-tag>
                    <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-form-item>

                <el-form-item label="文章摘要">
                    <el-input type="textarea" v-model="form.c_zy"></el-input>
                </el-form-item>
                <!-- delete -->
                <el-form-item label="文章内容">
                    <markdown-editor v-model="form.d_desc" :configs="configs" ref="markdownEditor"></markdown-editor>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="onCancle">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    import { markdownEditor } from 'vue-simplemde';
    let ajax_url = require('../utils/config');

    export default {
        data() {
            return {
                form: {
                    a_title: '',
                    b_source: '',
                    c_author: '',
                    c_zy: '',
                    d_desc: '',
                    dynamicTags: ['日常记录'],
                    uid: '',
                    classify: ''
                },
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                    }, {
                    value: '选项2',
                    label: '双皮奶'
                }],
                errorInfrom: {
                    a_title: '请填写文章标题',
                    b_source: '请填写文章来源',
                    c_author: '请填写文章作者',
                    c_zy: '请填写摘要',
                    d_desc: '请填写文章内容',
                    uid:'退出后重新登录'
                },
                inputVisible: false,
                inputValue: '',
                configs: {
                    status: true,
                    initialValue: '请使用MackDown语法！',
                    renderingConfig: {
                        codeSyntaxHighlighting: true,
                        highlightingTheme: 'atom-one-light'
                    }
                }
            }
        },
        created() {
            this.getData();
        },
        methods: {
            onSubmit() {
                const self = this;
                let username = JSON.parse(localStorage.getItem('ms_username'));
                if (!username || !username._id) {
                    self.$router.push('/login');
                };
                self.form.uid = username._id;
                 console.log(this.form);
                for(let name in this.form) {
                    let val = this.form[name]
                   if (!val) {
                       this.$message.error(this.errorInfrom[name]);
                       return;
                   }
                };
                
                // this.$message.success('提交成功！');
                // 提交数据
                console.log(this.form);
                self.$axios.post(ajax_url.article,this.form).then((res) => {
                    let result = res.data;
                    if(!result.status) {
                        self.$message.error(result.msg);
                    } else {
                        self.$message.success(result.msg);
                        self.form = {};
                        self.$router.push(result.data.link);
                    }                   
                });

            },

            handleClose(tag) {
                this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                this.form.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            onCancle() {
                this.form = {};
                this.$message.error('重置成功！');
            },

            getData() {
                var self = this;
                let username = JSON.parse(localStorage.getItem('ms_username'));
                if (!username || !username._id) {
                    self.$router.push('/login');
                };
                self.$axios.post(self.$url.classify, {uid: username._id}).then((res) => {
                    let result = res.data;
                    if(result.status) {
                        self.options = result.data.data;
                        // console.log(self.options);
                    }
                });
            }
        },
        components: {
            markdownEditor
        }
    }
</script>

<style>
.ipt {
    width: 200px;
}
.el-tag {
    background-color: rgba(64,158,255,.1);
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0; 
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
