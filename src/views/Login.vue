<template>
	<div class="pagecontent">
		<div class="loginform">
			<el-form ref="form" :rules="rules" :model="loginform">
				<h3>系统登录</h3>
				<el-form-item prop="phoneNum">
					<el-input v-model="loginform.phoneNum" auto-complete="false" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="loginform.password" show-password uto-complete="false" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item prop="code">
					<el-input v-model="loginform.code" uto-complete="false" placeholder="请点击图片" style="width: 250px"></el-input>
					<!-- <img :src="captchaUrl" @click="updateCaptcha" /> -->
					<img class="captcha" src="../assets/code.png" @click="updateCaptcha" />
				</el-form-item>
				<el-checkbox v-model="checked" class="loginrememberme">记住我</el-checkbox>
				<el-button type="primary" style="width: 100%" @click="onSubmit">登录</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
	name: '',
	components: {},
	props: {},
	data() {
		return {
			captchaUrl: '/captcha?time=' + new Date(),
			loginform: {
				phoneNum: '15387116515',
				password: '123qwe',
				code: 'bb8a'
			},
			checked: true,
			rules: {
				phoneNum: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
				code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
			}
		}
	},
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		updateCaptcha() {
			this.captchaUrl = '/captcha?time=' + new Date()
		},
		// 登录
		onSubmit() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.Post('/api/TokenAuth/Authenticate', this.loginform)
						.then((res) => {
							// 在localStorage里存储token
							const tokenStr = 'Bearer' + res.data.result.accessToken
							localStorage.setItem('tokenStr', tokenStr)
							localStorage.setItem('router', JSON.stringify(res.data.result.bars))
							// 跳转首页
							let path = this.$route.query.redirect
							// 通过路由重定向,如果手动输入的地址为'/',或者路由找不到地址,则跳转至首页,否则跳转到对应地址
							this.$router.replace(path == '/' || path == undefined ? '/home' : path)
							this.$message.success('登录成功！')
						})
						.catch((err) => {
							this.$message.error({ message: err.response.data.error.message })
						})
				} else {
					this.$message.error('请输入所有字段！')
					return false
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.pagecontent {
	.loginform {
		width: 360px;
		border-radius: 15px;
		background-color: #fff;
		border: 1px solid #eaeaea;
		padding: 15px 35px;
		margin: 180px auto;
		box-shadow: 0 0 25px #ccc;
		h3 {
			margin: 5px 0 20px;
			text-align: center;
		}
		.loginrememberme {
			text-align: left;
			margin: 0 0px 15px 0;
		}
		.captcha {
			height: 40px;
			margin-left: 15px;
			cursor: pointer;
		}
		::v-deep .el-form-item__content {
			display: flex;
		}
	}
}
</style>
