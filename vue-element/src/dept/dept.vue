<template>
	<div>
		<el-drawer title="新增部门" :before-close="handleClose" :visible.sync="dialog" direction="rtl" custom-class="demo-drawer"
		 ref="drawer" size="30%">
			<div class="demo-drawer__content">
				<el-form :model="form">
					<el-form-item label="s部门名称" :label-width="formLabelWidth">
						<el-input v-model="form.dept_name" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
					
				<div class="demo-drawer__footer">
					<el-button @click="cancelForm">取 消</el-button>
					<el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
				</div>
			</div>
		</el-drawer>
		
		<el-button class="el-icon-s-grid" type="infor" @click="dialog=!dialog">新增部门</el-button>
		
		<el-select v-model="value" placeholder="请选择部门">
			<el-option v-for="item in options" :key="item.dep_id" :label="item.dep_name" :value="item.dep_id">
			</el-option>
		</el-select>
		
		<el-button class="el-icon-s-grid" type="infor" @click="refl_l()">刷新</el-button>

		<el-table :data="depts" border style="width: 100%">
			<el-table-column prop="dep_id" label="部门ID" width="180">
				<template slot-scope="scope">{{ scope.row.dep_id }}</template>
			</el-table-column>
			<el-table-column prop="dep_name" label="部门名称" width="180">
				<template slot-scope="scope">{{ scope.row.dep_name }}</template>
			</el-table-column>
			<el-table-column prop="create_time" label="创建时间">
				<template slot-scope="scope">{{ scope.row.create_time }}</template>
			</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">
					<!-- <el-button class="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)">
						
					</el-button> -->

					<el-button class="el-icon-delete-solid" size="small" type="danger" @click="del_dept(scope.$index, scope.row)">
					</el-button>


				</template>
			</el-table-column>

		</el-table>

		<el-pagination :page-size="pager.page_size" :current-page="pager.current_page"  
					@current-change="next_page" :pager-count="5"
			background  
		  layout="prev, pager, next"
		  :total="pager.total">
		</el-pagination>
		
	</div>
</template>

<script>
	export default {
		
		props: ["token"],
		data() {
			return {
				depts: [],
				options: [],
				value: '',
				obj: {
					headers: {
						Authentication: "",
					}
				},
				pager: {
					// 当前页	
					current_page: 1,
					// 每页条数
					page_size: 5,
					// 总页数
					page_count: 1,
					// 总记录数
					total: 1
				},
				form:{
					dept_name:"",
				},
				dialog: false,
				loading: false,
				formLabelWidth: '80px',
				timer: null,
				kuayu: ""
			}
		},
		methods: {
			refl_l(){
				this.dept_select();
				this.get_depts(1,5);
			},
			
			next_page(cu_rr){
				this.get_depts(cu_rr, this.pager.page_size)
			},
		
			handleClose(done) {
				
				let vm = this; 
				
				if (this.loading) {
					return;
				}
				this.$confirm('确定要提交表单吗？')
					.then(_ => {
						this.loading = true;
						this.timer = setTimeout(() => {
							done();
							// 动画关闭需要一定的时间
								
							vm.add_dept();
							
							setTimeout(() => {
								this.loading = false;
							}, 400);
						}, 2000);
					})
					.catch(_ => {});
			},
			cancelForm() {
				this.loading = false;
				this.dialog = false;
				clearTimeout(this.timer);
			},
		
			//检查token
			check_token(response) {
				let vm = this;
				if (response.headers.authentication != null && response.headers.authentication != undefined) {
					console.log("reset token")
					vm.obj.headers.Authentication = response.headers.authentication;
				}
			},
			
			add_dept(){
				
				let vm = this;
				this.$axios.post("http://127.0.0.1:9011/web/department", "depName="+vm.form.dept_name,vm.obj)
					.then(function(response) {
				
					    vm.check_token(response);
						vm.get_depts(vm.pager.current_page, vm.pager.page_size)
					});
			},
			
			//获取数据
			get_depts(current_page, page_size) {

				let vm = this;
				this.$axios.get("http://127.0.0.1:9011/web/department/list?page=" + current_page + "&limit=" + page_size, vm.obj)
					.then(function(response) {

						vm.depts = response.data.data.list;
						vm.pager = response.data.data.pager;
							
					    vm.check_token(response);
					});
			},
			
			//删除
			del_dept(index, roz) {

				let vm = this;

				this.$axios.delete("http://127.0.0.1:9011/web/department/" + roz.dep_id, vm.obj)
					.then(function(response) {
						
						 vm.check_token(response);
						vm.get_depts(vm.pager.current_page, vm.pager.page_size)

					})
					.catch(function(error) {
						// handle error
						console.log(error);
					})
					.then(function() {
						// always executed
					});

			},
			dept_select(){
					let vm = this;
				this.$axios.get("http://127.0.0.1:9011/web/department/select", vm.obj)
					.then(function(response) {
					
						vm.options = response.data.data;
						 vm.check_token(response);
					});
			}
		},
		created() {
			let vm = this;

			this.dept_select();		
			this.get_depts(vm.pager.current_page, vm.pager.page_size);
			
			let ms = {
			    ms: "mssss",
			    ks: "mssss",
			}
			
			this.$htp.put("ms/{ms}/{ks}", ms,this.$htp.path, this.obj,function (response) {
			
			    console.log(response);
			  
			});
			
		},
		watch:{
			token(ne,ol){
				this.obj.headers.Authentication = ne; 
			}
		}
	}
</script>
