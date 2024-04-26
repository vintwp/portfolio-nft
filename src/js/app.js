import * as customFunctions from './modules/functions.js';

document.addEventListener('DOMContentLoaded', () => {
  customFunctions.isWebp();

  /* CHANGE COLOR THEME */

  const themeSwitcher = document.querySelectorAll('.theme__change');
  const currentTheme = localStorage.getItem('data-theme');

  themeSwitcher.forEach((button) => {
    button.addEventListener('click', (e) => {
      applyTheme(e.target.dataset.theme);
    });
  });

  function applyTheme(themeName) {
    localStorage.setItem('data-theme', themeName);

    if (themeName === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.querySelector('img[data-theme$="dark"]').style.display = 'none';
      document.querySelector('img[data-theme$="light"]').style.display = 'block';
    }

    if (themeName === 'light' || themeName === 'null') {
      document.documentElement.setAttribute('data-theme', 'light');
      document.querySelector('img[data-theme$="dark"]').style.display = 'block';
      document.querySelector('img[data-theme$="light"]').style.display = 'none';
    }
  }

  if (currentTheme === null) {
    applyTheme('light');
  } else {
    applyTheme(currentTheme);
  }

  /* CART SLIDER */

  const splide = new Splide('.splide', {
    type: 'loop',
    perPage: 4,
    rewind: true,
    autoWidth: false,
    width: '100%',
    fixedWidth: '290px',
    gap: '40px',
    pagination: false,
    arrows: false,
    breakpoints: {
      1024: {
        perPage: 3,
      },
      991: {
        perPage: 2,
      },
      640: {
        perPage: 1,
        fixedWidth: '290px',
      },
      360: {
        perPage: 1,
        fixedWidth: '230px',
      },
    },
  });

  splide.mount();

  /* Hamburger menu */
  const body = document.body;
  const navbarToggler = document.querySelector('.navbar-toggler');

  navbarToggler.addEventListener('click', e => {
    body.classList.toggle('lock');
  });
});
