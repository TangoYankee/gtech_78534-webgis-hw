const RING = "#652B19";
const HANDS = "#C05621";
const PRIMARY = "#F7FAFC";
const FONT = '#171923';

const drawBody = (ctx, radius) => {
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = PRIMARY;
    ctx.fill();
};

const drawFace = (ctx, radius) => {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = PRIMARY;
    ctx.fill();

    ctx.strokeStyle = RING;
    ctx.lineWidth = radius * 0.06;
    ctx.stroke();

    ctx.strokeStyle = PRIMARY;
    ctx.lineWidth = radius * 0.005;
    ctx.stroke();
}

const drawTicks = (ctx, radius) => {
    ctx.beginPath();
    ctx.strokeStyle = HANDS;
    const tickRadius = radius * 0.96; 
    const topTickWidth = radius * 0.01;
    const topTickLength = tickRadius - (tickRadius*0.05);
    const medTickWidth = topTickWidth * 0.75;
    const medTickLength = topTickLength * 1.03;
    const lowTickWidth = topTickWidth * 0.25;
    const lowTickLength = topTickLength * 1.05;
    
    const ticks = 360;
    for(let tick = 0; tick < ticks; tick++) {
        let tickLength;
        if(tick % 30 === 0) {
            tickLength = topTickLength
            ctx.strokeWidth = topTickWidth;
        }
        else if(tick % 6 === 0){
            tickLength = medTickLength;
            ctx.strokeWidth = medTickWidth;
        } else {
            tickLength = lowTickLength
            ctx.strokeWidth = lowTickWidth;
        }
        const angle = tick * Math.PI / 180;
        ctx.moveTo(Math.cos(angle) * tickLength, Math.sin(angle) * tickLength);
        ctx.lineTo(Math.cos(angle) * tickRadius, Math.sin(angle) * tickRadius);
        ctx.stroke();
    }
}

const drawNumbers = (ctx, radius) => {
    ctx.font = `${radius * 0.14}px georgia`;
    ctx.fillStyle = FONT;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    fontRadius = radius * 0.80;

    const hours = 12;
    for(let hour = 1; hour <= hours; hour++) { 
        const angle = hour * Math.PI / 6;
        ctx.rotate(angle);
        ctx.translate(0, -fontRadius);

        ctx.rotate(-angle);
        ctx.fillText(hour.toString(), 0, 0);

        ctx.rotate(angle);
        ctx.translate(0, fontRadius);
        ctx.rotate(-angle);
    }
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const drawDate = (ctx, radius) => {
    ctx.font = `${radius * 0.11}px georgia`;
    const now = new Date();
    const day = now.getDay();
    const date = now.getDate();

    ctx.moveTo(0, 0);
    ctx.fillText(`${DAYS[day]} ${date}`, -(radius * 0.5), 0);
} 

const drawHand = (ctx, pos, length, width) => {
    ctx.beginPath();
    ctx.strokeStyle = HANDS;
    ctx.lineWidth = width;
    ctx.lineCap = "square";

    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

const drawTime = (ctx, radius) => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const milliSecond = now.getMilliseconds();

    let displayHour = hour%12;
    displayHour = (displayHour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(6*60*60)) + (milliSecond*Math.PI/(6*60*60*1000));
    drawHand(ctx, displayHour, radius*0.5, radius*0.07);

    let displayMinute = (minute*Math.PI/30)+(second*Math.PI/(30*60)) + (milliSecond*Math.PI/(30*60*1000));
    drawHand(ctx, displayMinute, radius*0.8, radius*0.07);

    let displaySecond = (second*Math.PI/30) + (milliSecond*Math.PI/(30*1000));
    drawHand(ctx, displaySecond, radius*0.9, radius*0.02);
}

const drawCenter = (ctx, radius) => {
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.075, 0 , 2 * Math.PI);
    ctx.fillStyle = RING;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.02, 0 , 2 * Math.PI);
    ctx.fillStyle = PRIMARY;
    ctx.fill();
}

const drawClock = (ctx, radius) => {
    drawBody(ctx, radius);
    drawFace(ctx, radius);
    drawTicks(ctx, radius);
    drawNumbers(ctx, radius);
    drawDate(ctx, radius);
    drawTime(ctx, radius);
    drawCenter(ctx, radius);
}

document.addEventListener("DOMContentLoaded",() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const radius = canvas.height / 2;
    ctx.translate(radius, radius);

    const interiorRadius = radius * 0.90;
    const runClock = () => drawClock(ctx, interiorRadius)
    // Sixty frames per second appears continuous
    setInterval(runClock, 16);
});
