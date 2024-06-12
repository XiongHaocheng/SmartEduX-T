<template>
  <div class="basic-info-container">

    <!-- 修改昵称对话框 -->
    <t-dialog header="更改昵称" :visible.sync="nameDialog" @close="closeNameDialog">
      <div>
        <t-form>
          <t-form-item label="新昵称" name="teacherName">
            <t-input placeholder="请输入新的昵称" size="large" v-model="teacherNewName" clearable />
          </t-form-item>
        </t-form>
        <div style="display: flex; justify-content: center; margin-top: 32px;">
          <t-button theme="primary" @click="submitTeacherName">提交</t-button>
        </div>
      </div>
    </t-dialog>

    <!-- 修改密码对话框 -->
    <t-dialog header="更改密码" :visible.sync="passwordDialog" @close="closePasswordDialog">
      <div>
        <t-form>
          <t-form-item label="原密码">
            <t-input placeholder="请输入原密码" type="password" v-model="password_fromData.original_password" />
          </t-form-item>
          <t-form-item label="新密码">
            <t-input :status="isOriginalPasswordSameAsNewPassword || isNotInputNewPassword ? 'warning' : 'success'"
              :tips="isOriginalPasswordSameAsNewPassword || isNotInputNewPassword ? '新密码与原密码相同or未输入新密码' : ''"
              placeholder="请输入新密码" type="password" v-model="password_fromData.new_password" />
          </t-form-item>
          <t-form-item label="确认新密码">
            <t-input :status="isNewPasswordSameAsConfirmPassword && !isNotInputNewPassword ? 'success' : 'warning'"
              :tips="isNewPasswordSameAsConfirmPassword && !isNotInputNewPassword ? '' : '两次输入的新密码不同or未输入新密码'"
              placeholder="请确认新密码" type="password" v-model="password_fromData.new_password_confirm" />
          </t-form-item>
        </t-form>
        <div style="display: flex;justify-content: center;margin-top: 32px;">
          <t-button theme="primary" :disabled="!isFormValid" @click="submitPassword">提交</t-button>
        </div>
      </div>
    </t-dialog>

    <!--信息展示-->
    <div style="display: flex; align-items: center;">
      <t-tabs :value="1">
        <t-tab-panel :value="1" label="基本信息">
        </t-tab-panel>
      </t-tabs>
      <div style="flex: 1;"></div>
      <div class="note" style="color: #ccc;">注销账号</div>
    </div>
    <div style="margin-top: 20px;">
      <div class="info-item-row" style="margin-top: 36px;">
        <span class="note" style="color: #5e5e5e; width:140px;">我的昵称</span>
        <div class="note">{{ teacherName }}</div>
        <div style="flex: 1;"></div>
        <div class="note" style="color: #5e5e5e" @click="onClickChangeTeacherName">点击修改</div>
      </div>
      <div class="info-item-row" style="margin-top: 36px;">
        <span class="note" style="color: #5e5e5e; width:140px;">手机号码</span>
        <div class="note">{{ teacherPhone }}</div>
        <div style="flex: 1;"></div>
        <div class="note" style="color: #5e5e5e">不可修改</div>
      </div>
      <div class="info-item-row" style="margin-top: 36px;">
        <span class="note" style="color: #5e5e5e; width:140px;">修改（设置）密码</span>
        <div style="flex: 1;"></div>
        <div class="note" style="color: #5e5e5e" @click="onClickChangePassword">点击修改</div>
      </div>
    </div>
  </div>
</template>


<script>
import { changeTeacherNameAPI ,updatePasswordAPI} from '@/apis/teacherHandler';
import { MessagePlugin } from 'tdesign-vue';
export default {
  name: 'TeacherPerson',
  data() {
    return {
      teacherID: null,
      teacherName: '',
      teacherPhone: '',
      nameDialog: false, // 控制修改昵称对话框的显示
      passwordDialog: false, // 控制修改密码对话框的显示
      teacherNewName: '', // 新昵称
      password_fromData: {
        original_password: "",
        new_password: "",
        new_password_confirm: "",
      }
    }
  },
  computed: {
    isNotInputNewPassword() {
      return this.password_fromData.new_password === ''
    },
    // 校验原密码和新密码是否相同
    isOriginalPasswordSameAsNewPassword() {
      return this.password_fromData.original_password === this.password_fromData.new_password
    },

    // 校验两次输入的新密码是否相同
    isNewPasswordSameAsConfirmPassword() {
      return this.password_fromData.new_password === this.password_fromData.new_password_confirm
    },

    isFormValid() {
      return !this.isOriginalPasswordSameAsNewPassword && this.isNewPasswordSameAsConfirmPassword && !this.isNotInputNewPassword
    }
  },
  created() {
    const teacher = localStorage.getItem('teacher');
    if (teacher) {
      // 解析JSON字符串为对象
      const teacherObject = JSON.parse(teacher);
      // 获取ID和名字
      this.teacherID = teacherObject.teacherid;
      this.teacherName = teacherObject.teachername;
      this.teacherPhone = teacherObject.teacherphone;
    } else {
      console.error('No teacher information found in localStorage');
    }
  },
  methods: {
    onClickChangeTeacherName() {
      this.teacherNewName = '';
      this.nameDialog = true;
    },
    onClickChangePassword() {
      this.password_fromData.original_password='';
      this.password_fromData.new_password='';
      this.password_fromData.new_password_confirm='';
      this.passwordDialog = true;
    },
    closeNameDialog() {
      this.nameDialog = false;
    },
    closePasswordDialog() {
      this.passwordDialog = false;
    },
    async submitTeacherName() {
      const response = await changeTeacherNameAPI(this.teacherID, this.teacherNewName)
      if(response.data.code == 0){
        this.teacherName = response.data.data
      }
      // 关闭对话框
      this.nameDialog = false;
    },
    async submitPassword() {
      await updatePasswordAPI(this.teacherPhone,this.password_fromData.original_password,this.password_fromData.new_password)
            .then(response => {
                if(response.data.code == 0){
                    var teacher = response.data.data
                     console.log(teacher);
                    this.$store.state.teacher = teacher
                    localStorage.setItem('teacher',JSON.stringify(teacher))
                    localStorage.setItem('token',teacher.usertoken)
                }else{
                  MessagePlugin.error(response.data.message);
                }
                
            })
            .catch(err=>{
                console.log(err);
            })
      // 关闭对话框
      this.passwordDialog = false;
    }
  }
}
</script>

<style scoped>
.basic-info-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px 30px 50px 30px;
}

.note {
  height: 14px;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  cursor: pointer;
  z-index: 20;
}

.info-item-row {
  display: flex;
  align-items: center;
}
</style>