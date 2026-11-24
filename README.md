# FreshCart

FreshCart is a responsive grocery and general shopping experience that lets users browse products, view details, manage a persistent cart, and complete a checkout flow.

## Live Link

🔗 [View FreshCart Live](https://your-deployment-link.com)

> Replace the placeholder above with the deployed application URL.

## Screenshots

### Desktop

![FreshCart home page - desktop](./public/home-desktop.png)

### Mobile

![FreshCart home page - mobile](./public/home-mobile.png)

### Checkout

![FreshCart checkout page](./public/checkout-desktop.png)

> Add the screenshot files shown above to the `public` folder before publishing the README.

## Features

- Browse products from the DummyJSON API
- Filter the product collection by category
- View product details, description, rating, and stock
- Add products to the cart
- Increase, decrease, or remove cart items
- Calculate subtotal, discount, delivery, and grand total
- Persist cart items with local storage
- Complete checkout with customer and payment details
- Validate phone number, PIN code, address, and UPI fields
- Support Cash on Delivery and UPI payment options
- Responsive layouts for desktop and mobile screens
- Loading, error, retry, empty-cart, and order-confirmation states

## Tech Stack

- **Frontend:** React
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **API:** [DummyJSON Products API](https://dummyjson.com/products)
- **Storage:** Browser Local Storage

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
npm install
```

### Environment Setup

The project uses the `VITE_API_URL` environment variable. Create or update `.env` in the project root:

```env
VITE_API_URL="https://dummyjson.com/products"
```

### Run Locally

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

This project uses the remote DummyJSON API directly, so `json-server` is not required.
.
### Build for Production

```bash
npm run build
npm run preview
```

## What I Learned in Each Phase

### Phase 1: Project Setup and Routing

I learned how to set up a React and TypeScript application with Vite, configure Tailwind CSS, and organize routes for the home, product detail, cart, and checkout pages.

### Phase 2: API Integration and Product Pages

I learned how to fetch API data with async Redux Toolkit thunks, handle loading and error states, and display dynamic product and category data.

### Phase 3: Cart State and Persistence

I learned how to model normalized application state with Redux slices and persist the cart in local storage across page refreshes.

### Phase 4: Checkout and Order Flow

I learned how to build controlled forms, validate customer and payment input, calculate order totals, and manage the checkout-to-confirmation user flow.

### Phase 5: Responsive UI and Final Polishing

I learned to create responsive layouts with Tailwind CSS, improve empty and error states, and test the application across desktop and mobile screen sizes.
