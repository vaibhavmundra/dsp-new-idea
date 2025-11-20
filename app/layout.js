import "./globals.css";
import Script from "next/script";
import * as fbq from "./components/pixel";
import { GoogleAnalytics } from "@next/third-parties/google";
import localFont from "next/font/local";

export const montreal = localFont({
  src: "./font/montreal.ttf",
  variable: "--font-neue-montreal",
  display: "swap",
  weight: "100 900",
});
export const editorial = localFont({
  src: "./font/editorial.ttf",
  variable: "--font-editorial-new",
  display: "swap",
  weight: "100 900",
});

export const writer = localFont({
  src: "./font/writer.ttf",
  variable: "--font-writer",
  display: "swap",
  weight: "100 900",
});
export const eiko = localFont({
  src: "./font/eiko.ttf",
  variable: "--font-eiko",
  display: "swap",
  weight: "100 900",
});
export const denton = localFont({
  src: "./font/denton.ttf",
  variable: "--font-denton",
  display: "swap",
  weight: "100 900",
});

export const metadata = {
  title: {
    template: "%s | Designopolis",
    default: "Designopolis", // a default is required when creating a template
  },
  description:
    "Designopolis is an upskilling platform for the building construction and design industry",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body
          className={`${montreal.variable} font-dsp text-black bg-white`}
        >
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${fbq.FB_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
          {children}
        </body>
        <GoogleAnalytics gaId="G-GLJQTML75Z" />
      </html>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            console.log(window.location.href);
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
        }}
      />
    </>
  );
}
