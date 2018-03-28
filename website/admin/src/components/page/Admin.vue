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
        <schart canvasId="line" width="700" height="400" :data="data1" type="line" :options="options1"></schart>
        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    export default {
        components: {
            Schart
        },
        data: () => ({
            data1:[
                {name:'2018-03-20',value:8},
                {name:'2018-03-21',value:3},
                {name:'2018-03-22',value:0},
                {name:'2018-03-23',value:10},
            ],
            options1: {
                title: '近期文章发布情况',
                bgColor: '#009688',
                titleColor: '#ffffff',
                fillColor: '#e0f2f1',
                axisColor: '#ffffff',
                contentColor: '#999',
                legendColor: '#ffffff'
            }
        })
    }
</script>

<style scoped>
    .schart{
        width: 600px;
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