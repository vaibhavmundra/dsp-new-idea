import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Contact(){
    return(
        <>
        <Navbar/>
        <div className="bg-fullBlack w-full h-[80vh] text-white flex items-center justify-center">
            <div className="container bg-black/70 border border-borderGrey/70 rounded-lg py-20 text-center">
                <p className="text-5xl font-normal mb-4">
                    Get in touch with us.
                </p>
                <a href="mailto:support@designopolis.co.in" target="_blank" className="underline ">support@designopolis.co.in</a>
            </div>
        </div>
        <Footer/>
        </>

    )
}