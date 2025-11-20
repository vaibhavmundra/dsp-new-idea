import Footer from "../components/footer";
import Navbar from "../components/navbar";

export const metadata = {
  title: "About",
  desicription:
    "We are on a mission to help spatial designers around the globe make a great living from their creativity and passion. Learn in-demand skills from world-class instructors — no matter where you live.",
  openGraph: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_STORAGE_URL}/fe7681c7-2eef-4d0a-87bd-45fe6dde30b8.jpg`,
      },
    ],
  },
};

export default function About() {
  return (
    <>
      <Navbar />
      <section
        className={`h-screen md:h-auto flex flex-col items-center relative overflow-hidden border-b border-borderGrey mb-32`}
      >
        <div className="p-5 mb-12 absolute top-1/2 transform -translate-y-1/2 z-10">
          <div className="mx-auto flex flex-col items-center text-center md:w-3/4">
            <h1 className="text-5xl md:text-8xl mb-8">
              Made for spatial designers.
            </h1>
            <p className="mb-12 opacity-60 text-lg">
              We are on a mission to help spatial designers around the globe
              make a great living from their creativity and passion. Learn
              in-demand skills from world-class instructors — no matter where
              you live.
            </p>
          </div>
        </div>
        <div className="">
          <div className="">
            <img
              src="/courses/lighting_hero.svg"
              alt="lighting course hero image"
              className="h-screen md:h-auto md:w-full object-cover md:opacity-50"
            />
          </div>
        </div>
      </section>
      <section className="mb-24 md:mb-32 px-5">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-7xl">Meet our mentors</h2>
        </div>
      </section>

      <section className="bg-fullBlack mb-16 md:mb-32 px-5 hidden">
        <div className="container mx-auto ">
          <h2 className="text-3xl md:text-4xl mb-12 md:hidden">
            {/* Only visible on mobile */}
            Teaches Lighting Design
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 mx-auto border border-borderGrey rounded-3xl flex flex-col items-start overflow-hidden">
              <div className="relative">
                <img
                  src="/educators/swapnali.webp"
                  alt="educator"
                  className="w-full h-auto"
                />
              </div>
              <div className="pb-10 pt-5 px-5">
                <p className="text-2xl mb-4">Swapnali Bhadale</p>
                <p className="opacity-50 text-sm">
                  Architect & lighting designer,<br></br> Masters in lighting
                  design, Politecnico di Milano, Italy <br></br>Member of the
                  International Association of Lighting Designers (IALD)
                </p>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col justify-between md:pl-8">
              <h2 className="text-3xl md:text-4xl hidden md:block">
                Teaches Lighting Design
              </h2>
              <div>
                <p className="md:text-xl opacity-50">
                  Swapnali is a practicing lighting designer with 4+ years of
                  experience. She holds a specialization in Lighting Design and
                  LED Technology from Politecnico di Milano, Italy. <br></br>
                  <br></br>
                  Having practiced in various international environments like
                  Italy, Dubai, China, India and Australia has given her a
                  unique perspective on how lighting design can transform and
                  enhance spaces.
                </p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>

      <section className="bg-fullBlack mb-16 md:mb-32 px-5">
        <div className="container mx-auto ">
          <h2 className="text-3xl md:text-4xl mb-12 md:hidden">
            {/* Only visible on mobile */}
            Teaches Sustainable Design
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 mx-auto border border-borderGrey rounded-3xl flex flex-col items-start overflow-hidden">
              <div className="relative">
                <img
                  src="/educators/amrutha.jpg"
                  alt="educator"
                  className="w-full h-auto"
                />
              </div>
              <div className="pb-10 pt-5 px-5">
                <p className="text-2xl mb-4">Amrutha Kishor</p>
                <p className="opacity-50 text-sm">
                  Architect & sustainability consultant,<br></br> Masters in
                  Architecture, University of Nottingham, UK <br></br>LEED Green
                  Associate, Founder of Elemental
                </p>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col justify-between md:pl-8">
              <h2 className="text-3xl md:text-4xl hidden md:block">
                Teaches Sustainable Design
              </h2>
              <div>
                <p className="md:text-xl opacity-50">
                  Amrutha is an architect &amp; sustainability consultant with a
                  Masters in Architecture from University of Nottingham, UK. She
                  is a LEED Green Associate, and Founder of Elemental, a
                  sustainable design studio. <br></br>
                  <br></br>
                  Her work has been featured in various national magazinges
                  including Architectural Digest, Architect and Interiors India,
                  and others.
                </p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>

      <section className="bg-fullBlack mb-16 md:mb-32 px-5">
        <div className="container mx-auto ">
          <h2 className="text-3xl md:text-4xl mb-12 md:hidden">
            {/* Only visible on mobile */}
            Teaches Interior Project Management
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 mx-auto border border-borderGrey rounded-3xl flex flex-col items-start overflow-hidden">
              <div className="relative">
                <img
                  src="/educators/swathika_prem.jpg"
                  alt="educator"
                  className="w-full h-auto"
                />
              </div>
              <div className="pb-10 pt-5 px-5">
                <p className="text-2xl mb-4">Swathika Prem</p>
                <p className="opacity-50 text-sm">
                  Architect & project manager,<br></br> Ex-Livspace <br></br>MSc Construction Management, University of Adelaide
                </p>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col justify-between md:pl-8">
              <h2 className="text-3xl md:text-4xl hidden md:block">
                Teaches Interior Project Management
              </h2>
              <div>
                <p className="md:text-xl opacity-50">
                Swathika is a highly skilled architect with a Masters degree in Construction Management from the University of Adelaide. She has extensive experience in the fit-out sector, specializing in residential, retail, and office spaces. Throughout her career, Swathika has worked with prominent companies such as Livspace, John Holland, and Smartworks, gaining valuable expertise across a variety of projects. Currently, she serves as a consultant for a US-based startup, where she applies her in-depth background in both architecture and project execution.
                  <br></br>
                  <br></br>
                  With a strong focus on design and construction, Swathika collaborates with design firms to ensure execution excellence across all projects. Her practical knowledge and strategic insights allow her to effectively navigate the complexities of construction project management.
                </p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>

      <section className="bg-fullBlack mb-16 md:mb-32 px-5">
        <div className="container mx-auto ">
          <h2 className="text-3xl md:text-4xl mb-12 md:hidden">
            {/* Only visible on mobile */}
            Teaches Sustainable Materiality
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 mx-auto border border-borderGrey rounded-3xl flex flex-col items-start overflow-hidden">
              <div className="relative">
                <img
                  src="/educators/purva.jpg"
                  alt="educator"
                  className="w-full h-auto"
                />
              </div>
              <div className="pb-10 pt-5 px-5">
                <p className="text-2xl mb-4">Purva Chawla</p>
                <p className="opacity-50 text-sm">
                  Architect & materials consultant,<br></br> MLA, University of
                  Pennsylvania <br></br>Founder partner of MaterialDriven, UK &
                  US
                </p>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col justify-between md:pl-8">
              <h2 className="text-3xl md:text-4xl hidden md:block">
                Teaches Sustainable Materiality
              </h2>
              <div>
                <p className="md:text-xl opacity-50">
                  Purva is an architect and the founder of MaterialDriven, a
                  design consultancy and education firm that serves as a
                  platform for the innovation and application of sustainable and
                  innovative materials. With a background in architecture,
                  Chawla has dedicated her career to exploring and promoting
                  materials that not only push the boundaries of design and
                  architecture but also address critical environmental and
                  societal challenges.
                </p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>

      <section className="bg-fullBlack mb-16 md:mb-32 px-5">
        <div className="container mx-auto ">
          <h2 className="text-3xl md:text-4xl mb-12 md:hidden">
            {/* Only visible on mobile */}
            Teaches Psychology Applied to Spatial Design
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 mx-auto border border-borderGrey rounded-3xl flex flex-col items-start overflow-hidden">
              <div className="relative">
                <img
                  src="/educators/aishwarya.jpg"
                  alt="educator"
                  className="w-full h-auto"
                />
              </div>
              <div className="pb-10 pt-5 px-5">
                <p className="text-2xl mb-4">Aishwarya Narayanan</p>
                <p className="opacity-50 text-sm">
                  Architect & researcher,<br></br> Director for R&D at the
                  Center for Conscious Design <br></br>M.Sc (Neuroaesthetics),
                  Goldsmiths, University of London
                </p>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col justify-between md:pl-8">
              <h2 className="text-3xl md:text-4xl md:block hidden">
                Teaches Psychology Applied to Spatial Design
              </h2>
              <div>
                <p className="md:text-xl opacity-50">
                  Aishwarya is an architect who holds the position of Director
                  of Research and Development at the Center for Conscious
                  Design, a pioneering organization focused on integrating
                  conscious, human-centered design principles into the built
                  environment. <br></br>
                  <br></br>
                  With an extensive background in architecture and design,
                  Narayanan spearheads initiatives that explore innovative ways
                  to make spaces more inclusive, sustainable, and conducive to
                  well-being.
                </p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>

      <section className="bg-fullBlack mb-16 md:mb-32 px-5 hidden">
        <div className="container mx-auto ">
          <h2 className="text-3xl md:text-4xl mb-12 md:hidden">
            {/* Only visible on mobile */}
            Teaches Mechanical, Electrical, and Plumbing Design
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 mx-auto border border-borderGrey rounded-3xl flex flex-col items-start overflow-hidden">
              <div className="relative">
                <img
                  src="/educators/neha_bhasin.jpg"
                  alt="educator"
                  className="w-full h-auto"
                />
              </div>
              <div className="pb-10 pt-5 px-5">
                <p className="text-2xl mb-4">Neha Bhasin</p>
                <p className="opacity-50 text-sm">
                  Principal Architect, Pramana Design Studios,<br></br> MEP
                  Specialist, Intelligent Building Consultants <br></br>
                </p>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col justify-between md:pl-8">
              <h2 className="text-3xl md:text-4xl hidden md:block">
                Teaches Mechanical, Electrical, and Plumbing Design
              </h2>
              <div>
                <p className="md:text-xl opacity-50">
                  Neha Bhasin is the Principal Architect at Pramana Design
                  Studio, specializing in MEP Design and Project Management. She
                  serves as a Guest Lecturer at AAFT. Neha also works part-time
                  as an MEP Specialist at Intelligent Building Consultants
                  Services, focusing on integrated building designs. She
                  previously lectured at IVS School of Design. She has an
                  extensive experience of 9 years in project implementation,
                  budgeting, and MEP, based in New Delhi, India.
                </p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>

      <section className="bg-fullBlack mb-16 md:mb-32 px-5">
        <div className="container mx-auto ">
          <h2 className="text-3xl md:text-4xl mb-12 md:hidden">
            {/* Only visible on mobile */}
            Teaches Estimation & Costing for Interior Spaces
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 mx-auto border border-borderGrey rounded-3xl flex flex-col items-start overflow-hidden">
              <div className="relative">
                <img
                  src="/educators/neha_garg.jpg"
                  alt="educator"
                  className="w-full h-auto"
                />
              </div>
              <div className="pb-10 pt-5 px-5">
                <p className="text-2xl mb-4">Neha Garg</p>
                <p className="opacity-50 text-sm">
                  Principal Designer, Studio Jane,<br></br> An Award Winning
                  Design Studio based in Mumbai <br></br>
                </p>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col justify-between md:pl-8">
              <h2 className="text-3xl md:text-4xl hidden md:block">
                Teaches Estimation & Costing for Interior Spaces
              </h2>
              <div>
                <p className="md:text-xl opacity-50">
                  Neha Garg is the founder and principal designer of Studio
                  Jane, an interior and architecture consultancy firm based in
                  Mumbai. Her work has been featured in several media outlets,
                  highlighting her ability to create cohesive and elegant spaces
                  that reflect the distinct personalities of her clients. Her
                  projects often include a mix of natural elements, minimalistic
                  designs, and sophisticated touches that create warm and
                  welcoming environments​.
                </p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>

      <section
        className={`md:h-auto flex flex-col items-center relative border-b border-borderGrey`}
      >
        <div className="p-5 mb-12 absolute top-1/2 transform -translate-y-1/2 z-10">
          <div className="mx-auto flex flex-col items-center text-center md:w-3/4 w-4/5">
            <div className="flex items-center justify-center mb-8">
              <div className="w-[150px] md:w-[200px]">
                <img
                  src="/educators/bharat.jpg"
                  alt="educator"
                  className="w-full h-auto border rounded-3xl"
                />
              </div>
              <div className="w-[150px] md:w-[200px] ml-4">
                <img
                  src="/educators/vaibhav_mundra.jpg"
                  alt="educator"
                  className="w-full h-auto border rounded-3xl"
                />
              </div>
            </div>
            <h2 className="text-5xl md:text-8xl mb-8">Meet our founders</h2>
            <p className="mb-6 opacity-60 text-lg">
              Born in the midst of the pandemic, Designopolis set out with a
              clear mission: to equip spatial designers with the skills they
              need to craft better spaces and build better careers. Founded by
              Bharat Mundra, an IIM Bangalore alumnus, and Vaibhav Mundra, Indian School of Business (IVI) alum and an
              architect with a pedigree shaped by AD100 firms, Designopolis is
              driven by a shared passion to bridge the knowledge gap between
              academia and professional practice. <br></br>
              <br></br>
              If you are an experienced professional interested in teaching with
              us or an expert creative who wants to join our creative team, we
              would like to meet you.
            </p>
            <a
              href="mailto:vaibhav@designopolis.co.in"
              target="_blank"
              className=" flex items-center justify-center px-6 md:px-8 h-12 bg-primary rounded-full text-sm text-white hover:bg-primary/70"
            >
              Get in touch
            </a>
          </div>
        </div>
        <div className="">
          <div className="">
            <img
              src="/courses/lighting_hero.svg"
              alt="lighting course hero image"
              className="h-[150vh] md:h-auto md:w-full object-cover md:opacity-50"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
