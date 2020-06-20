<template>
	<div>
		<el-upload
		  class="upload-demo"
		  ref="upload"
		  action="http://pos.xvo2o.com/serveMasses/problem/input/batch"
		  :on-preview="handlePreview"
		  :on-remove="handleRemove"
		  :name="'problem'"
		  :headers="head"
		  :auto-upload="false">
		  <el-button slot="trigger" size="small" type="primary">选取文件 dd</el-button>
		  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
		</el-upload>

		<el-button type="primary" @click="get_depts()">aaa</el-button>
	</div>
</template>
<script>
  export default {
    data() {
      return {
		head: {
			Authentication: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqd3RMb2FkIjoie1widXNlcklEXCI6XCIxMjQ4MTM2OTY0ODkzMzY4MzIyXCIsXCJ1c2VybmFtZVwiOlwiYWRtaW4yXCJ9IiwicmFuZG9tX3N0ciI6IjY1ZjkwN2UxYzQ5Nzk3NjFmZTkyZjExZmVkZTM5MGY1IiwiZXhwIjoxNTg3MzAzNDg0LCJpYXQiOjE1ODcyODU0ODR9.m1Rqq4qNf8psQazhgZZov2cpLJZGF_xkdufOOrxX7Lo",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "*",
			"Access-Control-Allow-Headers" : "*"
		},
		obj: {
			headers: {
				Authentication: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqd3RMb2FkIjoie1widXNlcklEXCI6XCIxMjQ1MTY0ODg5MzQ1ODQzMjAyXCIsXCJ1c2VybmFtZVwiOlwiYWRtaW5cIn0iLCJyYW5kb21fc3RyIjoiNzE4ZTdkYTEyMGY4YzE1MWUxNzY3MDA4YTAzOGM5YzUiLCJleHAiOjE1ODczMTU4MDEsImlhdCI6MTU4NzI5NzgwMX0.KhVs8V7Z1JIH1h57Uzb4JCPzOw3GGZU2uI4jWXU-lMM",
			}
		},
      };
    },
    methods: {
		get_depts() {
			let vm = this;
			this.$axios.get("http://127.0.0.1:9011/serveMasses/problem/input/list?page=1&limit=20", vm.obj)
				.then(function(response) {
					debugger
					console.log(response)
				});
		},
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }


  }
</script>