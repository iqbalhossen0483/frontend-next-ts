import MainComponent from "@/components/MainComponent";
import AuthProvider from "@/providers/stores/auth/AuthProvider";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "This is a sample app",
  description: "Made by Iqbal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <MainComponent>{children}</MainComponent>
        </AuthProvider>
      </body>
    </html>
  );
}
