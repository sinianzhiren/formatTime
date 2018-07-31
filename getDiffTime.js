(function () {
	Date.prototype.format = function(format) {
		let o = {
			"M+": this.getMonth()+1,//month
			"d+": this.getDate(),//day
			

		}
	}
})();

function getDiffTime() {
	
}

module.exports = {
	getDiffTime: getDiffTime,
}