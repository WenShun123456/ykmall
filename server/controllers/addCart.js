const { mysql } = require('../qcloud')



module.exports = async (ctx, next) => {
	const cartInfo = ctx.request.body;
	
	try {
		const selectCart = await mysql('cartlist').select().where({productId:cartInfo.productId})	
		if(selectCart.length != 0){
			console.log('savething')
			await mysql('cartlist')
			.update({count:(~~selectCart[0].count + ~~cartInfo.count)})
			.where({productId:cartInfo.productId});
		}else{
			await mysql('cartlist').insert(cartInfo);
		}
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