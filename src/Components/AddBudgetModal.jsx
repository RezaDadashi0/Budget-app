import React, { useContext, useState } from "react";
import { BudgetContext } from "../App";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";

export default function AddBudgetModal() {
  const { handleAddBudget, setOpenAddBudgetModal } = useContext(BudgetContext);

  const [values, setValues] = useState({});

  const handleChange = e => {
    let { name, value } = e.target;
    if (name === "spend") value = parseInt(value);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleAddBudget(values);
    setOpenAddBudgetModal(false);
  };

  return (
    <div className="absolute z-10 w-screen h-screen -mt-[88px] bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden mt-20">
        <div
          onClick={() => setOpenAddBudgetModal(false)}
          className="font-bold cursor-pointer text-red-700 bg-red-50 hover:bg-red-100 transition ease-in w-5 h-5 rounded-full text-center flex justify-center items-center m-4 -mb-8"
        >
          <HighlightOffRoundedIcon fontSize="medium" />
        </div>
        <div className="px-4 py-8 sm:px-10">
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-lg leading-8">
              <span className="px-2 text-gray-500 bg-white">New Budget</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="w-full space-y-6">
              <div className="w-full">
                <input
                  autoFocus
                  value={values.title}
                  onChange={handleChange}
                  type="text"
                  id="title"
                  name="title"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Title ..."
                />
              </div>
              <div className="w-full">
                <input
                  value={values.spend}
                  onChange={handleChange}
                  type="number"
                  id="spend"
                  name="spend"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Max Spend ..."
                />
              </div>
              <div>
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="py-2 px-4 mt-5 bg-indigo-600 hover:bg-gray-100 hover:text-indigo-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Add Budget
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
