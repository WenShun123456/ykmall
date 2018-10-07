const { mysql } = require('../qcloud')



module.exports = async (ctx, next) => {
	const { id, openId } = ctx.request.body;
	try {
		await mysql('addresslist').where({openId}).update({isdefault:false});
		await mysql('addresslist').where({id}).update({isdefault:true});
		ctx.state.data = {
			msg: "ok" 
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