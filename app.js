// variables pinta cartas
const palo = ['♥', '♦', '♣', '♠'];
const cartaN=[1,2,3,4,5,6,7,8,9,10,11,12,13];

//cvariables de ejecucion
const card= document.createElement('div')
const pintaJ =document.querySelector('#draw-button')
const muestraC =document.querySelector('#sort-button')
const Input= document.querySelector('#num-cards')
const cartasSelec= document.querySelector('#area-card')
//const cartasSort= document.querySelector('#area-sort')
const delet=document.querySelector('#reset-button')


//variable para ordenar utilizado para bublesort
let Deskpanel=[]

// aqui funcion de crear baraja de num x user
const generaCard=(valor)=>{
    let baraja=[]
for(let i=0;i< valor; i++){
    const aleatN=Math.round(Math.random()*12);
    const aleatC =Math.round(Math.random()*3);
    const palos=palo[aleatC]
    const cartas=cartaN[aleatN]
   
        baraja.push(palos +'  '+cartas)
    }
   Deskpanel.push(baraja)
    return baraja
}

//pintamos en tablero accion principal
const pintaTablero=()=>{ 
    pintaJ.addEventListener('click', () => {
        let arr1=[]   
        let numCards = Input.value;
        let cartasAll = generaCard(numCards);
       // Deskpanel= generaCard(numCards);
    
        console.log("num cartas + baraja", numCards,cartasAll)
        const cartasAll2= cartasAll

       // separadas= cartasAll2[0].toString().split(/\,/)
       // console.log("separads son:", separadas)
        cartasAll2.forEach(element => {
                let separCards = element.split(" ");
                console.log("soy all crads separadas",separCards)
                let cardElement = document.createElement('div');
                cardElement.classList.add('card');
            
                if (element.includes("♥") || element.includes("♦")) {
                  cardElement.style.color = "red";
                } else {
                  cardElement.style.color = "black";
                }
            
                if (separCards[separCards.length-1] == 1) {
                  separCards[separCards.length-1] = "A"
                } else if (separCards[separCards.length-1] == 11) {
                  separCards[separCards.length-1] = "J"
                } else if (separCards[separCards.length-1] == 12) {
                  separCards[separCards.length-1] = "Q"
                } else if (separCards[separCards.length-1] == 13) {
                  separCards[separCards.length-1] = "K"
                }
              //  console.log("soy:",separCards[0],separCards[separCards.length-1])
        //console.log("All",arr1);
        cardElement.innerHTML = `
      <div style="position: absolute; top: 0; left: 0;">${separCards[0]}</div>
      <div id="nCards" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: black;">${separCards[separCards.length-1]}</div>
      <div style="position: absolute; bottom: 0; right: 0;">${separCards[0]}</div>
    `;
    cartasSelec.appendChild(cardElement);
    })
})}

const limpiaTablero=()=>{
 
 cartasSelec.innerHTML= "" 
 cartasSort.innerHTML= ""

}

const muestraOrden=()=>{ 
         muestraC.addEventListener('click',()=>{
            
            //console.log("que traigo",Arra1) 
             console.log("ordeno cartas")
           // let n =Deskpanel.length;
           
            let ordenCards=[]
            const clonCartaselect = cartasSelec.cloneNode(true)
            const nodoCards =clonCartaselect.querySelectorAll('div.card')

              nodoCards.forEach(nodo =>{
                let carta2={}

                let texV =nodo.querySelector("#nCards").innerText


               if(texV === 'A'){
                carta2['valor']= 1
                carta2['carta']= nodo
               }else if(texV === 'J'){
                carta2['valor']= 11
                carta2['carta']= nodo
               }else if(texV === 'Q'){
                carta2['valor']= 12
                carta2['carta']= nodo
               }else if(texV === 'K'){
                carta2['valor']= 13
                carta2['carta']= nodo
               }else {
                carta2['valor']= parseInt(texV)
                carta2['carta']= nodo
               }
               
               ordenCards.push(carta2)
               })
           // let orden2=[]
            let aux= 0
            let n = ordenCards.length
          // console.log("paso1",n)
            for (let k = 1; k < n; k++) {
           //   console.log("paso2")
              for (let i = 0; i < (n - k); i++) {
             //   console.log("valor carta",ordenCards[i + 1].valor, ordenCards[i].valor)
                  if (ordenCards[i].valor > ordenCards[i + 1].valor) {
                      aux = ordenCards[i];
                      ordenCards[i] = ordenCards[i + 1];
                      ordenCards[i + 1] = aux;

                      // aqui va codigo nuevo de iteracion

                      let cardElement = document.createElement('div');
            
                      ordenCards.forEach(element => {
                        const clonCardelem = element.carta.cloneNode(true)
                        cardElement.appendChild(clonCardelem);
                    });
                  // cartasSort.appendChild(cardElement)
                  }
              }
          }

          // aqui esta el orden de lista de cartas
          cartasSelec.innerHTML= ""
        ordenCards.forEach(element => {
       cartasSelec.appendChild(element.carta);
        });
} ) }
          
       
const borraNum =()=>{
    delet.addEventListener('click',()=>{
     Input.value= " "
    //cardElement.innerHTML=" "    
        console.log("limpie data")
        limpiaTablero()
    })
    
}

window.onload = function(){
    pintaTablero()
    muestraOrden()
    borraNum()
    
}

