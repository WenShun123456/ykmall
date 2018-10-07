import qcloud from 'wafer2-client-sdk'
import config from '@/config.js'

function getUserInfo() {
	return new Promise((resolve, reject) => {
		if (!wx.getStorageSync('userInfo')) {
			qcloud.setLoginUrl(config.loginUrl)
			qcloud.login({
				success: function(userInfo) {
					console.log('登录成功')
					wx.setStorageSync('userInfo', userInfo);
					resolve(userInfo);
				},
				fail: function(err) {
					console.log('登录失败', err)
					reject(err);
				}
			});
		} else {
			resolve(wx.getStorageSync('userInfo'));
		}
	});
}
export default getUserInfo