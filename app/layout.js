import Navbar from "./components/Navbar";
import "./globals.css";


export const metadata = {
  title: {
    default: "Atlas Holdings | International Luxury Real Estate",
    template: "%s | Atlas Holdings",
  },
  // description: "Exclusive global property listings and premium real estate investment opportunities for international buyers.",
  // metadataBase: new URL("https://atlasholdings.global"), // Change to your actual domain
  // alternates: {
  //   canonical: "/",
  // },
  // openGraph: {
  //   title: "Atlas Holdings | Global Real Estate",
  //   description: "Discover luxury properties across the globe.",
  //   url: "https://atlasholdings.global",
  //   siteName: "Atlas Holdings",
  //   images: "/og-image.jpg", // Place an image in your /public folder
  //   type: "website",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Atlas Holdings",
  //   description: "International Real Estate and Luxury Living.",
  //   images: ["/og-image.jpg"],
  // },
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={` h-full antialiased`} suppressContentEditableWarning ={true}
    >
      <body className="min-h-full flex flex-col">
        <Navbar/>
        {children}
        
        </body>
    </html>
  );
}
