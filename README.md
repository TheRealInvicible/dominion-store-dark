
# Dominion Store - Baby and Maternal Products E-commerce

![Dominion Store](public/lovable-uploads/e78d31f6-3d08-4efe-b761-29d4edaa52f1.png)

A modern e-commerce platform for baby and maternal products built with React, TypeScript, and Tailwind CSS. The application features a beautiful dark-themed UI with product browsing, shopping cart functionality, user authentication, and checkout process.

## Features

- 🌙 Dark theme with toggle functionality
- 🛒 Complete shopping cart system with persistent storage
- 👤 User authentication (Email/Password and Google)
- 📱 Fully responsive design for all devices
- 🔎 Product filtering and search
- 💳 Multi-step checkout process
- 👨‍💼 User account management
- 📦 Order tracking functionality

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- React Router
- ShadCN UI Components
- Context API for state management
- Local Storage for data persistence

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:

```sh
git clone <repository-url>
cd dominion-store
```

2. Install dependencies:

```sh
npm install
```

3. Start the development server:

```sh
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:8080
```

## Project Structure

```
dominion-store/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── layout/      # Layout components (Navbar, Footer, etc.)
│   │   ├── ui/          # Basic UI components (from ShadCN)
│   │   └── ...          # Other components (ProductCard, ShoppingCart, etc.)
│   ├── context/         # React context for state management
│   │   ├── AuthContext.tsx        # Authentication state
│   │   ├── CartContext.tsx        # Shopping cart state
│   │   └── ThemeContext.tsx       # Theme state (dark/light)
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── tailwind.config.ts   # Tailwind CSS configuration
└── ...                  # Other config files
```

## Deployment

To build the application for production:

```sh
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Admin Access

The admin dashboard is available at `admin.dominionstore.com` (requires admin credentials).

## Available Pages

- Home (`/`)
- Product Listings (`/products/:category`)
- Product Details (`/product/:id`)
- Cart (`/cart`)
- Checkout (`/checkout`)
- User Account (`/account`)
- Authentication (`/login`, `/register`)

## Environment Variables

- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk authentication key (for production)

## Future Enhancements

- Implement real backend API integration
- Add payment gateway integration (Stripe, PayPal)
- Implement order notification system
- Add product reviews and ratings
- Develop admin dashboard for product management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Dominion Store - info@dominionstore.com

Project Link: [https://github.com/yourusername/dominion-store](https://github.com/yourusername/dominion-store)
