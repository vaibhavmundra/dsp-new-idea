export default function ImgAndCaption({ src, text }) {
  return (
    <div className=" w-fit mx-auto">
      <img className="mb-1 rounded-sm" src={src} alt={text} />
      <p className=" text-sm italic">{text}</p>
    </div>
  );
}
