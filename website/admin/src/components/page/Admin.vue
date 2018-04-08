<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> Home</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            欢迎使用BCMS！
        </div>
        <div class="schart">
        <schart canvasId="line" width="100%" height="400" :data="data1" type="pie" :options="options1"></schart>
        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
   
    export default {
        components: {
            Schart
        },
        data() {
            return {
                data1:[
                    {name:'2018-03-20',value:8},
                    {name:'2018-03-21',value:3},
                    {name:'2018-03-22',value:0},
                    {name:'2018-03-23',value:10},
                ],
                options1: {
                    title: '近期文章发布情况',
                    bgColor: '#607d8b',
                    titleColor: '#ffffff',
                    fillColor: '#e0f2f1',
                    axisColor: '#ffffff',
                    contentColor: '#999',
                    legendColor: '#ffffff'
                },
                clientHeight: 600
            }
        },
        methods: {
            getData() {
                let self = this,
                    nowdata = self.$moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
                    postParams = {},
                    username = JSON.parse(localStorage.getItem('ms_username'));
                if (!username && !username._id) {
                    self.$router.push('/login');
                };
               
                postParams.date = nowdata;
                postParams.uid = username._id;
                
                let disposeData = (res, callbak) => {
                    if (res.status) {
                        callbak && callbak(res);
                    } else {
                        self.$message.error(res.msg);
                    };
                };
                // console.log(postParams);
                self.$axios.post(self.$url.date, postParams).then((res) => {
                    let result = res.data;
                    disposeData(result, (res) => {
                        let getParams = res.data.data;
                        self.data1 = [];

                        for (let item in getParams) {
                            let temp = {};
                            temp.name = item;
                            temp.value = parseInt(getParams[item]);
                            self.data1.push(temp);
                        }
                    }); 
                });
            }
        },
        created() {
            this.getData();
        },
       
        mounted() {
            let that = this;
            this.$nextTick(() => {
                
                let ch = document.documentElement.clientWidth,
                    cur = document.getElementById("line");
                // console.log(ch);
                that.clientHeight = ch/3*2;
                cur.width = that.clientHeight;
                
            })
        }
    }
</script>

<style scoped>
    .schart{
        width: 100%;
        display: inline-block;
    }
    .content-title{
        clear: both;
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    
</style>