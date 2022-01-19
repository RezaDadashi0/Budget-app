import { createContext, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import AddBudgetModal from "./Components/AddBudgetModal";
import AddExpenseModal from "./Components/AddExpenseModal";
import Budget from "./Components/Budget";
import Header from "./Components/Header";
import Total from "./Components/Total";
import ViewExpensesModal from "./Components/ViewExpensesModal";

export const BudgetContext = createContext();

export default function App() {
  const initialBudgets = [
    {
      id: 1,
      title: "Budget 1",
      expenses: [
        { id: 10, description: "Description 1 - Budget 1", expense: 10 },
        { id: 11, description: "Description 2 - Budget 1", expense: 20 },
        { id: 12, description: "Description 3 - Budget 1", expense: 30 },
      ],
      spend: 70,
    },
    {
      id: 2,
      title: "Budget 2",
      expenses: [
        { id: 13, description: "Description 1 - Budget 2", expense: 10 },
        { id: 14, description: "Description 2 - Budget 2", expense: 20 },
        { id: 15, description: "Description 3 - Budget 2", expense: 30 },
      ],
      spend: 100,
    },
  ];

  const [selectedBudgetID, setSelectedBudgetID] = useState(null);
  const [budgets, setBudgets] = useState(initialBudgets || []);
  const [openAddBudgetModal, setOpenAddBudgetModal] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openViewExpensesModal, setOpenViewExpensesModal] = useState(false);

  const selectedBudget = budgets.find(budget => budget.id === selectedBudgetID);

  const handleAddBudget = ({ title, spend }) => {
    const newBudget = {
      id: uuid(),
      title,
      expenses: [],
      spend,
    };
    setBudgets([...budgets, newBudget]);
  };

  const handleAddExpense = (newExpense, budget) => {
    const expensesChange = [{ ...newExpense, id: uuid() }, ...budget.expenses];
    const newBudget = { ...budget, expenses: expensesChange };
    const newBudgets = [...budgets];
    const index = budgets.findIndex(b => b.id === newBudget.id);
    newBudgets[index] = newBudget;
    setBudgets(newBudgets);
  };

  const BudgetContextValue = {
    handleAddBudget,
    setOpenAddBudgetModal,
    setOpenAddExpenseModal,
    setOpenViewExpensesModal,
    openViewExpensesModal,
    setSelectedBudgetID,
    budgets,
    setBudgets,
    handleAddExpense,
  };

  useEffect(() => {
    const budgetsJSON = localStorage.getItem("budgets");
    if (budgetsJSON) setBudgets(JSON.parse(budgetsJSON));
  }, []);

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  return (
    <BudgetContext.Provider value={BudgetContextValue}>
      <div className="relative">
        <Header />
        {openAddBudgetModal && <AddBudgetModal />}
        {openAddExpenseModal && <AddExpenseModal budget={selectedBudget} />}
        {openViewExpensesModal && <ViewExpensesModal budget={selectedBudget} />}
        <div className="flex flex-wrap justify-center max-w-7xl mx-auto p-1">
          {budgets.map(budget => (
            <Budget key={budget.id} {...{ budget }} />
          ))}
        </div>
        <div className="mt-20">{budgets && <Total />}</div>
      </div>
    </BudgetContext.Provider>
  );
}
