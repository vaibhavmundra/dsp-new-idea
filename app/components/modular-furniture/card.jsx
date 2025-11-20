import Link from "next/link";

export default function FurnCard({img,name,price,detail,tag}){
    return(
        <div className=" bg-white drop-shadow-sm hover:drop-shadow-lg transition-all duration-300">
            <img src={img} className="w-full h-auto"/>
            <div className="px-5 pt-10 pb-5">
                <div className="mb-4">
                    <Link href="/login" className=" text-3xl">{name}</Link>
                    <p className=" text-greyText">{detail}</p>
                </div>
                <div className="">
                    <p className="uppercase text-sm text-greyText">{tag}</p>
                    <p className=" text-3xl">{price}</p>
                </div>
            </div>

        </div>
    )
}