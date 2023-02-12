

const inputList = document.querySelector(".input-list") //umumi inpudan gelenlerin duweceyi list












// ________________________________DRAG and DROP________________________________________________

const setDragDrop = (el) => {
    el.setAttribute('draggable', 'true')    //atribut yaradiram true valusu ile
    el.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text', e.target.id);      //buludlar))
    }, false)
  
     el.addEventListener('dragover', (e) => {   //lazimdir
        e.preventDefault()
     })
  
    el.addEventListener('drop', (e) => {
      e.preventDefault();
      let sourceId=e.dataTransfer.getData("text");  //get edirem
      const childNodesArr = [...document.getElementById("parent").childNodes]   //node listen array edirem
      const sourceIndex = childNodesArr.findIndex(el => el.id === sourceId);    // tapir o elementi ki, onun id-si beraberdir qonaq gelen elementin id-sine
      
      document.getElementById("parent").replaceChild(document.getElementById(sourceId), e.currentTarget)    //sourceId=secdiyimizi   sourceIndex=ustune atdigimiz ile yerini deiw
      
      document.getElementById("parent").insertBefore(e.currentTarget,document.getElementById("parent").childNodes[sourceIndex]);    //hardan click etmiwdik ora append edir
    })
  }

  
// =======================================================================================================
// =======================================================================================================















// __________________LOCAL STORAGE YAZSIN_______________________________________

let todoList = []  //Local storage ucun array
const initialData = localStorage.getItem('list'); //Local storage dan item alir

if (initialData) {                     //eger local storage da value varsa onlari parse et deyir
    todoList = JSON.parse(initialData);  //todoLise parse et deyir
    renderTodos(todoList);
}

function renderTodos(todosMassivi) {
    todosMassivi.forEach((element, index) => {
        const liEl = document.createElement("li");  //li yarad

        liEl.id = Math.random() + index;
        setDragDrop(liEl)
        




        liEl.innerText = element;   //li elementinin daxiline valilari yaz
        const spanEl = document.createElement("span");  //span yarad
        spanEl.innerHTML = "&times"; //spana innerHtml yaz
        spanEl.addEventListener('click', (e) => {
            e.target.parentElement.remove();       //parent elementi remove ele
            todoList = todoList.filter(item => item !== element)    //filter edib silinen spanin parentini siyahidab cixardir
            localStorage.setItem('list', JSON.stringify(todoList))  //Local storaga siyahini yeniliyib verir
        })
        liEl.appendChild(spanEl); //append span ele
        inputList.appendChild(liEl);    //append li element ele

        
        
    });
}
// =======================================================================================================
// =======================================================================================================















// ________________________DOBAVIT EDENDE ELAVE OLUNSUN______________________________

let inputValue = document.querySelector(".input-value") //inputa verilen deyer
const btn1 = document.querySelector(".add-list")   //dobavit duymesi

function btnfunck(event) {
    inputValue.value = inputValue.value.replace(/[^aA-zZ 0-9]/g, "").toLowerCase()
    inputValue.value = inputValue.value.charAt(0).toUpperCase() + inputValue.value.slice(1);

    if (inputValue.value !== "") {
        const liEl = document.createElement("li");  //li yarad
        liEl.textContent = inputValue.value;    //valunu linin icine yaz
        inputList.appendChild(liEl);    //input listin icine lileri yaz
        
        const spanEl = document.createElement("span");  //span yarad
        spanEl.innerHTML = "&times";    //(x)-i spanin icine yaz
        liEl.appendChild(spanEl);   //lilerin icine spani yaz
        
        liEl.id = Math.random() + 1;
        setDragDrop(liEl)
        todoList.push(inputValue.value);    //inputun valusunu todo listin icine at
        localStorage.setItem('list', JSON.stringify(todoList))  //Local storage yenile

        spanEl.addEventListener('click', (e) => {
            let delSpanX = e.target.parentElement.innerHTML.split('<span>')[0];     //spanin parent elementinin valusunu al
            e.target.parentElement.remove();    // spanin parent elementini sil
            todoList = todoList.filter(item => item !== delSpanX)   //silinen parent elmentini(lini) siyahidan cixart
            localStorage.setItem('list', JSON.stringify(todoList))  //Local starage tezele
        })

        inputValue.value = ""; //input valu setirini temizle
    }
}
btn1.addEventListener("click", btnfunck);

// =======================================================================================================
// =======================================================================================================















// _________________________Enter ile iwlesin_________________________

inputValue.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault
        btnfunck()
    }
});

// =======================================================================================================
// =======================================================================================================














// ___________________SORT ETMEK UCUN FUNKCIYA_________________________
const sortImage = document.querySelector(".image")
let balans = true

function sortMyList() {
    const liList = document.querySelectorAll(".input-list>li")    //NodeList(3) [li, li, li]
    let arayFromHtml = [...liList]  //[li, li, li]

    if (balans) {
        balans = false;
        sortImage.src = "./img/Group 73.png";
        let sortingList = arayFromHtml.sort((a, b) => (
            (a.innerText > b.innerText) ? 1 : -1
        ))
        inputList.innerHTML = ""    //input listi temizle

        for (let li of sortingList) {   //indi ise bir bir lileri yeniden tap
            inputList.appendChild(li)   //bir bir yaraf
        }
    } else {
        balans = true;
        sortImage.src = "./img/Group 91.png";
        let sortingList = arayFromHtml.sort((a, b) => (
            (a.innerText < b.innerText) ? 1 : -1
        ))
        
        inputList.innerHTML = ""
        for (let li of sortingList) {
            inputList.appendChild(li)
        }
    }
}
sortImage.addEventListener("click", sortMyList)

// =======================================================================================================
// =======================================================================================================
