export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "business-suits", label: "Business Suits" },
      { id: "wedding-suits", label: "Wedding Suits" },
      { id: "tuxedos", label: "Tuxedos" },
      { id: "dress-shirts", label: "Dress Shirts" },
      { id: "accessories", label: "Accessories" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "tom-ford", label: "Tom Ford" },
      { id: "brioni", label: "Brioni" },
      { id: "ermenegildo-zegna", label: "Ermenegildo Zegna" },
      { id: "canali", label: "Canali" },
      { id: "hugo-boss", label: "Hugo Boss" },
      { id: "giorgio-armani", label: "Giorgio Armani" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "business-suits",
    label: "Business Suits",
    path: "/shop/listing",
  },
  {
    id: "wedding-suits",
    label: "Wedding Suits",
    path: "/shop/listing",
  },
  {
    id: "tuxedos",
    label: "Tuxedos",
    path: "/shop/listing",
  },
  {
    id: "dress-shirts",
    label: "Dress Shirts",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  "business-suits": "Business Suits",
  "wedding-suits": "Wedding Suits",
  "tuxedos": "Tuxedos",
  "dress-shirts": "Dress Shirts",
  accessories: "Accessories",
};

export const brandOptionsMap = {
  "tom-ford": "Tom Ford",
  "brioni": "Brioni",
  "ermenegildo-zegna": "Ermenegildo Zegna",
  "canali": "Canali",
  "hugo-boss": "Hugo Boss",
  "giorgio-armani": "Giorgio Armani",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "business-suits", label: "Business Suits" },
    { id: "wedding-suits", label: "Wedding Suits" },
    { id: "tuxedos", label: "Tuxedos" },
    { id: "dress-shirts", label: "Dress Shirts" },
    { id: "accessories", label: "Accessories" },
  ],
  brand: [
    { id: "tom-ford", label: "Tom Ford" },
    { id: "brioni", label: "Brioni" },
    { id: "ermenegildo-zegna", label: "Ermenegildo Zegna" },
    { id: "canali", label: "Canali" },
    { id: "hugo-boss", label: "Hugo Boss" },
    { id: "giorgio-armani", label: "Giorgio Armani" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
