"use client";

import { useRef, useState, useEffect, createContext, useContext } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export const AppContext = createContext();

export default function SketchCost() {
  //state.panel options are init, element, material, table as given in open_dsp.rb
  const [panelState, setPanelState] = useState({ panel: "table" });
  const [tableData, setTableData] = useState(null);
  const [say, setSay] = useState({ say: "init" });

  useEffect(() => {
    try {
      sketchup.say(JSON.stringify(say));
      console.log("Found!");
    } catch (e) {
      // ignore 'sketchup is not defined' in development
      // but report other errors
      if (!(e instanceof ReferenceError)) {
        console.error(e);
      } else {
        console.log("Not found but no error");
      }
    }
  }, [say]);

  useEffect(() => {
    //defining a function on global object that can be called from ruby
    global.updateData = function (data) {
      console.log("This is the new data>>", data, data.model_dict);
      setTableData(data.model_dict);
      setPanelState(data.state);
    };
  }, []);

  return (
    <div
      id="skcost"
      className=" bg-white text-black px-5 py-10 relative overflow-y-hidden"
    >
      <AppContext.Provider
        value={{
          setSay: setSay,
          panelState: panelState,
          setPanelState: setPanelState,
        }}
      >
        <ElementPanel />
        <Table tableData={tableData} />
      </AppContext.Provider>
    </div>
  );
}

export function Table({ tableData }) {
  //   const [modelData, setModelData] = useState({});
  const [rowData, setRowData] = useState(tableData);
  const [colDefs, setColDefs] = useState([
    {
      headerName: "Image",
      valueGetter: (p) => p.data.base64,
      flex: 1,
      cellRenderer: (params) => (
        <img
          id="base64image"
          className="h-full"
          src={`data:image/jpeg;base64, ${params.value}`}
        />
      ),
    },
    { field: "entity", flex: 1 },
    { headerName: "Item of Work", valueGetter: (p) => p.data.type, flex: 2 },
    { field: "quantity", flex: 1 },
    { field: "unit", flex: 1 },
    { field: "rate", flex: 1 },
    { field: "amount", flex: 1 },
  ]);

  useEffect(() => {
    setRowData(tableData);
  }, [tableData]);

  return (
    <div className="">
      <div className="flex justify-between mb-8">
        <h1 className="text-5xl">Guptas Residence</h1>
        <button className="px-6 md:px-8 h-12 bg-primary rounded-full text-sm text-white hover:bg-primary/70 ">
          Export
        </button>
      </div>
      {/* {Object.keys(modelData).map((key) => (
        <p key={key}>
          {key}={modelData[key]}
        </p>
      ))} */}
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 1000 }} // the Data Grid will fill the size of the parent container
      >
        {rowData ? (
          <AgGridReact rowData={rowData} columnDefs={colDefs} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export function ElementPanel() {
  const context = useContext(AppContext);
  return (
    <div
      className={`${
        context.panelState.panel !== "table" ? "fixed" : "hidden"
      } inset-0 z-10 h-screen w-full backdrop-blur-sm overflow-y-hidden`}
    >
      <div className="bg-white w-1/2 h-full p-5 drop-shadow-md">
        <div className="py-5">
          <div className=" flex items-center justify-center mb-8">
            <div className="w-[150px] h-[150px] bg-orange drop-shadow-md rounded-xl">
              {context.panelState.base64 && (
                <img
                  id="base64image"
                  src={`data:image/jpeg;base64, ${context.panelState.base64}`}
                />
              )}
            </div>
          </div>
          {context.panelState.panel === "element" && <Specification />}
          {context.panelState.panel === "add" && <Add />}
        </div>
      </div>
    </div>
  );
}

export function Specification() {
  const context = useContext(AppContext);
  const [type, setType] = useState();
  const [rate, setRate] = useState();
  const [description, setDescription] = useState();
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl">Specifications</h2>
        <button className=" text-primary">Match Specifications</button>
      </div>
      <form
        action={(formData) => {
          context.setSay({
            say: "add_element",
            id: context.panelState.id,
            base64: context.panelState.base64,
            description: formData.get("description"),
            type: formData.get("type"),
            rate: formData.get("rate"),
          });
        }}
      >
        <div className="mb-4">
          <input
            name="type"
            type="text"
            placeholder="What type of element is this?*"
            className=" bg-lightGrey/10 w-full h-12 px-5 py-2 border border-solid rounded-xl border-borderGrey/30"
            required={true}
          ></input>
        </div>
        <div className={`mb-4 ${context.panelState.area ? "block" : "hidden"}`}>
          Calculated area: {context.panelState.area}
        </div>
        <div className="mb-4">
          <input
            name="rate"
            type="number"
            placeholder="What will be the rate per unit?*"
            className=" bg-lightGrey/10 w-full h-12 px-5 py-2 border border-solid rounded-xl border-borderGrey/30"
            required={true}
          ></input>
        </div>
        <div className="mb-4">
          <textarea
            name="description"
            type="text"
            rows={4}
            placeholder="Write the specification text*"
            className=" bg-lightGrey/10 w-full px-5 py-2 border border-solid rounded-xl border-borderGrey/30"
            required={true}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button className="mr-4 text-sketch-green">Cancel</button>
          <button
            className="px-6 md:px-8 h-12 bg-primary rounded-full text-sm text-white hover:bg-primary/70"
            type="submit"
          >
            Finish
          </button>
        </div>
      </form>
    </div>
  );
}

export function Add() {
  const context = useContext(AppContext);
  return (
    <div className="">
      <div className="mb-4">
        <div className="mb-4">
          <h2 className="text-2xl">Calculate quantities by</h2>
        </div>
        <div className=" grid grid-rows-3 gap-4">
          <div className=" bg-lightGrey/10 flex justify-start items-center px-5 py-2">
            <div className=" w-[40px] h-[40px] bg-orange rounded-lg"></div>
            <button
              className="ml-4"
              onClick={() =>
                // context.setSay({
                //   say: "add_element",
                //   id: context.panelState.id,
                //   base64: context.panelState.base64,
                // })
                context.setPanelState((curr_state) => ({
                  panel: "element",
                  id: curr_state.id,
                  base64: curr_state.base64,
                }))
              }
            >
              <p>By Number of Units</p>
              <p className=" text-greyText">5 instances found</p>
            </button>
          </div>
          <div className=" bg-lightGrey/10 flex justify-start items-center px-5 py-2">
            <div className=" w-[40px] h-[40px] bg-orange rounded-lg"></div>
            <div className="ml-4">
              <p>By Area</p>
              <button
                className=" text-greyText"
                onClick={() =>
                  context.setSay({
                    say: "calc_area",
                    id: context.panelState.id,
                    base64: context.panelState.base64,
                  })
                }
              >
                Click to select faces
              </button>
            </div>
          </div>
          <div className=" bg-lightGrey/10 flex justify-start items-center px-5 py-2">
            <div className=" w-[40px] h-[40px] bg-orange rounded-lg"></div>
            <div className="ml-4">
              <p>By Running Length</p>
              <p className=" text-greyText">Click to select edges</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="mr-4 text-sketch-green">Cancel</button>
        <button
          className="px-6 md:px-8 h-12 bg-primary rounded-full text-sm text-white hover:bg-primary/70"
          type="submit"
        >
          Finish
        </button>
      </div>
    </div>
  );
}
