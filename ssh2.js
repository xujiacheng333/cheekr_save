var Client = require('ssh2').Client;
var fs = require("fs")
var Promise = require("bluebird")
var conn = Promise.promisifyAll(new Client() , {suffix:"A"});
var path = require('path')
var checkfilesize = require('./modules/check_size')
// var conn = new Client();







module.exports = function () {


	//时间
	var now = new Date().toLocaleDateString()
	var nowstr = now.split('-').join("") 
	
	conn.onA('ready')
	  .then(()=>{
	    console.log('顺利链接服务器')
	  })
	  .then(()=>{
	  	try{
	  		console.log("正在备份"+nowstr+".zip")
  		    //下载备份
  		    return new Promise(function (resolve,reject) {
  		    	conn.sftpA()
  		    		.then((sftp)=>{
  		    			var savezip = sftp.createReadStream("/var/www/save/zip/"+nowstr+".zip" ,{
  				            autoClose:false 
  				          })
  		    			var writestream_savezip = fs.createWriteStream(path.join(__dirname , "./zip/"+nowstr+".zip"))
    			 	 	savezip.pipe(writestream_savezip ,{end:false})
    			 	 	savezip.on("end" , ()=>{
    			 	 		checkfilesize(nowstr , "zip" ,sftp ,function (anwser) {
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
	   
	  })
	  .then((anwser)=>{
	  	console.log("第一个文件是否正确下载？")
	  	console.log(anwser)
	  })
	  .then(()=>{
	  	try{
	  		console.log("正在备份"+nowstr+".sql")
	   		return new Promise(function (resolve,reject) {
	  	    	conn.sftpA()
	  	    		.then((sftp)=>{
	  	    			var savezip = sftp.createReadStream("/var/www/save/sql/"+nowstr+".sql" ,{
	  			            autoClose:false 
	  			          })
	  	    			 var writestream_savezip = fs.createWriteStream(path.join(__dirname , "./sql/"+nowstr+".sql"))
	  	    			 savezip.pipe(writestream_savezip ,{end:false})
	  	    			 savezip.on("end" , ()=>{
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
	  })
	  .then((anwser)=>{
	  	console.log("第二个文件是否正确下载？")
	  	console.log(anwser)
	  	console.log("已关闭")
	  	conn.end();
	  })
	  .catch((err)=>{
	    console.log(err)
	  })






	conn.connect({

		//测试服务器
	  // username: 'kevin',
	  // port: 22,
	  // host: "192.168.3.27",
	  // password: '123456'

	  //cheekr服务器
	  username: 'root',
	  port: 2610,
	  host: "118.244.213.68",
	  password: 'a12345678!'
	})

}



// .then(()=>{
//   //压缩
//   return new Promise(function (resolve, reject) {
//     conn.execA('zip -r /var/www/html/wordpress_save.zip /var/www/html/wordpress')
//     .then((stream)=>{
//       stream.on('finish', function() {
//         console.log("复制完毕")
//         resolve()
//       })
//     }).catch((err)=>{
//       console.log(err)
//     })
//   })
// })