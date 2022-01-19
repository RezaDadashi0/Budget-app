import React, { useContext } from "react";
import { BudgetContext } from "../App";
import dependences from "../utils";

export default function Total() {
  const { budgets } = useContext(BudgetContext);
  const {
    width,
    proccesseBarColor,
    bgColor,
    totalExpenses,
    totalSpend,
    percent,
  } = dependences(budgets, "");

  return (
    <div className="w-full md:w-1/2 xl:w-1/3 px-3 py-3 mx-auto">
      <div className={`border px-4 pt-8 pb-5 rounded-lg ${bgColor}`}>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold text-gray-800">Total</div>
          <div className="text-xl text-gray-900">
            {`$${totalExpenses} /`}
            <span className="text-medium text-base text-gray-500">{` $${totalSpend}`}</span>
          </div>
        </div>
        <div className="p-4 my-2">
          <div className="h-5 bg-gray-300 rounded-full relative">
            <div
              style={{ width: width, backgroundColor: proccesseBarColor }}
              className={`h-full text-center text-sm text-white rounded-full`}
            >
              <div className="absolute w-full h-full top-0 left-0">{`${percent}%`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
