const canvas = document.getElementById("canvas")
canvas.width = window.innerWidth-60 ;
canvas.height= 460;

let context = canvas.getContext("2d");
let start_background_col ="white";
context.fillStyle = start_background_col;
context.fillRect(0,0,canvas.width, canvas.height);



let draw_color = "black";
let draw_width = "2";
let is_drawing = false;


canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', draw, false);

canvas.addEventListener("touchend",stop,false);
canvas.addEventListener("mouseup",stop,false);
canvas.addEventListener("mouseout",stop,false);


function draw(e){
    if(is_drawing ){
        context.lineTo(e.clientX - canvas.offsetLeft , e.clientY - canvas.offsetTop)
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
    e.preventDefault();
}

function start(e){
    is_drawing = true;
    context.beginPath();
    context.moveTo();
    context.moveTo(e.clientX - canvas.offsetLeft , e.clientY - canvas.offsetTop)

    e.preventDefault();
}


function stop(e){
    if(is_drawing){
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    e.preventDefault();
    if(e.type != 'mouseout'){
        restore_array.push(context.getImageData(0,0,canvas.width, canvas.height));
        index++;
    }
   
}

function change_color(e)
{
    draw_color = e.style.background;
}

function clear_canvas(){
    context.fillStyle = "start_background_col";
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillRect(0,0,canvas.width,canvas.height);

    restore_array =[];
    index = -1;
}

let restore_array =[];
let index =-1;

function undo(){
    if(index <= 0){
        clear_canvas();
    }
    else{
        index -= 1;
        restore_array.pop();
        context.putImageData(restore_array[index], 0 , 0)
    }
}