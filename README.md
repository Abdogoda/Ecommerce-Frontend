# Ecommerce Frontend

A modern, responsive e-commerce web application frontend built with HTML, CSS, and JavaScript. This project provides a complete shopping experience with both user and admin interfaces.

## Live Demo

🔗 **[View Live Demo](https://abdogoda.github.io/Ecommerce-Frontend/)**

## Features

### User Features

- **Home Page** - Browse and explore products
- **Product Catalog** - View all available products with filters and categories
- **Product Details** - Detailed product information and reviews
- **Shopping Cart** - Add, remove, and manage items
- **Checkout** - Secure checkout process
- **User Profile** - Manage user account and view order history
- **Orders** - Track and view past orders
- **Categories** - Browse products by category

### Admin Dashboard

- **Products Management** - Create, read, update, and delete products
- **Orders Management** - View and manage customer orders
- **Users Management** - Manage user accounts and permissions
- **Categories Management** - Organize product categories
- **Roles Management** - Define and manage user roles
- **Messages** - Customer communication and support
- **Admin Profile** - Manage admin account settings

### Authentication

- **Login** - User authentication
- **Register** - New user registration
- **Forgot Password** - Password recovery
- **Reset Password** - Reset user password
- **Account Verification** - Email verification for new accounts

## Project Structure

```
Ecommerce-Frontend/
├── index.html                 # Home page
├── admin/                     # Admin dashboard pages
│   ├── dashboard.html
│   ├── profile.html
│   ├── categories/
│   ├── messages/
│   ├── orders/
│   ├── products/
│   ├── roles/
│   └── users/
├── user/                      # User-facing pages
│   ├── home.html
│   ├── products.html
│   ├── cart.html
│   ├── checkout.html
│   └── profile.html
├── auth/                      # Authentication pages
│   ├── login.html
│   ├── register.html
│   ├── forgot-password.html
│   ├── reset-password.html
│   └── verify-account.html
├── layouts/                   # Layout templates
│   ├── admin-app.html
│   ├── auth-app.html
│   └── user-app.html
├── assets/                    # Static assets
│   ├── css/                   # Stylesheets
│   │   ├── admin/
│   │   ├── auth/
│   │   └── user/
│   └── js/                    # JavaScript files
│       ├── admin/
│       └── user/
└── package.json               # Project dependencies
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Responsive styling (Tailwind CSS)
- **JavaScript (ES6+)** - Interactive functionality
- **Responsive Design** - Mobile-first approach

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/abdogoda/Ecommerce-Frontend.git
cd Ecommerce-Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Format code:

```bash
npm run format
```
