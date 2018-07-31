(function () {
	Date.prototype.format = function(format) {
		let o = {
			"M+": this.getMonth()+1,//month
			"d+": this.getDate(),//day
			"h+": this.getHours(),//hours
			"m+": this.getMinutes(),//minute
			"s+": this.getSeconds(),//seconds
			"q+": Math.floor((this.getMonth() +1 + 2) / 3),//quarter, 一个季度(3个月)
			"S": this.getMilliseconds() //millisecond
		}

		if(/(y+)/.test(format)){ 
			//匹配一个或者多个y
			format = format.replace(RegExp.$1, (this.getFullYear()+ '').substr(4-RegExp.$1.length));
			// eg: 1988-MM-dd hh:mm
		}
		for(var k in o){
			//获取每一个key值
			if(new RegExp(`(${ k })`).test(format)){
				//匹配月份，天，小时，分钟，秒，季度，毫秒
				format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00"+o[k]).substr((""+o[k]).length));
			}
		}

		return format;
	}
})();


function getDiffTime(recordTime, yearsFlag) {
	if(recordTime){
		recordTime = new Date(parseFloat(recordTime) * 1000);
		let minute = 1000 * 60, //1000毫秒 * 60秒
			hour = minute * 60,
			day = hour * 24, 
			now = new Date(),//此时
			diff = now - recordTime;
		let result = '';
		if(diff < 0){
			return result;
		}
		let weekR = diff / (7 * day);
		let dayC = diff / day;
		let hourC = diff / hour;
		let minC = diff / minute;

		if(weekR >= 1){ 
			// 参数一的时间与现在时差大于等于一周
			let formate = 'MM-dd hh:mm';
			if(yearsFlag){
				formate = 'yyyy-MM-dd hh:mm';
			}
			return recordTime.format(formate);
		}else if(dayC === 1 || (hourC < 24 && recordTime.getDate() != now.getDate())){ 
			//刚好相差一天或者小于24小时，并且但是和现在的时间不正好相等
			result = `昨天${ recordTime.format('hh:mm')}`;
			return result;
		}else if(dayC > 1){
			//大于一天的情况
			let formate = 'MM-dd hh:mm';
			if(yearsFlag){
				formate = 'yyyy-MM-dd hh:mm';
			}
			return recordTime.format(formate);
		}else if(hourC >= 1){
			//大于一小时的时差
			result = parseInt(hourC)+'小时前';
			return result;
		}else if(minC >= 1){
			//大于一分钟的时差
			result = parseInt(minC) + '分钟前';
			return result;
		}else{
			//小于一分钟的时差
			result = '刚刚';
			return result;
		}
	}
	return '';
}

module.exports = {
	getDiffTime: getDiffTime,
}

