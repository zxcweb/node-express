<template>
    <el-dialog :visible.sync="dialogVisible" center :before-close="handleClose">
        <div slot="title" style="font-size:18px;">
            用户登录
        </div>
        <el-form>
            <el-form-item>
                <el-input autocomplete="off" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <div class="other-btn">
                <el-switch v-model="switchOnOff" active-text="记住密码" inactive-text="">
                </el-switch>
                <span>注 册</span>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSure" :loading="btnLoading">登 录</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                dialogVisible: true,
                btnLoading: false,
                switchOnOff: false
            };
        },
        methods: {
            handleSure() {
                this.btnLoading = true;
                setTimeout(() => {
                    this.dialogVisible = false;
                    this.btnloading = false;
                }, 800)
            },
            handleClose(done) {
                done()
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-button {
        width: 100%;
    }
    .other-btn{
        display:flex;
        justify-content: space-between;
        span{
            font-size:14px;
            color:#409EFF;
            cursor:pointer;
        }
    }
    
</style>