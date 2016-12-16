var cronJob = require("cron").CronJob;  
var ssh = require('./ssh2')
var delfile = require('./delfile')


console.log("备份程序已启动，凌晨4点将执行程序，等待中......")

    try {
	// delfile()
  	ssh();

    } catch (e){
    	console.log(e)
    }

// 凌晨4点执行  
new cronJob('00 00 4 * * *', function () {  
        //your job code here 
        console.log("凌晨4点开始执行")
        try {
		delfile()
      	ssh();
        } catch (e){
        	console.log(e)
        }
}, null, true, 'Asia/Chongqing');  


//每秒钟执行一次  
// new cronJob('* * * * * *', function () {  
//         //your job code here 
        
// }, null, true, 'Asia/Chongqing');  