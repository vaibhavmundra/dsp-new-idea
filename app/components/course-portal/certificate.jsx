import Link from "next/link";

export default function Certificate({ course }) {
  return (
    <div className="flex items-center justify-center p-5">
      <Link href={course.certificate_form} target="_blank">
        <h1 className=" underline">
          Please fill this form to get your certificate via email.
        </h1>
      </Link>
    </div>
  );
}
