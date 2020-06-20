<template>
	<div>
		<el-button class="el-icon-s-grid" type="infor" @click="refl_l()">刷新</el-button>
		<el-form :model="working" :rules="rules" ref="working" label-width="100px" class="demo-ruleForm">
			<el-form-item label="人员姓名" prop="name">
				<el-input v-model="working.name"></el-input>
			</el-form-item>

			<el-form-item label="性别" prop="gender">
				<el-select v-model="working.gender" placeholder="性别" style="width: 100%;">
					<el-option label="女" :value="0"></el-option>
					<el-option label="男" :value="1"></el-option>
				</el-select>
			</el-form-item>
				
			<el-form-item label="身份证号" prop="id_card">
				<el-input v-model="working.id_card"></el-input>
			</el-form-item>

			<el-form-item label="手机号" prop="phone">
				<el-input v-model="working.phone"></el-input>
			</el-form-item>


			<el-form-item label="部门" prop="dep_id">
				<el-select v-model="working.dep_id" placeholder="请选择部门" style="width: 100%;">
					<el-option v-for="item in depts" :key="item.dep_id" :label="item.dep_name" :value="item.dep_id">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="职务名称" prop="office_name">
				<el-input v-model="working.office_name"></el-input>
			</el-form-item>

			<el-form-item label="职务级别" prop="office_level">
				<el-input v-model="working.office_level"></el-input>
			</el-form-item>

			<el-form-item label="籍贯" prop="hometown">
				<el-input v-model="working.hometown"></el-input>
			</el-form-item>

			<el-form-item label="政治面貌" prop="political">
				<el-input v-model="working.political"></el-input>
			</el-form-item>

			<el-form-item label="微信" prop="wechat">
				<el-input v-model="working.wechat"></el-input>
			</el-form-item>

			<el-form-item label="邮箱" prop="email">
				<el-input v-model="working.email"></el-input>
			</el-form-item>

			<el-form-item label="学历" prop="education">
				<el-input v-model="working.education"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submitForm('working')">提交</el-button>
				<el-button @click="resetForm('working')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		props: ["token"],
		data() {
			return {
				obj: {
					headers: {
						Authentication: "",
						"content-type": "application/x-www-form-urlencoded"
					}
				},
				working: {
					name: '',
					dep_id: '',
					id_card: '',
					office_name: '',
					office_level: "",
					phone: "",
					gender: 0,
					hometown: "",
					political: "",
					wechat: "",
					email: "",
					education: ""
				},
				depts: [],
				rules: {
					name: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 10,
							message: '长度在 3 到 10 个字符',
							trigger: 'blur'
						}
					],
					gender: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					dep_id: [{
						required: true,
						message: '请选择部门',
						trigger: 'change'
					}],
					phone: [{
							required: true,
							message: '请输入电话',
							trigger: 'blur'
						},
						{
							min: 11,
							max: 11,
							message: '11位手机号',
							trigger: 'blur'
						}
					]
				}
			};
		},
		methods: {
			refl_l() {
				this.get_worn();
				this.get_depts();
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let vm = this;
						this.$axios.post("http://127.0.0.1:9011/web/worker", vm.working, vm.obj)
							.then(function(response) {
								debugger
								console.log("okkkkkkkkkkkkkk");
							});
					} else {
						this.$message.error('必要的值未填写');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			get_depts() {
				let vm = this;
				this.$axios.get("http://127.0.0.1:9011/web/department/select", vm.obj)
					.then(function(response) {
						vm.depts = response.data.data;
					});
			},
			get_worn() {
				let vm = this;
				this.$axios.get("http://127.0.0.1:9011/web/worker/2", vm.obj)
					.then(function(response) {
						vm.working = response.data.data;
					});
			}
		},
		created() {

			this.get_worn();
			this.get_depts();
		},
		watch: {
			token(ne, ol) {
				this.obj.headers.Authentication = ne; //监控token
			}
		}
	}
</script>
