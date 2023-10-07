import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from "./gallery-items.js";
// Change code below this line
const listGallery = document.querySelector(`.gallery`);
const itemGallery = createMarkup(galleryItems);
listGallery.insertAdjacentHTML("beforeend", itemGallery);

function createMarkup(arr) {
  return arr
    .map(
      ({ original, preview, description }) => `
<li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
   </a>
</li>
`
    )
    .join("");
}

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
  close: false,
  enableKeyboard: true,
});
console.log(galleryItems);
