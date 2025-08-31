# Demo E-commerce React Native App

A modern React Native e-commerce application built with TypeScript, featuring product management, user authentication, and order processing.

## Screenshots

<div align="center">

### 🔐 Authentication Flow
| Onboarding 1 | Onboarding 2 | Login | Register |
|:---:|:---:|:---:|:---:|
| <img src="doc/screenshots/Onboarding 1 Screen.png" width="180"> | <img src="doc/screenshots/Onboarding 2 Screen.png" width="180"> | <img src="doc/screenshots/Login Screen.png" width="180"> | <img src="doc/screenshots/Register Screen.png" width="180"> |

### 🛍️ E-commerce Features
| Product List | Product Detail | Create Product | Edit Product |
|:---:|:---:|:---:|:---:|
| <img src="doc/screenshots/Home:Product List Screen.png" width="180"> | <img src="doc/screenshots/Product Detail Screen.png" width="180"> | <img src="doc/screenshots/Create Product Screen.png" width="180"> | <img src="doc/screenshots/Edit Product Screen.png" width="180"> |

### 👤 User Profile
| User Profile | Edit Profile |
|:---:|:---:|
| <img src="doc/screenshots/User Profile Screen.png" width="200"> | <img src="doc/screenshots/Edit User Profile Screen.png" width="200"> |

</div>

## Prerequisites

- **Node.js** >= 18.0.0
- **React Native CLI** >= 13.0.0
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)
- **Yarn** 3.6.4 (recommended)

## Environment Setup

This project uses **Yarn 3.6.4**. Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) guide.

### Installing Dependencies

```bash
# Install dependencies with Yarn 3.6.4 (recommended)
yarn install

# For iOS, install CocoaPods dependencies
cd ios && bundle install && bundle exec pod install && cd ..
```

### Different Yarn Versions

If you're using a different Yarn version:

**Yarn 1.x (Classic):**

```bash
# Remove Yarn 3 specific files
rm -rf .yarn .yarnrc.yml

# Remove packageManager field from package.json
# Edit package.json and delete: "packageManager": "yarn@3.6.4",

# Install with Yarn 1.x
yarn install
```

**Yarn 2.x/4.x:**

```bash
# Remove or update packageManager field in package.json
# Either delete "packageManager": "yarn@3.6.4", or update version

# Update Yarn version if needed
yarn set version stable

# Install dependencies
yarn install
```

## Running the Application

### Start Metro Bundler

```bash
yarn start
```

### Android

```bash
# Start Android emulator or connect physical device
yarn android
```

**Requirements:**

- Android Studio with Android SDK
- Android emulator running or physical device connected
- USB debugging enabled (for physical devices)

### iOS (macOS only)

```bash
# Install iOS dependencies (first time only)
cd ios && bundle exec pod install && cd ..

# Run on iOS Simulator
yarn ios
# or Open XCode and run (Prefer)
```

**Requirements:**

- Xcode installed from Mac App Store
- iOS Simulator or physical iOS device
- Apple Developer account (for physical devices)

## Development Scripts

```bash
# Start Metro bundler
yarn start

# Run on Android
yarn android

# Run on iOS
yarn ios

# Run tests
yarn test

# Type checking
yarn tsc

# Linting
yarn lint

# Reset Metro cache
yarn start --reset-cache
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── constants/         # Centralized design constants
├── features/          # Feature-based modules
│   ├── auth/         # Authentication
│   ├── orders/       # Order management
│   ├── products/     # Product management
│   └── profile/      # User profile
├── navigation/       # Navigation configuration
├── services/         # API services
├── stores/           # State management
└── utils/            # Utility functions
```
