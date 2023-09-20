import "./style.css";

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const btn = document.getElementById("search-btn");
const result = document.getElementById("result");
const noResult = document.getElementById("no-result");
// const word = document.getElementById("word");
// console.log(word);

function playSound(sound) {
  sound.play();
}

btn.addEventListener("click", async () => {
  let inpWord = document.getElementById("inp-word").value;
  // console.log(inpWord);
  let word = document.getElementById("word");
  try {
    const x = await fetch(`${url}${inpWord}`);
    noResult.style.display = "none";
    result.style.display = "block";
    console.log("x.ok:", x.ok);
    if (!x.ok) {
      throw new Error("Status code error :" + x.status);
    }
    const data = await x.json();
    console.log("Data:", data);
    let start = Date.now();
    let details = document.querySelector("#details");
    console.log(details);
    let _details = details.querySelectorAll("p");
    let wordMeaning = document.getElementById("word-meaning");
    console.log("word meaning:", wordMeaning);
    let wordExample = document.getElementById("word-example");
    let soundBtn = document.getElementById("sound-btn");
    let noSoundBtn = document.getElementById("no_sound-btn");
    word.innerHTML = data[0].word;
    _details[0].innerHTML = data[0].meanings[0].partOfSpeech;
    _details[1].innerHTML = data[0].phonetic;
    wordMeaning.innerHTML = data[0].meanings[0].definitions[0].definition;
    wordExample.innerHTML = data[0].meanings[0].definitions[0].example || "";
    let audio = data[0].phonetics[0].audio;
    console.log("Audio:", audio);
    if (audio != "") {
      soundBtn.style.display = "block";
      noSoundBtn.style.display = "none";
      let soundSrc = new Audio(data[0].phonetics[0].audio);
      console.log("Sound Src:", soundSrc);
      soundBtn.onclick = () => {
        soundSrc.play();
      };
    } else {
      console.log("No sound");
      soundBtn.style.display = "none";
      noSoundBtn.style.display = "display";
      console.log("nosoundBtn:", noSoundBtn);
      // soundBtn.style.display = "none";
    }

    let timeTaken = Date.now() - start;
    console.log("Total time taken : " + timeTaken + " milliseconds");
  } catch (error) {
    result.style.display = "none";
    noResult.style.display = "block";
    noResult.innerHTML = `<h3>Sry...couldn't find the word!!</h3>`;
    console.log("Error caught:", error);
  }
});
