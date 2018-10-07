const { mysql } = require('../qcloud')



module.exports = async (ctx, next) => {
	const { id } = ctx.request.query;
	try {
		let productInfo = await mysql('productlist')
		.select().where({id})
		
		ctx.state.data = {
			productInfo 
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