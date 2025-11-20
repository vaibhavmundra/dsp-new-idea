import { checkEnrollment } from "@/app/actions/auth";
import Link from "next/link";

export default async function Status({ success, order, status, className }) {
  return (
    <>
      <div
        className={`absolute inset-0 p-1 bg-black flex items-center justify-between  z-50 ${
          success || status ? "block" : "hidden"
        }`}
      >
        <div className="px-5 text-left text-xs md:text-base">
          <p className="text-[1rem]">Successfully enrolled</p>
          <p className=" text-[12px] opacity-70">
            Order id: {order || (status && status.order_id)}
          </p>
        </div>
        <Link href="/dashboard" className={className}>
          My Dashboard
        </Link>
      </div>
    </>
  );
}
