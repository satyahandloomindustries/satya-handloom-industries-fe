import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import ToastContainer from '@/components/ToastContainer';
import { cookies } from 'next/headers';
import { AUTH_TOKEN } from '@/constants';
import { UserProfileProvider } from '@/guard/UserProfileProvider';
import { ViewTransitions } from 'next-view-transitions';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'SHI',
  description: 'Satya Handloom Industries',
  icons: {
    icon: '/images/icon-512x512.png',
  },
};

export default async function RootLayout({ children }) {
  const cookie = await cookies();
  const token = cookie.get(AUTH_TOKEN)?.value;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
      >
        <ViewTransitions>
          <UserProfileProvider>
            <Navbar token={token} />
            {children}
          </UserProfileProvider>
        </ViewTransitions>
        <ToastContainer />
      </body>
    </html>
  );
}
