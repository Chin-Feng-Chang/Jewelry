import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "雅集典藏 | 宜興紫砂壺・緬甸翡翠・天然琥珀高單價東方藝術品專賣",
  description: "專門銷售高單價名家全手工宜興紫砂壺、緬甸老坑冰種翡翠與天然金藍珀之東方美學電商館。一物一拍孤品鑑定，專車恆溫保運送達。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="bg-[#F7F6F2] text-[#262524] antialiased">
        {children}
      </body>
    </html>
  );
}
