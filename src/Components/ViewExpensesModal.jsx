import React, { useState, useContext } from "react";
import { BudgetContext } from "../App";
import BlurOnIcon from "@material-ui/icons/BlurOn";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import Pagination from "./pagination";
import paginate from "../utils/paginate";

export default function ViewExpensesModal({ budget }) {
  const { setOpenViewExpensesModal, budgets, setBudgets } =
    useContext(BudgetContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);

  const handlePagination = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const handleExpensesDelete = expenseID => {
    const expensesChange = budget.expenses.filter(
      expense => expense.id !== expenseID
    );
    const newBudget = { ...budget, expenses: expensesChange };
    const newBudgets = [...budgets];
    const index = budgets.findIndex(b => b.id === newBudget.id);
    newBudgets[index] = newBudget;
    setBudgets(newBudgets);
  };

  const handleBudgetDelete = budgetID => {
    setBudgets(budgets.filter(b => b.id !== budgetID));
    setOpenViewExpensesModal(false);
  };

  const budgetExpenses = paginate(budget.expenses, pageSize, currentPage);

  return (
    <div className="absolute z-10 w-screen h-screen -mt-[88px] bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden mt-20">
        <div
          onClick={() => setOpenViewExpensesModal(false)}
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
              <span className="px-2 text-gray-500 bg-white">
                {budget.title}
              </span>
            </div>
          </div>
        </div>

        {/* //////////////////// Budget.spenses //////////////////// */}

        <ul className="flex flex-col divide divide-y">
          {budgetExpenses.map(expense => (
            <li className="flex items-center p-3" key={expense.id}>
              <BlurOnIcon />
              <div className="font-medium flex-1 ml-2">
                {expense.description}
              </div>
              <div className="text-indigo-800 text-md pr-10">
                ${expense.expense}
              </div>
              <button
                type="button"
                onClick={() => handleExpensesDelete(expense.id)}
                className="py-2 px-2 bg-white hover:bg-gray-100 focus:ring-red-500 focus:ring-offset-red-200 text-red-500 transition ease-in duration-200 text-center text-base font-light shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
              >
                <DeleteForeverRoundedIcon />
              </button>
            </li>
          ))}
        </ul>

        <Pagination
          onClick={handlePagination}
          length={budget.expenses.length}
          pageSize={pageSize}
          currentPage={currentPage}
        />

        <div className="px-3 py-6">
          <button
            type="button"
            onClick={() => handleBudgetDelete(budget.id)}
            className="py-2 px-2 bg-red-500 hover:bg-gray-100 hover:text-red-600 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-full "
          >
            {`Delete ${budget.title}`}
          </button>
        </div>
      </div>
    </div>
  );
}
