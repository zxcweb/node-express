<template>
    <el-dialog :visible.sync="dialogVisible" center :before-close="handleClose">
        <div slot="title" style="font-size:18px;">
            用户注册
        </div>
        <el-form>
            <el-form-item>
                <el-input autocomplete="off" type="text" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input autocomplete="off" type="text" placeholder="请输入Email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input autocomplete="off" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input autocomplete="off" placeholder="请确认密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select placeholder="请选择身份" v-model="selectValue">
                    <el-option  value="y" label="员工">
                    </el-option>
                    <el-option  value="m" label="管理员">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSure" :loading="btnLoading">注 册</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: 'register',
        data() {
            return {
                dialogVisible: true,
                btnLoading: false,
                switchOnOff: false,
                selectValue:"y"
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
    .other-btn {
        display: flex;
        justify-content: space-between;
        span {
            font-size: 14px;
            color: #409EFF;
            cursor: pointer;
        }
    }
</style>