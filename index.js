class Clock {
    constructor(selector) {
        this.el = document.querySelector(selector);
        this.init()
    }
    get doms() {
        return {
            hours: this.el.querySelector('.hours'),
            minutes: this.el.querySelector('.minutes'),
            seconds: this.el.querySelector('.seconds')
        }
    }
    init() {
        this.update();
        setInterval(this.update.bind(this), 1000);

    }
    update() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let day = date.getDay();
        let dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let month = date.getMonth();
        let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let year = date.getFullYear();
        let dayOfMonth = date.getDate();
        let dayOfWeek = dayName[day];
        let monthOfYear = monthName[month];
        let yearOfDate = year;
        let dayOfYear = date.getDay();

        let hoursDegree = (hours + 3) * 30;
        let minutesDegree = (minutes + 15) * 6;
        let secondsDegree = (seconds + 15) * 6;
        this.doms.hours.style.transform = `rotate(${hoursDegree}deg)`;
        this.doms.minutes.style.transform = `rotate(${minutesDegree}deg)`;
        this.doms.seconds.style.transform = `rotate(${secondsDegree}deg)`;

        /*Time*/
        // this.doms.time.innerHTML = `${hours}:${minutes}:${seconds}`;
        /*Date*/
        // this.doms.date.innerHTML = `${dayOfMonth} ${monthOfYear} ${yearOfDate}`;
        // this.doms.day.innerHTML = `${dayOfWeek}`;
        // this.doms.dayOfYear.innerHTML = `${dayOfYear}`;
        // this.doms.clock.style.background = `linear-gradient(to right, #000000 ${hoursDegree}deg, #ffffff ${hoursDegree}deg)`;
        // this.doms.clock.style.color = `linear-gradient(to right, #ffffff ${hoursDegree}deg, #000000 ${hoursDegree}deg)`;

    }
}

class Typer{
    constructor(data,selector){
        this.data = data;
        this.el = document.querySelector(selector);
        this.startIndex = Math.floor(Math.random() * this.data.length);
        this.init()
    }
    get currentStr(){
        if(Typer.instance){
            if(this.startIndex > this.data.length-1){
                this.startIndex = 0;}
            return this.data[this.startIndex++]
        }else{
            Typer.instance = this;
            return this.data[this.startIndex++]
        }
    }
    init(){
        this.start(this.currentStr)

    }
    start(str){
        let typeTarget = this.el.querySelector('.typing');
        let cursor = this.el.querySelector('.cursor');
        cursor.removeAttribute('hidden')
        typeTarget.textContent = '';
        let index = 0;
        let timer = setInterval(() =>{
            if(index>str.length){
                clearInterval(timer);
                this.back(str,this.start.bind(this))
                return;
            }else{
                typeTarget.textContent += str.charAt(index++);
            }
        },300)

    }
    back(str,onBackComplete){
        let typeTarget = this.el.querySelector('.typing');
        let index = str.length;
        let timeout = setTimeout(() =>{
            let timer = setInterval(() =>{
                if(index<0){
                    clearInterval(timer);
                    onBackComplete(this.currentStr);
                    return;
                }else{
                    typeTarget.innerHTML = str.substring(0, index--);
                }
            },50);
        },1000)
    }
}