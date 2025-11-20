export default function Calendar({ sessions }) {
  const markers = ["7pm", "8pm", "9pm"];
  return (
    <div className="relative">
      <div
        className="absolute text-xs uppercase h-full grid items-center pl-3"
        style={{ gridTemplateRows: `repeat(${sessions.length},1fr)` }}
      >
        {sessions.map((day, i) => {
          const date = new Date(day.date);
          const d = new Intl.DateTimeFormat("en-in", {
            //Getting the date from Date constructor
            month: "short",
            day: "numeric",
          });
          const w = new Intl.DateTimeFormat("en-in", {
            //Getting the day of the week that will be mentioned in the calendar
            weekday: "short",
          });
          return (
            <div className="" key={i}>
              <p suppressHydrationWarning>{d.format(date)}</p>
              <p suppressHydrationWarning>({w.format(date)})</p>
            </div>
          );
        })}
      </div>
      {/* Using isloate css property to clip the scrollbar in Safari */}
      <div className="relative ml-16 md:ml-24 bg-fullBlack isolate rounded-r-3xl overflow-hidden border border-borderGrey">
        {/* Marking the date in the side of the calendar */}

        <div
          className="grid h-full overflow-x-scroll relative"
          style={{
            gridTemplateRows: `repeat(${sessions.length},1fr)`,
          }}
        >
          {/* Creating the container with the time markers */}
          <div
            className="absolute h-full inset-0 grid w-[200%] md:w-full"
            style={{ gridTemplateColumns: "repeat(3,1fr)" }}
          >
            {markers.map((time) => {
              return (
                <div
                  className="border-l border-borderGrey/50 relative"
                  key={time}
                >
                  <p className="absolute transform opacity-30 z-10 text-xs">
                    {time}
                  </p>
                </div>
              );
            })}
          </div>
          {sessions.map((day) => {
            const date = new Date(day.date);
            const t = new Intl.DateTimeFormat("en-in", { timeStyle: "short" }); //Getting the time

            return (
              <div className="" key={day.date}>
                <div
                  className="grid border-b border-borderGrey items-center relative py-6 md:py-10 w-[200%] md:w-full"
                  style={{ gridTemplateColumns: "repeat(12,1fr)" }}
                >
                  {day.sessions.map((slot, index) => {
                    const start = new Date(day.date + "T" + slot.start);
                    const end = new Date(day.date + "T" + slot.end);
                    const start_slot =
                      (start - new Date(day.date + "T" + "19:00")) /
                      (1000 * 60 * 15);
                    const end_slot =
                      (end - new Date(day.date + "T" + "19:00")) /
                      (1000 * 60 * 15);
                    return (
                      <div
                        style={{
                          gridColumn: `${start_slot + 1}/${end_slot + 1}`,
                        }}
                        key={slot.start}
                        className=" bg-primary rounded-sm p-2 hover:bg-primary/90"
                      >
                        <p
                          className="text-xs uppercase"
                          suppressHydrationWarning
                        >
                          {t.format(start)} to {t.format(end)}
                          <br></br>
                          {day.covering ? (
                            <span className="opacity-70">{day.covering}</span>
                          ) : (
                            <br></br>
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
