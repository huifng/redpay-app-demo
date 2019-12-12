export function formatDate (timestamp) {
    let date = new Date(timestamp)
    let year = date.getFullYear()
    let month = date.getMonth() + 1 // 月份是从0开始的
    let day = date.getDate()
    let hour = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()
    let msec = date.getMilliseconds();
    if (month < 10) { month = '0' + String(month)}
    if (hour < 10) { hour = '0' + String(hour) }
    if (min < 10) { min = '0' + String(min) }
    if (sec < 10) { sec = '0' + String(sec) }
    let newTime = '' + year + month + day + hour + min + sec + msec
    
    return newTime 
}

