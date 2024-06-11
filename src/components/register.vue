<template>
    <div id="register" style="display: flex; flex-direction: column; height: 100vh;">
        <!-- 标题部分 -->
        <div style="padding: 20px;box-shadow: 0 3px 6px rgb(0 0 0 / 15%);margin-bottom: 5px;">
            <p style="font-size: 28px;color: #0052d9;margin: 0;font-weight: bold;">Smart-Edu-X-教师端</p>
        </div>

        <!-- 内容部分，分为左右两列 -->
        <div style="flex: 1; display: flex;">
            <!-- 左侧部分 -->
            <div style="flex: 1; padding: 20px;background-color: #f9f9fc;">
                <div style="display: flex;margin-top: 100px;justify-content: center">
                    <img src="https://web-cdn.agora.io/sso/static/img/icon-free.png"
                        style="width: 100px;height: 100px;margin: 20px;" />
                    <img src="https://web-cdn.agora.io/sso/static/img/icon-code.png"
                        style="width: 100px;height: 100px;margin: 20px;" />
                    <img src="https://web-cdn.agora.io/sso/static/img/icon-inter.png"
                        style="width: 100px;height: 100px;margin: 20px;" />
                    <img src="https://web-cdn.agora.io/sso/static/img/icon-global.png"
                        style="width: 100px;height: 100px;margin: 20px;" />
                </div>

                <p style="text-align: center;font-size: 28px;font-weight: bold;color: #191919;line-height: 1.6;">
                    实时关注班级信息</p>
                <p style="text-align: center;color: #586376;font-size: 18px;line-height: 2.4;">Smart-Edu-X</p>
                <p style="text-align: center;color: #586376;font-size: 18px;line-height: 2.4;">学生管理、课程管理、考试记录、个人信息</p>

            </div>

            <!-- 右侧部分 -->
            <div style="flex: 1; padding: 20px;margin-left: 200px;margin-top: 50px;">
                <p class="registerText">创建新账号</p>
                <div style="margin-top: 2vh;">
                    <!-- 输入手机号 -->
                    <input v-model="teacherPhone" autocomplete="off" placeholder="请输入手机号" id="register-dialog_mobile"
                        aria-required="true" class="ant-input css-13vyxf7 ant-input-outlined" type="text" value=""
                        style="width: 60%; height: 54px; font-size: 16px;">
                    <!-- 输入用户名 -->
                    <input v-model="teacherName" autocomplete="off" placeholder="请输入用户名" id="login-dialog_name"
                        aria-required="true" class="ant-input css-13vyxf7 ant-input-outlined" type="text" value=""
                        style="width: 60%; height: 54px; font-size: 16px;margin-top: 2vh;">

                    <!--输入图形验证码-->
                    <div class="ant-space css-13vyxf7 ant-space-horizontal ant-space-align-baseline ant-space-gap-row-small ant-space-gap-col-small"
                        style="height: 54px;margin-top: 2vh;">
                        <div class="ant-space-item">
                            <div class="ant-form-item css-13vyxf7">
                                <div class="ant-row ant-form-item-row css-13vyxf7">
                                    <div class="ant-col ant-form-item-control css-13vyxf7">
                                        <div class="ant-form-item-control-input">
                                            <div class="ant-form-item-control-input-content">
                                                <input v-model="form.validCode" autocomplete="off" placeholder="请输入验证码"
                                                    id="register-dialog_sms" aria-required="true"
                                                    class="ant-input css-13vyxf7 ant-input-outlined" type="text"
                                                    value=""
                                                    style="width: 100%; height: 54px; margin-right: 90px; font-size: 16px;">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ValidCode @input="createValidCode" style="display: flex;justify-content: right;" />
                    </div>
                    <!--注册密码-->
                    <div style="position: relative;margin-top: 2vh;">
                        <input v-model="teacherPassword" autocomplete="off" placeholder="请设置账户密码"
                            id="register-dialog_password" aria-required="true"
                            class="ant-input css-13vyxf7 ant-input-outlined" type="password" value=""
                            style="width: 60%; height: 54px; font-size: 16px; ">

                        <!-- 小眼睛图标 -->
                        <span
                            style="position: absolute; top: 60%; right: 17vw; transform: translateY(-50%); cursor: pointer;"
                            @click="togglePasswordVisibility">
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="eye-invisible" width="1.5em"
                                height="1.5em" fill="currentColor" aria-hidden="true">
                                <!-- 显示密码明文时的眼睛图标 -->
                                <path v-if="showPassword" fill="#000000"
                                    d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z">
                                </path>
                                <!-- 显示密码暗文时的眼睛图标 -->
                                <path v-else fill="#000000"
                                    d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z">
                                </path>
                            </svg>
                        </span>

                    </div>
                    <!--同意隐私-->
                    <div class="flex-1 flex items-start" style="margin-top: 2vh;">
                        <div class="flex items-center h-5">
                            <label class="ant-checkbox-wrapper css-13vyxf7">
                                <span class="ant-checkbox ant-wave-target css-13vyxf7">
                                    <input class="ant-checkbox-input" type="checkbox">
                                    <span class="ant-checkbox-inner">

                                    </span>
                                </span>
                            </label>
                        </div>
                        <div class="ml-10 text-sm">
                            <label class="text-gray-normal">同意<a class="text-blue" target="_blank">《用户协议》</a>和<a
                                    class="text-blue" target="_blank">《隐私政策》</a>
                            </label>
                        </div>
                    </div>
                    <!--立即注册-->
                    <!-- <button class="RegisterButton" @click="onClickRegister()">立即注册</button> -->
                    <t-button block theme="primary" variant="base" size="large"
                        style="width: 60%;height: 54px;font-size: 16px;margin-top: 24px;"
                        @click="onClickRegister()">立即注册</t-button>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import ValidCode from "./Validate.vue";
import { teacherRegisterAPI } from "@/apis/teacherHandler"
export default {
    name: 'RegisterIndex',
    components: {
        ValidCode
    },
    data() {
        return {
            form: {},
            validCode: '',
            showPassword: false,
            teacherPhone: '',
            teacherName: '',
            teacherPassword: '',
        }
    },
    methods: {
        createValidCode(data) {
            this.validCode = data
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
            const passwordInput = document.getElementById('register-dialog_password');
            passwordInput.type = this.showPassword ? 'text' : 'password';
        },
        clearForm() {
            // 获取输入框元素
            var inputElements = document.querySelectorAll('.ant-input');

            // 遍历所有输入框，并清空其内容
            inputElements.forEach(function (input) {
                input.value = '';
            });
        },
        async onClickRegister() {
            // 获取复选框元素
            var checkbox = document.querySelector('.ant-checkbox-input');
            if (!checkbox.checked) {
                this.$message.warning("请仔细阅读用户协议和隐私政策")
                return
            }
            if (!this.teacherPhone) {
                this.$message.warning("请填写手机号")
                return
            }
            if (this.teacherPhone) {
                var phoneNumberPattern = /^\d{11}$/;
                if (!phoneNumberPattern.test(this.teacherPhone)) {
                    this.$message.warning("请输入正确的电话号码")
                    return
                }
            }
            if (!this.teacherName) {
                this.$message.warning("请填写用户名")
                return
            }
            if (!this.form.validCode) {
                this.$message.warning("请填写验证码")
                return
            }
            if (!this.teacherPassword) {
                this.$message.warning("请填写密码")
                return
            }
            if (this.form.validCode.toLowerCase() !== this.validCode.toLowerCase()) {
                this.$message.warning("验证码错误")
                return
            }

            await teacherRegisterAPI(this.teacherPassword, this.teacherPhone, this.teacherName)
                .then(res => {
                    if (res.data.code == 0) {
                        this.$router.push('/login')
                    }
                })

        }
    }
}
</script>

<style scoped>
.registerText {
    color: #191919;
    font-size: 24px;
    line-height: 1.15;
    font-weight: 400;
    margin-top: 50px;
}

.ant-space-gap-col-small {
    column-gap: 8px;
}

:where(.css-13vyxf7).ant-space-align-baseline {
    align-items: baseline;
}

.ant-space {
    display: inline-flex;
}

:where(.css-13vyxf7).ant-input-outlined:hover {
    border-color: var(--td-brand-color-5);
    background-color: #ffffff;
}

.ant-input:placeholder-shown {
    text-overflow: ellipsis;
}

:where(.css-13vyxf7).ant-input-outlined {
    background: #ffffff;
    border-width: 1px;
    border-style: solid;
    border-color: #d9d9d9;
}

:where(.css-13vyxf7).ant-input {
    box-sizing: border-box;
    margin: 0;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    position: relative;
    display: inline-block;
    width: 100%;
    min-width: 0;
    border-radius: 6px;
    transition: all 0.2s;
}

:where(.css-13vyxf7).ant-image .ant-image-img {
    width: 100%;
    height: auto;
    vertical-align: middle;
}



.flex {
    display: flex;
}

.items-center {
    align-items: center;
}

.h-5 {
    height: 1.25rem;
}

:where(.css-13vyxf7).ant-checkbox-wrapper {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    display: inline-flex;
    align-items: baseline;
    cursor: pointer;
}

.ant-checkbox-wrapper:after {
    display: inline-block;
    width: 0;
    overflow: hidden;
    content: '\a0';
}

.ant-checkbox {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1;
    list-style: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    position: relative;
    white-space: nowrap;
    cursor: pointer;
    border-radius: 4px;
    align-self: center;
}

:where(.css-13vyxf7).ant-checkbox .ant-checkbox-inner:after {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    inset-inline-start: 25%;
    display: table;
    width: 5.7142857142857135px;
    height: 9.142857142857142px;
    border: 2px solid #fff;
    border-top: 0;
    border-inline-start: 0;
    transform: rotate(45deg) scale(0) translate(-50%, -50%);
    opacity: 0;
    content: "";
    transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
}

.ml-10 {
    margin-left: 10px;
}

.text-sm {
    font-size: 14px;
    line-height: 20px;
}

.text-gray-normal {
    color: #666;
}

.text-blue,
.hover\:text-blue-600:hover {
    color: var(--td-brand-color-6);
    cursor: pointer;
}

.RegisterButton {
    border-radius: 5px;
    width: 100%;
    height: 54px;
    border-color: #3ca7fa;
    background-color: #3ca7fa;
    color: white;
    margin-top: 2vh;
    cursor: pointer;
}
</style>