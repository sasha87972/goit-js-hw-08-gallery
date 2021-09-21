import images from './app.js';


const imgGallery = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.js-lightbox');
const modalImg = document.querySelector('.lightbox__image');
const modalCloseBtn = document.querySelector('[data-action="close-lightbox"]');
const modalOverlay = document.querySelector('.lightbox__overlay');
let srcList = [];
let index = 0;

imgGallery.addEventListener('click', clickOnImg);
modalOverlay.addEventListener('click', modalClose);
modalCloseBtn.addEventListener('click', modalClose);
document.addEventListener('keydown', modalKeyDown);

// Gallery markup 

const makeGalleryCard = ({ preview, original, description }) => {
    const galleryItemEl = document.createElement('li');
    galleryItemEl.classList.add('gallery__item');
    const galleryLinkEl = document.createElement('a');
    galleryLinkEl.classList.add('gallery__link');
    const galleryImgEl = document.createElement('img');
    galleryImgEl.classList.add('gallery__image');

    galleryLinkEl.href = original;

    galleryImgEl.src = preview;
    galleryImgEl.alt = description;
    galleryImgEl.dataset.source = original;

    srcList.push({ index, original, description });
    index += 1;

    galleryLinkEl.appendChild(galleryImgEl);
    galleryItemEl.appendChild(galleryLinkEl);

    return galleryItemEl;
}

const gallery = images.map(makeGalleryCard);

imgGallery.append(...gallery);

// Modal mouse events functions

function clickOnImg(event) {
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    event.preventDefault();
    modalWindow.classList.add('is-open');
    modalImg.src = event.target.dataset.source;
    modalImg.alt = event.target.alt;
}

function modalClose() {
    modalWindow.classList.remove('is-open');
    modalImg.src = '';
    modalImg.alt = '';
}

// Modal key events functions

function modalKeyDown(event) {
    const imageIndex = +(srcList.find(el => el.original === modalImg.src).index);

    if (modalWindow.classList.contains('is-open')) {

        switch (event.code) {
            case 'Escape':
                modalClose();
            case 'ArrowLeft':
                clickLeft(imageIndex);
            case 'ArrowRight':
                clickRight(imageIndex);
        }              
    } 
}
function clickLeft(imageIndex) {
    let prevImageIndex = imageIndex - 1;
    if (prevImageIndex === -1) {
    prevImageIndex = srcList.length - 1;
  }
    modalImg.src = srcList[prevImageIndex].original;
    modalImg.alt = srcList[prevImageIndex].description;
}
function clickRight(imageIndex) {
    let nextImageIndex = imageIndex + 1;
   if (nextImageIndex === srcList.length) {
    nextImageIndex = 0;
  }
    modalImg.src = srcList[nextImageIndex].original;
    modalImg.alt = srcList[nextImageIndex].description;
}
