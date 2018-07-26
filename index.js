document.querySelector(".colors").addEventListener("contextmenu",handler);
let objColors;
function showMenu(x,y,div){
    document.querySelector(".colors").innerHTML = div;
    document.querySelector(".menu").style.top = y+"px";
    document.querySelector(".menu").style.left = x +"px"
    document.addEventListener("mousedown",removeMenu);
    document.addEventListener("mousedown",removeMenu);
    document.querySelector(".down").addEventListener("click",downSwitch);
    document.querySelector(".up").addEventListener("click",upSwitch);
    document.querySelector(".list").addEventListener("click",getColor);
}
function removeMenu(e){
       if(!e.target.classList.contains("remove")){
        const el = document.querySelector(".menu");
        document.querySelector(".colors").removeChild(el);
        document.removeEventListener("mousedown",removeMenu);
    }
}
function handler(e){
    event = event || window.event;
    e.preventDefault();
    class Items{
        constructor(fileJson){
            fetch(fileJson).then(result=>result.json().then(it=>{
                this.it = it,
                this.insert(it);
                objColors = it;
            }))
        }
        insert(it){
            let list = "";
            it.forEach(el=>{
                list +=`<li class="item remove">${el.color}</li>`
            })
            let div = `<div class="menu remove"><div class="up remove">&#9650;</div><ul class="list remove">${list}</ul><div class="down remove">&#9660;</div></div>`;
            showMenu(e.pageX,e.pageY,div);
        }
    } 
    const items  = new Items("items.json");
   
}
function downSwitch(){
   scroll(-1);
}
function upSwitch(){
   scroll(1);
}
let currentScroll = 0;
const visibleItems = 6;
function scroll(offset){
    const list = document.querySelector(".list");
    const itemHeight = parseInt(getComputedStyle(document.querySelector(".item")).height);
    const colectionLi = document.querySelectorAll(".list li");
    let hideElements = colectionLi.length - visibleItems;
    currentScroll = currentScroll+(offset*itemHeight);
    list.style.top = currentScroll  + "px";
    document.querySelector(".up").style.display = currentScroll== 0?"none":"block";
    document.querySelector(".down").style.display = currentScroll == -(hideElements * itemHeight)?"none":"block";
}

function getColor(e){
    const liText = e.target.innerHTML;
    const colors = document.querySelector(".colors");
    objColors.forEach(el=> colors.style.background = el[liText]);
}
