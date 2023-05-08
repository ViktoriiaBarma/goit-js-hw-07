import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);
const galleryContainer = document.querySelector(".gallery");
const itemsMarkup = createGalleryItemsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", itemsMarkup);
galleryContainer.addEventListener("click", onImgClick);

function createGalleryItemsMarkup(elem) {
  return elem
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}
function onImgClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") return;

  if (!e.target.classList.contains("gallery__image")) return;

  const currentImgUrl = e.target.dataset.source;

  const instance = basicLightbox.create(
    `
	<img src="${currentImgUrl}" width="1280" height="auto"/>
      `,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEscKeyPress);
      },
      onClose: (instance) => {
        window.removeEventListener('keydown', onEscKeyPress);
      
      },
    }
  );
  instance.show();

  function onEscKeyPress(e) {
    if (e.code !== "Escape") return;
    instance.close();
  }
}
