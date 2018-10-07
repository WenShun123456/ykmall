const { mysql } = require('../qcloud')



module.exports = async (ctx, next) => {
	const addressInfo = ctx.request.body;
	try {
		await mysql('addresslist').insert(addressInfo);
		ctx.state.date = {
			msg : 'ok'
		}
	} catch(e) {
		ctx.state = {
			code: -1,
			data: {
				err: e
			}
		}
	}
}