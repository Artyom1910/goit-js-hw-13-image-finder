import './styles.css';
import refs from './js/refs';
import debounce from 'lodash.debounce';
import imageService from './js/apiService';
import updateImagesMarkup from './js/updateImagesMarkup';
import lightbox from './js/lightbox';
import { error, info } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';

const loadBtn = {
  show() {
    refs.loadButton.classList.remove('is-hidden');
  },
  hide() {
    refs.loadButton.classList.add('is-hidden');
  },
};

const spinner = {
  show() {
    refs.spinner.classList.add('spinner-border');
  },
  hide() {
    refs.spinner.classList.remove('spinner-border');
  },
};

document.forms['search-form'].addEventListener('submit', event =>
  event.preventDefault(),
);

refs.searchInput.addEventListener(
  'input',
  debounce(() => {
    imageService.query = refs.searchInput.value.trim();

    clearImagesContainer();
    imageService.resetPage();

    if (refs.searchInput.value.trim() === '') {
      loadBtn.hide();
      info({
        text: 'Please enter a valid searchkey!',
        delay: 2000,
        hide: true,
      });
      return;
    }

    fetchImages();
  }, 500),
);

refs.loadButton.addEventListener('click', fetchImages);

function fetchImages() {
  loadBtn.hide();
  spinner.show();

  imageService
    .fetchImages()
    .then(images => {
      if (!images.length) {
        loadBtn.hide();
        error({
          text: 'Sorry! Can`t find any matches! Please try again!',
          delay: 2000,
          hide: true,
        });
        return;
      }

      const lastHeight =
        refs.galleryList.offsetTop + refs.galleryList.offsetHeight;

      updateImagesMarkup(images);

      loadBtn.show();

      window.scrollTo({
        top: lastHeight,
        behavior: 'smooth',
      });
    })

    .finally(() => {
      spinner.hide();
    });
}

function clearImagesContainer() {
  refs.galleryList.innerHTML = '';
}

lightbox();
