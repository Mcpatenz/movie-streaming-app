import "./globals.css";

export const metadata = {
  title: "MovieVerse",
  description: "A premium movie streaming app built with Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
