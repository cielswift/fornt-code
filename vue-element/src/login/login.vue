<template>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
  
   <el-form-item label="密码">
		<el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
   </el-form-item>
   
  <el-form-item>
    <el-button type="primary" @click="onSubmit">登录</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>

</template>
<script>
  export default {
    data() {
      return {
        form: {
          username: 'admin',
          password: '123456',
		  obj: {
		  	headers: {
		  		"content-type": "application/x-www-form-urlencoded"
		  	}
		  },
        }
      }
    },
    methods: {
      onSubmit() {
        let vm = this;
        this.$axios.post("http://127.0.0.1:9011/web/login", "username="+vm.form.username+"&password="+vm.form.password,vm.obj)
        	.then(function(response) {
        
				vm.$emit("set_token",response.headers.authentication)   
        	});
      }
    }
  }
</script>
