"use client";

import DropOpen from "@/app/components/modular-furniture/dropopen";
import Parameter from "@/app/components/modular-furniture/parameter";
import { AdjustmentsVerticalIcon, InformationCircleIcon, QueueListIcon, Square3Stack3DIcon, SwatchIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// https://sdr8euc1.eu-central-1.shapediver.com
const SHAPEDIVER_ENABLED =
  process.env.NEXT_PUBLIC_SHAPEDIVER_ENABLED === "true";



const color_cosmos = 
  [
    {
      "name":"Century Ply 108 SU",
      "rgb":"246,246,240",
      "hex":"#F6F6F0"
    },
    {
      "name":"Century Ply 158 SU",
      "rgb":"230,226,214",
      "hex":"#E6E2D6"
    },
    {
      "name":"Century Ply 231 SU",
      "rgb":"178,182,181",
      "hex":"#B2B6B5"
    }
  ]


export default function ShapeDiverViewer({ ticket="8519620422594c2675e5ecfdf90ddbd95a668d1476e8603ad95cc34b6e4b74c0d5bae40180855c8524312aeda9d8ecb236546c89ca8e0a5d603b29bcdae39e08c53aff4c596775b622b3d60e4862cae47c419544ba548e7813b9357477566d5b799a95c258019c-d8a12c7182b4f9fdcdd4de3b13ea57df", modelViewUrl="https://sdr8euc1.eu-central-1.shapediver.com" }) {
  const canvasRef = useRef(null);
  const sessionRef = useRef(null);
  const viewportRef = useRef(null);

  //All shapediver params
  //All shapediver params
  //All shapediver params
  const [width,setWidth] = useState(36);
  const [height,setHeight] = useState(96);
  const [depth,setDepth] = useState(24);
  const [baseType,setBaseType] = useState("shelves");
  const [baseDiv,setBaseDiv] = useState(2);
  const[drawersDiv,setDrawersDiv]=useState("1");
  const[color,setColor]=useState(color_cosmos[0]);
  const[showShutter,setShowShutter]=useState(false);
  const[openWhich,setOpenWhich]=useState(null);
  //All shapediver params
  //All shapediver params
  //All shapediver params

  const[price,setPrice]=useState("Calculating...");
  const allParams =useRef();
  const[sdLoading,setSdLoading]=useState(true);
  const router = useRouter();


  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    if(window.innerWidth>500){
      setOpenWhich(1);
    }
  }, []); 

  

  useEffect(() => {
    let canceled = false;
    if (!SHAPEDIVER_ENABLED) return;
    if (!canvasRef.current) return;
    async function init() {

      try {

        // Dynamic import so SSR doesn't break in Next.js
        const { createSession, createViewport } = await import("@shapediver/viewer");
        const canvasElement = canvasRef.current;
        // 1) Create viewport
        const viewport = await createViewport({
          id: "designopolisViewport",
          canvas: canvasElement
        });

        // 2) Create session
        const session = await createSession({
          id: "designopolisSession",
          ticket,
          modelViewUrl
        });

        if (canceled) return;

        viewportRef.current = viewport;
        sessionRef.current = session;

        // Optional: read initial value of a known parameter (e.g. "Width")
        if (session.getParameterByName) {
          const wParam = session.getParameterByName("Wardrobe Params")[0].value; // change name to your GH param
          console.log("This the param",wParam);
          allParams.current=wParam;
        }

        console.log("Init updation");
        await updateSD();
        updatePrice();
        setSdLoading(false);
      } catch (err) {
        console.error("Error initializing ShapeDiver viewer:", err);
      }
    }

    init();

    // Cleanup on unmount
    return () => {
      canceled = true;
      (async () => {
        try {
          if (sessionRef.current) {
            await sessionRef.current.close();
          }
        } catch (e) {
          console.warn("Error closing session", e);
        }
        try {
          if (viewportRef.current) {
            await viewportRef.current.close();
          }
        } catch (e) {
          console.warn("Error closing viewport", e);
        }
      })();
    };
  }, [ticket, modelViewUrl]);


  useEffect(()=>{
    "Updating everything!"
     updateSD();
     updatePrice();
  },[width,height,depth,baseType,baseDiv,drawersDiv,color,showShutter])

  function updatePrice(){
    const depth_multiple = 1500 + ((depth - 18)*50);
     const carcass_price = ((width*height)/144)*depth_multiple;
     const drawer_multiple = 1 + (drawersDiv==="2"?1:0) + (baseType==="drawers"?Number(baseDiv):0);
     const drawer_pricing = drawer_multiple*3000;
     const final_price = carcass_price+drawer_pricing;
     console.log("Updating pricing>>",carcass_price,drawer_multiple,drawer_pricing,final_price);
     setPrice(final_price);
  }

  async function updateSD(){
    const new_params = {
      "wardrobes": [
        {
          "width": Number(width),
          "height": Number(height),
          "depth": Number(depth),
          "topShelf": true,
          "topShelfHt":12,
          "bottomDrawers":baseType==="drawers"?true:false,
          "bottomDiv": Number(baseDiv),
          "midDiv":drawersDiv==="2"?true:false,
          "color":color.rgb,
          "showShutters":showShutter
        }
      ]
    }

    console.log('This is the params going in>>', new_params);

    const session = sessionRef.current;
    if (!session || !session.getParameterByName) return;

    const wardrobe_params = session.getParameterByName("Wardrobe Params")[0];

    try {
      wardrobe_params.value = JSON.stringify(new_params);
      // If your model does NOT auto-update on value change, force it:
      if (session.customize) {
        await session.customize();
      }
    } catch (e) {
      console.error("Error updating Width parameter:", e);
    }
  }

  return (
    <div className=" md:h-screen md:w-screen no-scrollbar md:overflow-hidden">
      <div className=" md:grid md:grid-cols-3 bg-[#F1EFEE] h-full md:overflow-hidden relative">
            <div className="flex flex-col items-center md:m-5 md:p-8 md:bg-white rounded-lg border-borderGrey/50 md:order-1 md:relative z-10 absolute bottom-0 inset-x-0">
                <div className={`h-max-[${screenSize.height-100}px] md:overflow-scroll no-scrollbar md:block flex w-full justify-center md:px-0 px-5 items-center gap-6`}>
                    <DropOpen label="Dimensions" setter={setOpenWhich} current={openWhich} serial={1} showShutter={showShutter} setShowShutter={setShowShutter} icon={<AdjustmentsVerticalIcon className="w-6 h-6"/>} width={screenSize.width}>
                        <Parameter upper_lim={48} lower_lim={24} default_val={width} unit="inches" type="select" state={width} setState={setWidth} title="Width" subtitle="Minimum 24 inches. Max 48 inches" />
                        <Parameter upper_lim={96} lower_lim={72} default_val={height} unit="inches" type="select" state={height} setState={setHeight} title="Height" subtitle="Minimum 72 inches. Max 96 inches" />
                        <Parameter upper_lim={30} lower_lim={18} default_val={depth} unit="inches" type="select" state={depth} setState={setDepth} title="Depth" subtitle="Minimum 18 inches. Max 30 inches" />
                    </DropOpen>
                    <DropOpen label="storage" setter={setOpenWhich} current={openWhich} serial={2} showShutter={showShutter} setShowShutter={setShowShutter} icon={<QueueListIcon className="w-6 h-6"/>} width={screenSize.width}>
                        <Parameter default_val={baseType} unit="" type="toggle" toggle_left={"drawers"} toggle_right={"shelves"} state={baseType} setState={setBaseType} title="Type" subtitle="Select a base storage type" />
                        <Parameter upper_lim={4} lower_lim={1} default_val={baseDiv} unit="" type="select" state={baseDiv} setState={setBaseDiv} title={`Number of sections`} subtitle="Minimum 1. Maximum 4" />
                        <Parameter default_val={drawersDiv} toggle_left={'1'} toggle_right={'2'} unit="" type="toggle" state={drawersDiv} setState={setDrawersDiv} title="Number of middle drawers" subtitle="Choose between 1 or 2 lockable drawers" />
                    </DropOpen>
                    <DropOpen label="Laminate" setter={setOpenWhich} current={openWhich} serial={3} setShowShutter={setShowShutter} showShutter={showShutter} icon={<SwatchIcon className="w-6 h-6"/>} width={screenSize.width}>
                        <div className=" flex justify-between my-8">
                          <div>
                                <p className=" font-normal text-lg">Laminate</p>
                                <p className=" text-xs text-greyText">{color.name}</p>
                          </div>
                          <div className=" flex items-center gap-1">
                            <button style={{backgroundColor:color_cosmos[0].hex}} onClick={()=>setColor(color_cosmos[0])}  className={`w-12 h-12 rounded-sm bg-[${color_cosmos[0].hex}] border-[1px] ${color.rgb===color_cosmos[0].rgb?'border-primary':'border-borderGrey/50'}`}></button>
                            <button style={{backgroundColor:color_cosmos[1].hex}} onClick={()=>setColor(color_cosmos[1])} className={`w-12 h-12 rounded-sm bg-[${color_cosmos[1].hex}] border-[1px] ${color.rgb===color_cosmos[1].rgb?'border-primary':'border-borderGrey/50'}`}></button>
                            <button style={{backgroundColor:color_cosmos[2].hex}} onClick={()=>setColor(color_cosmos[2])} className={`w-12 h-12 rounded-sm bg-[${color_cosmos[2].hex}] border-[1px] ${color.rgb===color_cosmos[2].rgb?'border-primary':'border-borderGrey/50'}`}></button>
                          </div>
                        </div>
                    </DropOpen>
                    <DropOpen label="Details" setter={setOpenWhich} current={openWhich} serial={4} showShutter={showShutter} setShowShutter={setShowShutter} icon={<InformationCircleIcon className="w-6 h-6"/>} width={screenSize.width}>
                      <div className="my-8">
                        
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <p className="uppercase text-xs text-greyText">Manufactured by</p>
                            <p className="uppercase text-xs text-right">Zima Blue Private Limited, Gachibowli, Hyderabad, 500111</p>
                          </div>
                          <div className="flex justify-between items-start mb-2">
                            <p className="uppercase text-xs text-greyText">Plywood</p>
                            <p className="uppercase text-xs text-right">Century Ply MR Grade</p>
                          </div>
                          <div className="flex justify-between items-start mb-2">
                            <p className="uppercase text-xs text-greyText">Hardware</p>
                            <p className="uppercase text-xs text-right">Hettich</p>
                          </div>
                          <div className="flex justify-between items-start mb-2">
                            <p className="uppercase text-xs text-greyText">Assembly</p>
                            <p className="uppercase text-xs text-right">Self Assembled</p>
                          </div>
                          <div className="flex justify-between items-start mb-10">
                            <p className="uppercase text-xs text-greyText">Dispatch timeline</p>
                            <p className="uppercase text-xs text-right">15 days</p>
                          </div>
                        </div>

                      </div>

                    </DropOpen>
                </div>
                <div className="md:absolute md:bottom-0 md:inset-x-0 md:p-8 p-5 w-full md:z-10 bg-white rounded-t-lg md:border-t md:rounded-b-lg border-borderGrey/10">
                  <div className=" mb-2">
                    <p className="uppercase text-lightGrey text-xs">total</p>
                    <p className=" text-2xl font-medium">INR {price.toLocaleString('en-IN')}</p>
                    <p className="uppercase text-lightGrey text-xs">taxes and shipping included</p>
                  </div>
                  <div>
                    <button onClick={()=>router.push('/login')} className="block h-12 bg-primary hover:bg-fullBlack text-white rounded-full w-full mb-2">Save & Place Order</button>
                  </div>
                  <div className=" flex justify-start hidden">
                    <p className=" uppercase text-lightGrey text-xs">Enter shipping address in next step</p>
                  </div>
                </div>
            </div>
            <div className="md:col-span-2 md:order-2 md:h-full md:w-full h-screen w-screen ">
                <div className="h-full w-full">
                    <canvas
                        ref={canvasRef}
                        className={`${sdLoading?"opacity-0":"opacity-100"}`}
                    />
                </div>
            </div>
      </div>
        
    </div>
  );
}