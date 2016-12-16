// 用于比较服务器文件 和 客户端已备份文件的大小  确定有没损坏


var fs = require('fs')
var path = require('path')

// filename  要判断的文件名
// type 只有两种  zip或者sql 
// sftp 处理ssh任务的流
// callback  回调函数
module.exports = function (filename , type , sftp , callback) {
	var localpath = path.join(__dirname , "../" + type + "/" +filename+"." + type)
	var remotepath = "/var/www/save/" + type + "/" +filename+"." + type
	var localsize = fs.statSync(localpath).size  //本地文件大小

	sftp.stat(remotepath , function (err , stats) {
		if (err) {throw err}
		var remotesize = stats.size
		if (localsize === remotesize) {
			// console.log("两个文件大小相同")
			var anwser = true ;
		}else{
			// console.log("两个文件不相同")
			var anwser = false ;
		}
		callback(anwser)
	})

}
