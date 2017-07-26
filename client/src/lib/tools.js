	export function convertToTime(sec){
    sec = Number(sec);		
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor(sec % 3600 / 60);
    let seconds = Math.floor(sec % 3600 % 60);

		const times = [hours, minutes, seconds].map(time => time < 10 ? "0" + time : time);

    const hourShow = times[0] > 0 ? times[0] + ":" : "00:";
    const minuteShow = times[1] > 0 ? times[1] + ":" : "00:";
    const secondShow = times[2] > 0 ? times[2] : "00";

    return hourShow + minuteShow + secondShow; 
	}