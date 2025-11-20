import { fetchPosts } from "../actions/blog-data";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const description =
  "Covering stories of what it takes to build a successful design business — in this rapidly changing world";

export const metadata = {
  title: "Behind the Space",
  desicription: description,
  openGraph: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_STORAGE_URL}/982a81cc-f821-4fe5-b58d-5e65df8ce420.webp`,
      },
    ],
  },
};

export default async function Blog() {
  const posts = await fetchPosts();
  return (
    <>
      <main className=" bg-white text-black">
        <Navbar />
        <section className="block md:grid md:grid-cols-6">
          <div className=" col-span-1 p-5 hidden md:block">
            <h1 className=" text-5xl md:text-7xl mb-4 uppercase">
              Behind the space
            </h1>
            <p className="  text-greyText">{description}</p>
          </div>
          <div className="w-full min-h-screen md:w-[800px] mx-auto px-5 py-10 md:col-span-4">
            <div className=" mb-8 md:hidden">
              <h1 className=" text-5xl  md:text-7xl mb-2 uppercase">
                Behind the space
              </h1>
              <p className=" text-greyText">{description}</p>
            </div>

            <div>
              {posts.map((post) => {
                return (
                  <div key={post.slug} className="mb-8">
                    <div className=" rounded-t-md overflow-hidden">
                      <img
                        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${post.featured_image.filename_disk}`}
                        className=" w-full object-cover"
                        alt={post.title}
                      />
                    </div>
                    <div className="p-5 border border-borderGrey rounded-b-md">
                      <p className=" text-primary uppercase text-xs mb-1">
                        {post.author}
                      </p>
                      <a href={`/blog/${post.slug}`} className="text-3xl">
                        {post.title}
                      </a>
                      <p className=" mt-4 text-greyText italic">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" col-span-1 hidden md:block"></div>
        </section>

        <Footer />
      </main>
    </>
  );
}
