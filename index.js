document.querySelector(".colors").addEventListener("contextmenu",handler);
function showMenu(x,y,div){
    document.querySelector(".colors").innerHTML = div;
    document.querySelector(".menu").style.top = y+"px";
    document.querySelector(".menu").style.left = x +"px"
    document.addEventListener("mousedown",removeMenu);
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
            let div = `<div class="menu remove"><div class="up remove">&#9650;</div><ul class="list remove">${list}</ul><div class="down remove">&#9660;</div></div>`;
            showMenu(e.pageX,e.pageY,div);
        }
    } 
    const items  = new Items("items.json");
}

