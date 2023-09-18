import "./style.css";

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

function playSound() {
  sound.play();
}

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("inp-word").value;
  // console.log(inpWord);
  result.classList.toggle("active");
  fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
      <div class="word">
          <h3>${inpWord}</h3>
          <button onClick="(function(){
            console.log('CLicked sound btn');
            sound.play();
        })();">
            <i class="material-symbols-outlined">volume_up </i>
          </button>
      </div>
      <div class="details">
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p>${data[0].phonetic}</p>
      </div>
      <p class="word-meaning">
        ${data[0].meanings[0].definitions[0].definition}
      </p>
      <p class="word-example">
        ${data[0].meanings[0].definitions[0].example || ""}
      </p>`;
      sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    })
    .catch((result.innerHTML = `<h3>Sorry...couldn't find the word!</h3>`));
});
