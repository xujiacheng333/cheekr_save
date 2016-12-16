   var Client = require('ssh2').Client;
     
    var conn = new Client();
    conn.on('ready', function() {
      console.log('Client :: ready');

      //执行脚本shell
      // conn.exec('uptime', function(err, stream) {
      //   if (err) throw err;
      //   stream.on('close', function(code, signal) {
      //     console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      //     conn.end();
      //   }).on('data', function(data) {
      //     console.log('STDOUT: ' + data);
      //   }).stderr.on('data', function(data) {
      //     console.log('STDERR: ' + data);
      //   });
      // });

      conn.sftp(function(err, sftp) {
          if (err) throw err;
          sftp.readdir('/home/kevin', function(err, list) {
            if (err) throw err;
            console.dir(list);
            conn.end();
          });
        });

    }).connect({
      host: '192.168.81.129',
      port: 2610,
      username: 'kevin',
      password : "123456",
      // privateKey: require('fs').readFileSync('/here/is/my/key')
    });

