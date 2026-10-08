import "./globals.css";

export const metadata = {
  title: "MovieVerse",
  description: "Movie streaming UI built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
