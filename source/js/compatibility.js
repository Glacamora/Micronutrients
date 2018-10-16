var vitamins = [];

document.addEventListener("DOMContentLoaded", ready);

function ready() {
  getVitamins();

  var element1 = document.querySelector("#element1");
  element1.addEventListener("focus", function(event){
    this.value = "";
  });

  var button = document.querySelector(".form__btn");

  button.addEventListener("click", function(event){
    buttonClickHandler(event);
  });
}

function buttonClickHandler(event){
  event.preventDefault();

  var element1 = document.querySelector("#element1").value;
  var element2 = document.querySelector("#element2").value;

  for(var index in vitamins){
    var vitamin = vitamins[index]
    var name = vitamin.name;

    if((name[0] === element1 && name[1] === element2) ||
      (name[1] === element1 && name[0] === element2)){
        showInformation(vitamin);
    }
  }
}

function showInformation(vitamin){
  var compatibility = document.querySelector(".main__compatibility");
  var interaction = document.querySelector(".main__interaction");

  compatibility.innerHTML = vitamin.compatibility;
  interaction.innerHTML = vitamin.descrition;

  compatibility.classList.remove("main__description-text_positive");
  compatibility.classList.remove("main__description-text_neitral");
  compatibility.classList.remove("main__description-text_negative");

  if(vitamin.compatibility === "Положительная"){
    compatibility.classList.add("main__description-text_positive");
  }

  if(vitamin.compatibility === "Нейтральные"){
    compatibility.classList.add("main__description-text_neitral");
  }

  if(vitamin.compatibility === "Отрицательная"){
    compatibility.classList.add("main__description-text_negative");
  }
}

function getVitamins(){
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'data.json', true);

  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
      alert("Упс");
    } else {
      vitamins = JSON.parse(xhr.responseText);
    }
  }
}
