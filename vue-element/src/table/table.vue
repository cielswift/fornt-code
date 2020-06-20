<template>
	<div>
		<el-drawer title="修改用户信息" :before-close="handleClose" :visible.sync="dialog" direction="rtl" custom-class="demo-drawer"
		 ref="drawer" size="30%">
			<div class="demo-drawer__content">
				<el-form :model="form">
					<el-form-item label="活动名称" :label-width="formLabelWidth">
						<el-input v-model="form.name" autocomplete="off"></el-input>
					</el-form-item>

					<el-form-item label="活动时间" :label-width="formLabelWidth">
						<el-date-picker v-model="form.date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" autocomplete="off"></el-date-picker>
					</el-form-item>

					<el-form-item label="活动区域" :label-width="formLabelWidth">
						<el-select v-model="form.region" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</el-form>

				<div class="demo-drawer__footer">
					<el-button @click="cancelForm">取 消</el-button>
					<el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
				</div>
			</div>
		</el-drawer>

		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" show-overflow-tooltip>
			</el-table-column>

			<el-table-column prop="date" label="日期" width="120">
				<template slot-scope="scope">{{ scope.row._source.id }}</template>
			</el-table-column>

			<el-table-column prop="name" label="姓名" width="120">
				<template slot-scope="scope">{{ scope.row._source.content }}</template>
			</el-table-column>

			<el-table-column prop="address" label="地址" show-overflow-tooltip>
				<template slot-scope="scope">{{ scope.row._source.type }}</template>
			</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button class="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>

					<el-button class="el-icon-delete-solid" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">

					</el-button>

					<el-button size="small" type="success" @click="hw()"> 批量</el-button>

					<el-button class="el-icon-s-grid" type="infor" @click="showf(scope.row)">打开嵌套 Form 的 Drawer</el-button>

				</template>
			</el-table-column>

		</el-table>
		<div style="margin-top: 20px">
			<el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
			<el-button @click="toggleSelection()">取消选择</el-button>

			<el-button class="el-icon-s-flag" @click="fusk()"></el-button>
		</div>

		<div v-text="kuayu">

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				multipleSelection: [],
				form: {
					name: '',
					date: new Date(),
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				loading: false,
				formLabelWidth: '80px',
				timer: null,
				dialog: false,
				kuayu: ""
			}
		},

		methods: {
			toggleSelection(rows) {
				if (rows) {

					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
						console.log(row)
					});

				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleEdit(index, row) {
				console.log(index, row.name);
			},
			handleDelete(index, row) {
				console.log(index, row.name);
			},
			hw() {
				console.log("===================")
				this.multipleSelection.forEach(function(t, i) {
					console.log(t.name)
				}, this)
				console.log("===================")
			},
			handleClose(done) {
				if (this.loading) {
					return;
				}
				this.$confirm('确定要提交表单吗？')
					.then(_ => {
						this.loading = true;
						this.timer = setTimeout(() => {
							done();
							// 动画关闭需要一定的时间
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
			showf(row) {

				this.form.name = row.name
				this.form.date = new Date() // new Date(Date.parse(row.date.replace(/-/g,  "/")))

				this.dialog = true;
			},
			fusk() {

				// let obj = {
				// 		headers: {
				// 		//	Authentication: "eyJ0eXAiOiJKV1QiLCJhbGci",
				// 		"Content-Type": 'content-type:application/x-www-form-urlencoded'
				// 		},
				// 		 params: {
				// 		    username: "admin",
				// 		    password: "123456"	
				// 		   }
				// }

				// let vm = this;


				// const options = {
				//   method: 'POST',
				//   headers: { 'content-type': 'application/x-www-form-urlencoded' },
				//   data: qs.stringify(data),
				//   url: "http://127.0.0.1:8970/web/login"
				// };
				// axios(options);


				let p = {
					name: "admin",

				}
					
				this.$axios.post("http://127.0.0.1:29090/quick/hk", {name:"aa",age:12})
				.then(function(response) {

					console.log(response)
				})
				.catch(function(error) {
					// handle error
					console.log(error);
				})
				.then(function() {
					// always executed
				});
			}
		},
		created() {

			let vm = this;

			this.$axios.get('http://127.0.0.1:19200/cielswift/human/_search')
				.then(function(response) {
					// handle success
					console.log(response.data.hits.hits);

					vm.tableData = response.data.hits.hits
				})
				.catch(function(error) {
					// handle error
					console.log(error);
				})
				.then(function() {
					// always executed
				});
		}

	}
</script>
