import config from "../config";

const http = {
	get(url, data) {
		return new Promise((resolve, reject) => {
			wx.request({
				data,
				url: config.host + '/weapp' + url,
				success: function(res) {
					if (res.data.code == 0) {
						resolve(res.data)
					} else {
						reject(res.data)
					}
				}
			})
		});
	},
	post(url, data) {
		return new Promise((resolve, reject) => {
			wx.request({
				data,
				url: config.host + '/weapp' + url,
				method: 'POST',
				success: function(res) {
					if (res.data.code == 0) {
						resolve(res.data)
					} else {
						reject(res.data)
					}
				}
			})
		});
	}

}
export default http