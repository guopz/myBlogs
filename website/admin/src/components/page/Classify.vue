<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 文章分类</el-breadcrumb-item>
                <el-breadcrumb-item>分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form"  label-width="80px">
                
                <!-- add -->
                <el-form-item label="当前分类">
                     <el-tag
                        v-for="tag in tags"
                        :key="tag.name"
                        :type="tag.type">
                        {{tag.name}}
                    </el-tag>
                </el-form-item>
                <el-form-item label="添加分类">
                     <el-tag
                        v-for="tag in dynamicTags"
                        :key="tag.name"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{tag.name}}
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
               
                <!-- end -->
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <!-- <el-button>取消</el-button> -->
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                tags: [],
                dynamicTags: [{ name: '生活' }],
                inputVisible: false,
                inputValue: ''
            }
        },
        created () {
            this.getData();
        },
        methods: {
            onSubmit() {
                let self = this;
                
                let username = JSON.parse(localStorage.getItem('ms_username'));
                if (!username || !username._id) {
                    self.$router.push('/login');
                };
                for (let item in self.dynamicTags) {
                    self.dynamicTags[item].uid = username._id;
                };
                let sendParams = {
                    uid: username._id,
                    list: self.dynamicTags
                };
                console.log(self.dynamicTags);
                self.$axios.post(self.$url.addclassify, sendParams).then((res) => {
                    let result = res.data;
                    console.log(result);
                    if(result.status) {
                        self.tags =  self.tags.concat(self.dynamicTags);
                        self.$message.success(result.msg);
                    } else {
                        self.$message.error(result.msg);
                    }
                    self.dynamicTags = [];
                });
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
                    this.dynamicTags.push({name:inputValue});
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            getData() {
                var self = this;
                let username = JSON.parse(localStorage.getItem('ms_username'));
                if (!username || !username._id) {
                    self.$router.push('/login');
                };
                self.$axios.post(self.$url.classify, {uid: username._id}).then((res) => {
                    let result = res.data;
                    console.log(result);
                    if(result.status) {
                        self.tags = result.data.data;
                    }
                });
            }
           
        }
    }
</script>

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
.el-tag--success {
    background-color: rgba(18,206,102,.1);
    border-color: rgba(18,206,102,.2);
    color: #13ce66;
}
</style>
