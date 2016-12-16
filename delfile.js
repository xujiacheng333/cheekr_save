var fs = require("fs")
var path = require('path')


module.exports = function () {

	//5天前日期
	var  last5day = new Date(new Date().getTime() - 86400000 * 5).toLocaleDateString()
	var last5daystr = last5day.split('-').join("") 


	try{
		var zippath = path.join(__dirname , "zip/"+last5daystr+".zip")
		fs.statSync(zippath)
		fs.unlinkSync(zippath)
		console.log("已删除"+zippath+".zip")

	}catch(e){
		// console.log(e)
		console.log("不存在过期的压缩包。跳过删除 "+zippath+".zip")
	}


	try{
		var sqlpath = path.join(__dirname , "sql/"+last5daystr+".sql")
		fs.statSync(sqlpath)
		fs.unlinkSync(sqlpath)
		console.log("已删除"+sqlpath+".zip")
	}catch(e){
		console.log("不存在过期的压缩包。跳过删除 "+zippath+".sql")
	}
}