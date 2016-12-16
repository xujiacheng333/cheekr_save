//测试中。。

var Promise = require('bluebird')
var conn = Promise.promisifyAll(new Client() , {suffix:"A"});
var path = require('path')
var checkfilesize = require('./modules/check_size')
var config = require('./modules/config')



module.exports = function (filename) {

  	try{
  		console.log("正在备份"+ filename)
   		return new Promise(function (resolve,reject) {
  	    	conn.sftpA()
  	    		.then((sftp)=>{
  	    			// var savefile = sftp.createReadStream("/var/www/save/sql/"+nowstr+".sql" ,{
  	    				//测试文件
  	    			var savefile = sftp.createReadStream( config.remote("index.html")  ,{
  			            autoClose:false 
  			          })
  	    			 // var writestream_savezip = fs.createWriteStream(path.join(__dirname , "./sql/"+nowstr+".sql"))
  	    			 //测试路径
  	    			 var writestream_savezip = fs.createWriteStream(config.local("index.html"))
  	    			 savefile.pipe(writestream_savezip ,{end:false})
  	    			 savefile.on("end" , ()=>{
			 	 		checkfilesize(nowstr , "sql" ,sftp ,function (anwser) {
			 	 			resolve(anwser)
			 	 		})
  	    			 })
  	    		})
  	    		.catch((err)=>{
  	    			console.log(err)
  	    		})
	    	})
  	}catch(e){
  		console.log(e)
  	} 		
}