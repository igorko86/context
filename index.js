document.querySelector(".colors").addEventListener("contextmenu",handler);
function showMenu(x,y,div){
    document.querySelector(".colors").innerHTML = div;
    document.querySelector(".menu").style.top = y+"px";
    document.querySelector(".menu").style.left = x +"px"
    document.addEventListener("mousedown",removeMenu);
    document.querySelector(".go").addEventListener("click",clickSwitch);
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
            }))
        }
        insert(it){
            let list = "";
            it.forEach(el=>{
                list +=`<li class="item remove">${el.item}</li>`
            })
            let div = `<div class="menu remove"><div class="up remove go">&#9650;</div><ul class="list remove">${list}</ul><div class="down remove go">&#9660;</div></div>`;
            showMenu(e.pageX,e.pageY,div);
        }
    } 
    const items  = new Items("items.json");
}
let down = 0;
let up = -38
function clickSwitch(e){
   console.log(e.target);
}
