import Navbar from "../components/navbar";
import VendorSearch from "../components/vendor-search/vendor";
import Footer from "../components/footer";

export const metadata = {
  title: 'AI Vendor Search',
  description:
    "Let AI search for vendors and contact them for you. Only vendors who suit your requirements will contact you via WhatsApp automatically.",
  openGraph: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_STORAGE_URL}/fe7681c7-2eef-4d0a-87bd-45fe6dde30b8.jpg`,
      },
    ],
  },
};

export default async function VendorPage(){
    return(
        <>
            <Navbar/>
            <VendorSearch/>
            <Footer/>
        </>
    )
}