import React, { useContext } from "react";
import { BudgetContext } from "../App";
import dependences from "../utils";

export default function Budget({ budget }) {
  // export default function Budget({ budget: { id, title, expenses, spend } }) {
  // const { title, expense, spend } = budget;
  const {
    setOpenAddExpenseModal,
    setOpenViewExpensesModal,
    setSelectedBudgetID,
  } = useContext(BudgetContext);

  const { width, proccesseBarColor, bgColor, percent, sum } = dependences(
    "",
    budget
  );

  const handleAddExpense = id => {
    setOpenAddExpenseModal(true);
    setSelectedBudgetID(id);
  };

  const handleViewExpenses = id => {
    setOpenViewExpensesModal(true);
    setSelectedBudgetID(id);
  };

  return (
    <div className="w-full md:w-1/2 xl:w-1/4 px-3 py-3">
      <div className={`border px-4 pt-8 pb-5 rounded-lg ${bgColor}`}>
        <div className="flex justify-between items-center">
          <div className="text-xl font-medium text-gray-800">
            {budget.title}
          </div>
          <div className="text-lg text-gray-900">
            {`$${sum} /`}
            <span className="text-light text-sm text-gray-500">{` $${budget.spend}`}</span>
          </div>
        </div>
        <div className="p-4 my-2">
          <div className="h-4 bg-gray-300 rounded-full relative">
            <div
              style={{ width: width, backgroundColor: proccesseBarColor }}
              className={`h-full text-center text-xs text-white rounded-full`}
            >
              <div className="absolute w-full h-full top-0 left-0">{`${percent}%`}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <button
            type="button"
            onClick={() => handleAddExpense(budget.id)}
            className="py-2 px-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-light shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
          >
            Add Expense
          </button>
          <button
            type="button"
            onClick={() => handleViewExpenses(budget.id)}
            className="py-2 px-2 bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 transition ease-in duration-200 text-center text-base font-light shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
          >
            View Expenses
          </button>
        </div>
      </div>
    </div>
  );
}
