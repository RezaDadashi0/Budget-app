import _ from "lodash";

export default function dependences(budgets, budget) {
  let percent = 0;
  let totalExpenses = 0;
  let totalSpend = 0;
  let sum = 0;
  const total = [];
  if (!_.isEmpty(budgets)) {
    budgets.forEach(budget => {
      total.push(budget.expenses.reduce((a, c) => a + c.expense, 0));
    });

    totalExpenses = total.reduce((a, c) => a + c);
    totalSpend = budgets.reduce((a, c) => a + c.spend, 0);
    percent = Math.ceil((totalExpenses / totalSpend) * 100);
  }

  if (!_.isEmpty(budget.expenses)) {
    sum = budget.expenses.reduce((a, c) => a + c.expense, 0);
    percent = Math.ceil((sum / budget.spend) * 100);
  }

  let width = `${percent}%`;
  if (percent > 100) width = "100%";

  let proccesseBarColor = "";
  let bgColor = "";

  if (percent > 100) {
    proccesseBarColor = "rgba(239,68,68,1)";
    bgColor = "bg-red-100";
  } else if (percent >= 70 && percent <= 100) {
    proccesseBarColor = "rgba(245,158,11,1)";
    bgColor = "bg-yellow-100";
  } else {
    proccesseBarColor = "rgba(59,130,246,1)";
    bgColor = "";
  }

  return {
    width,
    proccesseBarColor,
    bgColor,
    totalExpenses,
    totalSpend,
    percent,
    sum,
  };
}
