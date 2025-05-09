//блок сайта
let container = document.querySelector(".container");
//блок в котором будут храниться песни
let songsContainer = container.querySelector(".songs-container");
//все песни лежат здесь в массиве [,,,,]
let songs = songsContainer.querySelectorAll(".song");
//доступ к элементу нет песен
let noSongs = container.querySelector(".no-songs");
//кнопка добавления новой песни
let addButton = container.querySelector(".form__submit-btn_action_add");
//кнопка отчистки плейлиста
let resetButton = container.querySelector(".form__submit-btn_action_reset");
////////////////////////////////////ПЕРЕМЕННЫЕ/////////////////////////////////

renderNoSongs();

resetButton.addEventListener("click", function () {
  const songs = document.querySelectorAll(".song");
  for (let i = 0; i < songs.length; i++) {
    songs[i].remove();
  }
  renderNoSongs();
});

//при клике на кнопку добавить
//запускается безимянная функция, которая
//запускает функцию addSong,  в которую
//мы отправляем данные введенные в input поля
addButton.addEventListener("click", function () {
  let songInput = container.querySelector(".input__text_type_song");
  let artistInput = container.querySelector(".input__text_type_artist");

  // Проверка: оба поля должны быть заполнены
  if (artistInput.value.trim() === "" || songInput.value.trim() === "") {
    // Опционально: можно показать сообщение об ошибке
    alert("Пожалуйста, заполните оба поля: название песни и исполнитель.");
    return; // Прекращаем выполнение, если что-то пусто
  }

  addSong(artistInput.value, songInput.value);
  renderHasSongs();

  // Очищаем поля после добавления
  artistInput.value = "";
  songInput.value = "";
});

//обработка очистки плейлиста

resetButton.addEventListener("click", function () {
  const songs = document.querySelectorAll(".song");

  for (let i = 0; i < songs.length; i++) {
    songs[i].remove();
  }
  renderHasSongs();
});

// resetButton.addEventListener("click", function () {
//   console.log("Нажата кнопка Очистить");
// });

//  [song1, song2, song3,...] - это массив всех песен

//функция когда песни есть
function renderHasSongs() {
  noSongs.classList.add("no-songs_hidden");
  resetButton.removeAttribute("disabled");
  resetButton.classList.remove("button-disabled");
}
//функция когда песен нет
function renderNoSongs() {
  noSongs.classList.remove("no-songs_hidden");
  resetButton.setAttribute("disabled", true);
  resetButton.classList.add("button-disabled");
}

function addSong(artistInput, songInput) {
  let songTemplate = document.querySelector("#song-template").content;
  let songElement = songTemplate.querySelector(".song").cloneNode(true); //дубликат
  songElement.querySelector(".song__artist").textContent = artistInput;
  songElement.querySelector(".song__title").textContent = songInput;
  let songLikeButton = songElement.querySelector(".song__like");
  //коллбэк
  songLikeButton.addEventListener("click", function (event) {
    event.target.classList.add("song__like_active");
  });
  songsContainer.prepend(songElement);
}
