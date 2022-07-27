// varibales
const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "bison steak",
    category: "dinner",
    price: 22.99,
    img: "./images/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

const btnContainer = document.querySelector(".btn-container");
const sectionCenter = document.querySelector(".section-center");

// event handlers

// When the page is loaded
window.addEventListener("DOMContentLoaded", () => {
  // Display items on the display
  displayMenuItems(menu);

  // Display buttons on the display
  displayMenuButtons();
});

// functions

// Display items on the display
function displayMenuItems(menu) {
  const menuItem = menu
    .map((item) => {
      return `
    <article class="menu-item">
        <img src=${item.img} class="item-img" alt=${item.title} />
        <div class="item-info">
            <div class="item-title">
                <p class="name">${item.title}</p>
                <p class="price">${item.price}</p>
            </div>
            <p class="text">${item.desc}</p>
        </div>
    </article>`;
    })
    .join("");
  sectionCenter.innerHTML = menuItem;
}

// Display buttons on the display
function displayMenuButtons() {
  // Get the category
  const categories = menu.reduce(
    (value, item) => {
      if (!value.includes(item.category)) {
        value.push(item.category);
      }
      return value;
    },
    ["all"]
  );
  // Making menu buttons
  const categoryBtn = categories
    .map((category) => {
      return `<button type="button" class="menu-btn" data-id=${category}>${category}</button>`;
    })
    .join("");

  // Add buttons to the display
  btnContainer.innerHTML = categoryBtn;

  // get menu buttons
  const menuBtns = btnContainer.querySelectorAll(".menu-btn");

  menuBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      // get category menu
      const category = event.currentTarget.dataset.id;

      // Get menu item
      const menuItem = menu.filter((item) => {
        //If the category of the item is equal to the button we pressed, execute the following command
        if (item.category == category) {
          return item;
        }
      });

      // If the category of the item is equal to all, display all the items
      if (category == "all") {
        displayMenuItems(menu);
      } else {
        //Show items related to the category
        displayMenuItems(menuItem);
      }
    });
  });
}
