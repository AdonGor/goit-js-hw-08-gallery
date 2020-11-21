// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

import galleryItems from "./galleryItem.js";

const galleryItemList = document.querySelector(".js-gallery");
const modalWindow = document.querySelector('.js-lightbox');
const modalOverlay = document.querySelector('.lightbox__overlay');
const openModalImage = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('button[data-action="close-lightbox"]');
let activeIndex;
// создание items для списка galleryItems:
const itemList = ({original, preview, description},index) => `<li class="gallery__item"><a class ="gallery__link"><img class="gallery__image" src ="${preview}" data-source="${original}" data-index="${index}" alt ="${description}"></li>`;
const galleryMarkup = galleryItems.reduce((acc, item) => acc + itemList(item), "");
galleryItemList.insertAdjacentHTML("afterbegin", galleryMarkup);
// действия при клике на изображение:
galleryItemList.addEventListener('click', (event) => {
  if (event.target.nodeName !== 'IMG') {
    event.preventDefault();
    return;
  }
// открытие картинки:
openModalImage.src = event.target.dataset.source;
openModalImage.alt = event.target.alt;
// открытие модалки при клике на элемент списка:  
  openModal();
  activeIndex = Number(event.target.dataset.index);
//кнопка закрытия:
    closeModalBtn.addEventListener('click', closeModal);
// закрытие при клике на модалку:
    modalOverlay.addEventListener('click', onBackDropClickClose);
// закрытие модалки при нажатии на Escape:
    window.addEventListener('keydown', onKeyPress);
})

function openModal() {
  window.addEventListener('keydown', onKeyPress);
  modalWindow.classList.add('is-open');
}

function closeModal() {
  modalWindow.classList.remove("is-open");
  window.removeEventListener('keydown', onKeyPress);
  openModalImage.src = '';
  openModalImage.alt = '';
}

function onBackDropClickClose(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}  

function onKeyPress(event) {
  switch (event.code) {
    case 'Escape':
      closeModal();
      break;

    case 'ArrowRight':
      activeIndex + 1 === galleryItems.length
        ? (activeIndex = 0)
        : (activeIndex += 1);
        openModalImage.src = galleryItems[activeIndex].original;
      break;

    case 'ArrowLeft':
      activeIndex === 0
        ? (activeIndex = galleryItems.length - 1)
        : (activeIndex -= 1);
        openModalImage.src = galleryItems[activeIndex].original;
      break;
  }
}

// добавить контроллы <  img  >?
// Добавить функционал, что бы снять класс\ проверить куда кликнули и текущий литерал?\ если не совпадает - снять 

// при клике в картинку получить индекс с пролистывания

console.log(activeIndex);








