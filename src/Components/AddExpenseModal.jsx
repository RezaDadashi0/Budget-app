import React, { useContext, useState } from "react";
import _ from "lodash";
import { BudgetContext } from "../App";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";

export default function AddExpenseModal({ budget }) {
  const { handleAddExpense, setOpenAddExpenseModal } =
    useContext(BudgetContext);

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({ description: "", expense: "" });

  const handleChange = e => {
    let { name, value } = e.target;
    if (value === "" || value == 0)
      setErrors({
        ...errors,
        [name]: `${name} dose not ellowed to be empty!`,
      });
    else {
      const clonedErrors = { ...errors };
      delete clonedErrors[name];
      setErrors(clonedErrors);
    }

    if (name === "expense" && value) value = parseInt(value);

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    if (_.isEmpty(errors)) {
      e.preventDefault();
      handleAddExpense(values, budget);
      setOpenAddExpenseModal(false);
    }
  };

  let classname =
    "rounded-lg border-transparent my-1 flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none";

  return (
    <div className="absolute z-10 w-screen h-screen -mt-[88px] bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden mt-20">
        <div
          onClick={() => setOpenAddExpenseModal(false)}
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
              <span className="px-2 text-gray-500 bg-white">New Expense</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="w-full space-y-6">
              <div className="w-full">
                <label htmlFor="description" className="text-gray-600">
                  Description
                  {errors.description && (
                    <span className="text-red-500 ml-1 required-dot">*</span>
                  )}
                </label>
                <input
                  autoFocus
                  value={values.description}
                  onChange={handleChange}
                  type="text"
                  id="description"
                  name="description"
                  className={
                    errors.description
                      ? `${classname} focus:none border-red-500`
                      : `${classname} focus:ring-purple-600 focus:ring-2 focus:border-transparent`
                  }
                  placeholder="New Description ..."
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="description" className="text-gray-600">
                  Expense
                  {errors.expense && (
                    <span className="text-red-500 ml-1 required-dot">*</span>
                  )}{" "}
                </label>
                <input
                  value={values.expense}
                  onChange={handleChange}
                  type="number"
                  id="expense"
                  name="expense"
                  className={
                    errors.expense
                      ? `${classname} focus:none border-red-500`
                      : `${classname} focus:ring-purple-600 focus:ring-2 focus:border-transparent`
                  }
                  placeholder="Expense Amount ..."
                />
                {errors.expense && (
                  <p className="text-sm text-red-500">{errors.expense}</p>
                )}
              </div>
              <div className="w-full">
                <input
                  disabled
                  value={budget.title}
                  type="text"
                  id="budget"
                  name="budget"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="py-2 px-4 mt-5 bg-indigo-600 hover:bg-gray-100 hover:text-indigo-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Add Expense
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
