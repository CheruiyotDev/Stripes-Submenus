import getElement from './utils/getElement.js';
import subLinks from './data.js';
import sublinks from './data.js';

const toggleBtn = getElement('.toggle-btn');
const closeBtn = getElement('.close-btn');
const sidebarWrapper = getElement('.sidebar-wrapper');
const sidebar = getElement('.sidebar-links');

const linkBtns = [...document.querySelectorAll('.link-btn')];
const submenu = getElement('.submenu');
const hero = getElement('.hero');
const nav = getElement('.nav');

// hide/show
toggleBtn.addEventListener('click', () => {
  sidebarWrapper.classList.add('show');
});
closeBtn.addEventListener('click', () => {
  sidebarWrapper.classList.remove('show');
});

// set sidebar
sidebar.innerHTML = subLinks
  .map((item) => {
    const { links, page } = item;
    return `
  <article>
    <h4>${page}</h4>
    <div class="sidebar-sublinks">
    ${links
      .map((link) => {
        return `<a href="${link.url}">
        <i class="${link.icon}"></i>${link.label}
        </a>`;
      })
      .join('')}
    </div>
  </article>
  `;
  })
  .join('');

linkBtns.forEach((btn) => {
  btn.addEventListener('mouseover', function (e) {
    const text = e.currentTarget.textContent;
    const tempBtn = e.currentTarget.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;

    const tempPage = sublinks.find(({ page }) => page === text);
    if (tempPage) {
      const { page, links } = tempPage;
      submenu.classList.add('show');
      submenu.style.left = `${center}px`;
      submenu.style.right = `${bottom}px`;

      let columns = 'col-2';
      if (links.length === 3) {
        columns = 'col-3';
      }
      if (links.length > 3) {
        columns = 'col-4';
      }

      submenu.innerHTML = `
      <section>
       <h4>${page}</h4>
       <div class="submenu-center ${columns}">
       ${links
         .map((link) => {
           return `<a href="${link.url}">
        <i class="${link.icon}"></i>${link.label}
        </a>`;
         })
         .join('')}
       </div>
      </section>
      `;
    }
  });
});

hero.addEventListener('mouseover', function (e) {
  submenu.classList.remove('show');
});
nav.addEventListener('mouseover', function (e) {
  if (!e.target.classList.contains('link-btn'))
    submenu.classList.remove('show');
});
