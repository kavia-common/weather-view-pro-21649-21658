import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WeatherView Pro",
  description: "View real-time and forecasted weather for your favorite locations.",
  applicationName: "WeatherView Pro",
  authors: [{ name: "WeatherView" }],
  themeColor: "#2563EB",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="app-shell" suppressHydrationWarning>
        <div className="main-wrap">{children}</div>
        <footer className="app-footer">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>&copy; {new Date().getFullYear()} WeatherView Pro</p>
            <p>
              Crafted with <span className="text-blue-600">oceanic</span> clarity and{" "}
              <span className="text-amber-500">warm</span> highlights.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
