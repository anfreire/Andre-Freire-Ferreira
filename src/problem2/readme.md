# Problem 2: Fancy Form

## Problem Description

Create a currency swap form based on a provided template. The form allows users to swap assets from one currency to another.

## Features

- Interactive currency swap form
- Real-time validation and error messages
- Currency selection via dropdown
- Swap functionality to switch 'from' and 'to' currencies
- Responsive design
- Dark mode support

## Technologies Used

- React
- TypeScript
- React Hook Form for form management
- Tailwind CSS for styling

## Key Components

- `ExchangeForm`: Main component that orchestrates the form
- `Field`: Reusable component for currency input fields
- `CurrencyDropdown`: Custom dropdown for currency selection
- `SwapButton`: Button to swap 'from' and 'to' currencies
- `ErrorToast`: Component to display form errors
- `useExchangeForm`: Custom hook for form logic and state management

## Running the Project

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser
