# AgriLectro Mart - Agricultural Electronic Products eCommerce Platform

A complete frontend eCommerce web application for agricultural electronic products built with React.

## Features

### Customer Features
- Browse products by categories
- Search functionality
- Product details with ratings and reviews
- Add to cart and wishlist
- Direct buy now option
- Checkout with shipping information
- Order tracking and history
- User profile management

### Admin Features
- Dashboard with analytics
- Product management (Add/Edit/Delete)
- Order management with status updates
- Inventory management with low stock alerts
- Sales analytics and reports

## Product Categories

1. DOL Motor Starters
2. Star Delta Motor Starters
3. Oil Immersed Motor Starters
4. PU Motor Starters
5. Single Phase Submersible Pump Starters
6. Three Phase Pump Motor Starters
7. Control Panels (3 Phase)
8. Forward & Reverse Switch
9. Motor Capacitors
10. Controllers
11. Overload Relays
12. Cable Lugs
13. Motor Starter Spare Parts

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Default Credentials

### Admin Login
- Email: admin@agrilectro.com
- Password: admin123

### Customer
- Sign up to create a new customer account

## Technology Stack

- React 18
- React Router DOM v6
- Context API for state management
- CSS3 with custom properties
- LocalStorage for data persistence

## Project Structure

```
src/
├── components/       # Reusable components
├── pages/           # Page components
│   ├── customer/    # Customer dashboard pages
│   └── admin/       # Admin dashboard pages
├── context/         # React Context providers
├── data/            # Product data
├── styles/          # CSS files
└── utils/           # Utility functions
```

## Color Theme

- Primary Green: #7CB342
- Light Green: #AED581
- Dark Green: #558B2F
- White: #FFFFFF
- Light Gray: #F5F5F5

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## License

This project is for educational purposes.
