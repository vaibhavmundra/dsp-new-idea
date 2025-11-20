export default function Review({
  heading,
  text,
  courseType,
  courseName,
  customerName,
  profession,
}) {
  return (
    <div className="p-8 border border-borderGrey rounded-3xl bg-black">
      <h4 className="text-3xl mb-8">{heading}</h4>
      <p className="mb-10 opacity-50">{text}</p>
      <div className="mb-4 opacity-70">
        <p>{customerName}</p>
        <p>{profession}</p>
      </div>
      <div>
        <p className="text-xs uppercase py-1 px-2 bg-orange rounded-full inline-block text-white mb-2">
          {courseType}
        </p>
        <p className="opacity-70">{courseName}</p>
      </div>
    </div>
  );
}
