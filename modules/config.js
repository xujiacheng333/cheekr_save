//测试中、、
var path = require('path')

function _path () {
	
}

_path.prototype.remote = function (filename) {
	return path.join("/var/www/html/" , filename)
}
_path.prototype.local = function (filename) {
	return path.join(__dirname , filename)
}

module.exports = _path