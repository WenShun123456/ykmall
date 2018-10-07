const { mysql } = require('../qcloud')



module.exports = async (ctx, next) => {
	const {openId} = ctx.request.query;
	
	try {
		const cartList = 
		await mysql('cartlist')
		.select('cartlist.*','productlist.imageurl','productlist.title','productlist.discountprice')
		.join('productlist','cartlist.productId','productlist.id').where({openId});
		ctx.state.data = {
		 	cartList
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