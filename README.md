# 🏠 Rentify - Rental Property Management System

A modern, full-stack rental property management platform built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Rentify connects property owners with tenants through a secure, user-friendly interface.

## 🚀 Features

### 👥 **Multi-Role System**
- **Tenants**: Browse properties, book appointments, track bookings
- **Property Owners**: List properties, manage appointments, edit listings
- **Admins**: Verify properties, manage users, platform oversight

### 🏡 **Property Management**
- ✅ Property listing with images, pricing, and details
- ✅ Advanced filtering (city, type, price, availability)
- ✅ Property verification system
- ✅ Real-time availability updates
- ✅ Featured/highlighted properties

### 📅 **Appointment System**
- ✅ Interactive booking with date/time selection
- ✅ Status tracking (pending, confirmed, cancelled)
- ✅ Owner approval workflow
- ✅ Email notifications (simulated)

### 🔐 **Authentication & Security**
- ✅ Role-based access control
- ✅ Secure login/signup system
- ✅ Protected routes with middleware
- ✅ User profile management

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Redux Toolkit
- **Database**: JSON Server (Mock API)
- **Authentication**: Custom JWT-like system
- **Icons**: Lucide React
- **Deployment**: Vercel Ready

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/rentify.git
cd rentify
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the JSON Server (Backend)**
```bash
npm run json-server
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

## 🎯 Demo Accounts

### Admin Access
- **Email**: `admin1@rentify.com`
- **Password**: `admin123`

### Property Owner
- **Email**: `owner4@rentify.com`
- **Password**: `owner123`

### Tenant
- **Email**: `tenant8@rentify.com`
- **Password**: `tenant123`

## 📁 Project Structure

```
rentify/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard
│   ├── appointments/      # Appointment management
│   ├── login/            # Authentication
│   ├── owners/           # Owner dashboard
│   ├── properties/       # Property listings
│   └── signup/           # User registration
├── components/           # Reusable UI components
│   ├── home/            # Homepage components
│   ├── layout/          # Header, Footer
│   ├── properties/      # Property-related components
│   └── ui/              # shadcn/ui components
├── redux/               # State management
├── middleware.ts        # Route protection
└── db.json             # Mock database
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run json-server  # Start mock API server
npm run lint         # Run ESLint
```

## 🌟 Key Features Implemented

### For Tenants
- [x] Browse and filter properties
- [x] View detailed property information
- [x] Book viewing appointments
- [x] Track appointment status
- [x] User profile management

### For Property Owners
- [x] List new properties
- [x] Edit/delete existing properties
- [x] Manage appointment requests
- [x] View property statistics
- [x] Dashboard overview

### For Admins
- [x] Verify property listings
- [x] Manage user accounts
- [x] Platform statistics
- [x] Content moderation

## 🎨 UI/UX Features

- ✅ Fully responsive design
- ✅ Dark/Light theme support
- ✅ Interactive components
- ✅ Loading states and animations
- ✅ Form validation
- ✅ Toast notifications
- ✅ Modern card-based layout

## 🔒 Security Features

- ✅ Route protection middleware
- ✅ Role-based access control
- ✅ Input validation
- ✅ XSS protection
- ✅ Secure authentication flow

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet optimization
- ✅ Desktop enhancement
- ✅ Touch-friendly interactions

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Manual Deployment
```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Sanjeev Kumar**
- GitHub: [@yourusername](https://github.com/sanjeev7783)
- Email: sanjeev77830@gmail.com

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

⭐ **Star this repository if you found it helpful!**
