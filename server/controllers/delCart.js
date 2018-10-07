const { mysql } = require('../qcloud')



module.exports = async (ctx, next) => {
	const { id } = ctx.request.body;
	try {
		await mysql('cartlist').where({id}).del();
		ctx.state.data = {
			msg: 'ok' 
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