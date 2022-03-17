<template>
	<div class="homepage">
		<el-container>
			<el-header class="homeHeader">
				<div class="title">管理系统</div>
				<el-dropdown class="userinfo" @command="handleCommand">
					<span class="el-dropdown-link">
						{{ user.name }} <i> <img :src="user.userFace" alt="" /> </i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
						<el-dropdown-item command="setting">设置</el-dropdown-item>
						<el-dropdown-item command="logout">注销</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-header>
			<el-container>
				<el-aside width="250px">
					<el-menu router unique-opened close="menu">
						<div v-for="(item, index) in route" :key="index">
							<el-submenu :index="index + ''" v-if="item.children.length > 0" v-show="!item.hidden">
								<template slot="title"
									><i :class="item.icon" style="color: #409eff"></i>
									<span>{{ item.name }}</span>
								</template>
								<el-menu-item :index="ite.path" v-for="(ite, ind) in item.children" :key="ind">{{ ite.name }}</el-menu-item>
							</el-submenu>
							<el-menu-item v-else :index="item.path">
								<i class="el-icon-setting"></i>
								<span slot="title">{{ item.name }}</span>
							</el-menu-item>
						</div>
					</el-menu>
				</el-aside>
				<el-main>
					<el-breadcrumb v-if="this.$router.currentRoute.path != '/home'">
						<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
						<el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>
					</el-breadcrumb>
					<template v-if="this.$router.currentRoute.path == '/home'">
						<div class="homemain">首页内容</div>
					</template>
					<router-view />
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
export default {
	name: '',
	components: {},
	props: {},
	data() {
		return {
			user: JSON.parse(localStorage.getItem('user'))
		}
	},
	computed: {
		route() {
			return this.$store.state.routes
		}
	},
	watch: {},
	created() {},
	mounted() {
		console.log(this.user)
	},
	methods: {
		handleCommand(command) {
			if (command == 'logout') {
				// 注销操作
				this.$confirm('此操作将退出系统, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(() => {
						localStorage.removeItem('user')
						localStorage.removeItem('tokenStr')
						localStorage.removeItem('router')
						this.$store.commit('initRoutes', [])
						this.$router.replace('/')
						this.$message({
							type: 'success',
							message: '退出登陆成功!'
						})
					})
					.catch(() => {
						this.$message({
							type: 'info',
							message: '已取消退出'
						})
					})
			}
		}
	}
}
</script>

<style lang="less" scoped>
.homepage {
	height: 100%;
	.homeHeader {
		background-color: #409eff;
		display: flex;
		align-items: center;
		padding: 0 15px;
		box-sizing: border-box;
		justify-content: space-between;
		.title {
			font-size: 30px;
			font-family: 楷体;
			color: white;
		}
		.userinfo {
			cursor: pointer;
			display: flex;
			align-items: center;
			.el-dropdown-link {
				display: flex;
				align-items: center;
				color: #fff;
				font-size: 16px;
				img {
					width: 50px;
					height: 50px;
					border-radius: 25px;
					margin-left: 8px;
				}
			}
		}
	}
	.el-menu {
		height: calc(100vh - 60px);
	}
	.homemain {
		text-align: center;
		box-sizing: border-box;
		font-size: 50px;
		color: #409eff;
		padding-top: 50px;
		font-family: 楷体;
	}
}
</style>
