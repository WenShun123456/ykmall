const { mysql } = require('../qcloud')



module.exports = async (ctx, next) => {
	const { openId } = ctx.request.query;
	try {
		let addressList = await mysql('addresslist').select().where({openId});
		ctx.state.data = {
			addressList 
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