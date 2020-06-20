<template>
  <div id="app">
    <div>
		
	  <login v-on:set_token="set_token"></login>
	  
	<!--  <formazz></formazz>
	<tabzz></tabzz> -->
	
	<dept :token="token"></dept>
	
		<worn :token="token"></worn>
		
		<uploz></uploz>
    </div>
  </div>
	
	
</template>

<script>
	
export default {

  data(){
	  return {
		  token:"",
	  }
  },	
 
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    },
	set_token(token){
		this.token = token;
	}
  },
  components: {  
        formazz:require('./form/form.vue').default  ,
		tabzz:require('./table/table.vue').default  ,
		dept:require('./dept/dept.vue').default ,
		worn:require('./dept/workr.vue').default ,
		login:require('./login/login.vue').default ,
		uploz:require('./form/upload.vue').default ,
    },
	created() {
		
		this.$htp.axios=this.$axios;   //替换自己封装的;
		
		let vm = this;
		
		//添加请求拦截器
		// axios.interceptors.request.use（function（config）{
		//      //在发送请求之前做某事
		//      return config;
		//    }，function（error）{
		//      //请求错误时做些事
		//      return Promise.reject（error）;
		//    }）;
		 
		//添加响应拦截器
		this.$axios.interceptors.response.use(function (response) {
			
			console.log("interceptors-------------------------- token")
			if (response.headers.authentication != null && response.headers.authentication != undefined) {
				console.log("--------------------------reset token")
				vm.token = response.headers.authentication;
			}
			return response;
		  }, function (error) {
		    console.log("error-----------------------")
		    return Promise.reject(error);
		  });
		  
		  
		
		  
	}
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
