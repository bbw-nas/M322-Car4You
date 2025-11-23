// app/layout.js
import './globals.css'

export const metadata = {
    title: 'CAR4YOU - Car Rental Service',
    description: 'Book your perfect car rental',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    )
}