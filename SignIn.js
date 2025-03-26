import React,{useContext} from "react";
import {FcGoogle} from "react-icons/fc"
import { authContext } from "@/lib/store/auth-context";

function SignIn(){
    const {googleLoginHandler}=useContext(authContext);

    return (
        <main className="container max-w-2xl px-6 mx-auto ">

            <h1 className="mb-6 text-6xl font-bold text-center">Welcome</h1>
            <div className="flex overflow-hidden shadow-md shadow-slate-500 rounded-2xl">
                 <div className="h-52 ">
                   
                 </div>
                 <div className="px-20 py-8 items-center  align-middle ">
                    <h3 className="px-20 text-2xl text-center ">Please Sign In to continue</h3>
                    <button onClick={googleLoginHandler} className="flex self-start gap-2 p-4 mx-auto mt-6 font-medium text-white align-middle bg-gray-700 rounded-lg">
                        <FcGoogle className="text-2xl  "/>Google
                    </button>
                 </div>
            </div>
        </main>
    )
}
export default SignIn;