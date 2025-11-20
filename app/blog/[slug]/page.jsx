import BlogImage from "@/app/components/blog/image";
import { fetchPostBySlug } from "@/app/actions/blog-data";
import { MDXRemote } from "next-mdx-remote/rsc";
import { compileMDX } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import { editorial, eiko, writer } from "@/app/layout";
import Navbar from "@/app/components/navbar";
import { formattedDate } from "@/app/components/utilities/formatted_date";
import ImgAndCaption from "@/app/components/blog/caption";
import Footer from "@/app/components/footer";

const components = { BlogImage, ImgAndCaption }; // Map custom components

export async function generateMetadata({ params }) {
  const post = await fetchPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_STORAGE_URL}${post.featured_image.filename_disk}`,
        },
      ],
    },
  };
}

export default async function BlogPost({ params }) {
  const post = await fetchPostBySlug(params.slug);
  // Serialize the MDX content fetched from Directus
  //   const mdxSource = await serialize(post.content);
  const { frontmatter, content } = await compileMDX({
    source: post.content,
    components: {
      BlogImage,
      h2: ({ children }) => (
        <h2 className={`text-3xl font-normal`}>{children}</h2>
      ),
      p: ({ children }) => (
        <p className={`${eiko.variable} font-eiko text-[18px] text-fullBlack`}>
          {children}
        </p>
      ),
      ImgAndCaption,
      a: (props) => (
        <a className=" text-primary" {...props}>
          {props.children}
        </a>
      ),
    },
  });

  return (
    <main className="bg-white text-black">
      <Navbar />
      <section className="mb-8 md:mb-16">
        <div className="w-full md:w-[800px] mx-auto p-5">
          <div className="mb-8">
            <div className=" mb-8">
              <img
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${post.featured_image.filename_disk}`}
                alt={post.title}
              />
            </div>
            <h1 className=" text-5xl md:text-7xl mb-4">{post.title}</h1>
            <div>
              <p className="">
                Published on: {formattedDate(post.published_date)}
              </p>
              <p className="">By {post.author}</p>
            </div>
          </div>
          <div>{content}</div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
