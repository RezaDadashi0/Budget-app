import React, { useContext } from "react";
import { BudgetContext } from "../App";

export default function Header() {
  const {
    setOpenAddBudgetModal,
    // setOpenAddExpenseModal
  } = useContext(BudgetContext);

  return (
    <div className="flex px-4 py-6">
      <div className="flex-1 text-3xl text-gray-800 mr-6 font-medium">
        Budgets
      </div>
      <div className="flex items-center justify-between w-60 gap-2">
        <button
          type="button"
          onClick={() => setOpenAddBudgetModal(true)}
          className="py-2 px-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
        >
          Add Budget
        </button>
        <button
          type="button"
          // onClick={() => setOpenAddExpenseModal(true)}
          className="py-2 px-2 bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}
