const { mysql } = require('../qcloud')



module.exports = async (ctx, next) => {
	const { page } = ctx.request.query;
	const size = 4;
	try {
		let productList = await mysql('productlist')
		.select('id','imageurl','title','discountprice','price')
		.limit(size)
		.offset(Number(page) * size);
		ctx.state.data = {
			productList 
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