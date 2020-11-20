import galleryItems from "./galleryItem.js";

const galleryContainer = document.querySelector(".js-gallery");

galleryContainer.insertAdjacentHTML("beforeend", createGalleryMarkup(galleryItems));

galleryContainer.addEventListener("click", openModal);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ original, preview, description }) => {
      return `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
        `;
    })
    .join('');
}

const modalButton = document.querySelector(".lightbox__button");
modalButton.addEventListener("click", closeModal);


const modalOpenEvent = document.querySelector(".js-lightbox");
const modalImage = document.querySelector(".lightbox__image");


function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  document.addEventListener("keydown", closeModal);

  modalOpenEvent.classList.add("is-open");
  modalImage.src = event.target.dataset.source;
  modalImage.alt = event.target.alt;
}

function closeModal(event) {
  event.preventDefault();
  document.removeEventListener("keydown", closeModal);
  modalOpenEvent.classList.remove("is-open");
  modalImage.src = "";
}