"use client";

import {useState,useContext,useEffect} from 'react'
import  {currencyFormatter} from '@/lib/utils'
import {Chart as ChartJS,ArcElement,Tooltip,Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import AddIncomeModal from "@/components/modals/AddIncomeModal"
import ExpenseCategoryItem from '@/components/ExpenseCategoryitem'; 
import { FinanceContext } from '@/lib/finance-context';
import {authContext} from "@/lib/store/auth-context";
import AddExpenseModal from "@/components/modals/AddExpenseModal";
import SignIn from "@/components/modals/SignIn"

ChartJS.register(ArcElement,Tooltip,Legend);

export default function Home(){
   
    const [showAddIncomeModal,setShowAddIncomeModal]=useState(false);

    const [showAddExpenseModal,setShowAddExpenseModal]=useState(false);

    const[balance,setBalance]=useState(0);

    const {expenses,income}=useContext(FinanceContext);

    const {user,loading}=useContext(authContext);

   useEffect(()=>{
    const newBalance=income.reduce((total,i)=>{

      return total+i.amount;
    },0) -
    expenses.reduce((total,e)=>{
      return total+e.total;
    },0);

    setBalance(newBalance);
   },[expenses,income])


   if(!user){
    return <SignIn/>
   }
   return (
    <>
    {/*Add icome Modal */}
     
   <AddIncomeModal show={showAddIncomeModal} onClose={setShowAddIncomeModal} income={[]}/>

   {/*ADD EXPENSE MODEL */}
   <AddExpenseModal show={showAddExpenseModal} onClose={setShowAddExpenseModal} income={[]}/>

    <main className="container max-w-2xl px-6 py-6 mx-auto">
    <section>
      <small className="text-grey-400 text-md">MyBalance</small>
      <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
    </section>
   <section className="flex items-center gap-2 py-3">
    
    <button onClick={()=>{
     setShowAddExpenseModal(true)
    }}
    className="btn btn-primary btn-primary-border">+Expenses</button>
    <button onClick={()=>{
      setShowAddIncomeModal(true);
    }}className="btn btn-primary btn-primary-border">+Income</button>
   </section>

   {/*Expenses */}
   <section className="py-6">
      
       <h3 className="text-2xl ">My Expenses</h3>
  
       <div className="flex flex-col gap-4 mt-6">
         {expenses.map((expense)=>{
          return (
            <ExpenseCategoryItem 
            key={expense.id} 
             expense={expense}
            />
    
          );
         })}
        
       </div>
   </section>
   {/*chart Section */}
   <section className="py-6">
     <a id="stats"/>
      <h3 className="text-2xl ">Stats</h3>
      <div className='w-1/2 mx-auto'>
        <Doughnut data={{
          labels:expenses.map(expense=> expense.title),
          datasets:[
            {
              label:"Expenses",
              data:expenses.map(expense=>expense. total),
              backgroundColor:expenses.map(expense=>expense.color),
              bolderColor:['#18181b'],
              borderWidth:5,
            }
          ]
        }}/>
      </div>
   </section>
   </main>
   </>
   );
};
