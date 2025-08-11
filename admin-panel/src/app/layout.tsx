import AppProvider from "./AppProvider";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";

export const metadata = {
  title: "My App",
  description: "Next.js + Styled Components + React Query + Toastify",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <AppProvider>{children}</AppProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
