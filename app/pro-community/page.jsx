import { ArrowPathIcon, RocketLaunchIcon, SparklesIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import Pro from "../components/community/form";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
export const metadata = {
  title: "Designopolis Community",
  description:
    "A vibrant community for spatial designers to collaborate 🤝, learn 📚, and grow through exclusive workshops 🎨, expert mentorship 👩‍🏫, and hands-on projects 🛠️. ",
  openGraph: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_STORAGE_URL}/fe7681c7-2eef-4d0a-87bd-45fe6dde30b8.jpg`,
      },
    ],
  },
};

export default function ProPage(){
  return(
    <>
    <Navbar/>
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className=" mb-16">
        <div className=" mb-12">
          <h1 className="text-5xl text-center mb-8">
            Join the Community for <span style={{ background: 'linear-gradient(to right, var(--tw-gradient-from, #6161f5), var(--tw-gradient-to, #EF663C))', WebkitBackgroundClip: 'text', color: 'transparent' }}>Pros</span>
          </h1>
          <div className="p-5 bg-[#7C7CFC] rounded-lg font-normal">

          <p className="">A vibrant community for spatial designers to collaborate 🤝, learn 📚, and grow through exclusive workshops 🎨, expert mentorship 👩‍🏫, and hands-on projects 🛠️.</p>
          </div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="py-5 md:bg-black rounded-lg md:p-5">
            <h2 className="text-3xl mb-6">Starting a design practice is lonely</h2>
            <div>
              <p className="mb-12">You have to make difficult decisions every day with imperfect information on problems you have likely never faced before. It is daunting. <br></br><br></br>

              In our experience, the best way to overcome the challenges is to learn from the wins and mistakes of others, and to surround yourself with designers who have been there, done that. <br></br><br></br>

              Whether you are in the thick of it in Mumbai or Delhi, finding your people is tough. <br></br><br></br>

              But when you do find them, it is life changing. <br></br><br></br>

              And that is what this community is for.</p>

              <div className=" text-center md:hidden">
              <a href="#form" className="p-4 bg-primary rounded-full">Apply to join</a>
              </div>

            </div>
          </div>
          <div className="py-5 flex flex-col justify-between">
            <h2 className="text-3xl mb-6">What this community offers</h2>
            <div>
              <ul>
                <li className="mb-3"><ArrowPathIcon className=" w-6 h-6 mb-1"/><p><span className=" font-medium">Apply Theory to Practice:</span> Participate in hands-on workshops (apart from our regular workshops) and real-world challenges.</p></li>
                <li className="mb-3"><SparklesIcon className="w-6 h-6 mb-1"/><p><span className=" font-medium">Gain Industry Insights:</span> Connect with experienced mentors and peers to learn the latest trends.</p></li>
                <li className="mb-3"><UserPlusIcon className="w-6 h-6 mb-1"/><p><span className=" font-medium">Build Your Network:</span> Be part of a supportive group of designers who share your passion for creating impactful spaces.</p></li>
                <li className=""><RocketLaunchIcon className=" w-6 h-6 mb-1"/><p><span className=" font-medium">Stay Ahead:</span> Access resources on cutting-edge design tools and technologies.</p></li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <Pro/>
    </div>
    <Footer/>
    </>
  )

}




