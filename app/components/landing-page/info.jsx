export default function Info({ icon, heading, text }) {
  return (
    <div className="group p-5 bg-black border border-borderGrey/50 rounded-xl relative">
      <div className="absolute inset-0   rounded-xl"></div>
      <div className="mb-2 relative z-10">
        <div className="mb-1">{icon}</div>
        <h4 className="text-lg">{heading}</h4>
      </div>
      <div className="opacity-50 text-sm">{text}</div>
    </div>
  );
}

// bg-gradient-to-t from-black to-fullBlack group-hover:from-lightBlack/50 transition duration-300
