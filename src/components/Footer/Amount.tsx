import React from 'react'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast';
import {useForm} from 'react-hook-form'
import { DollarSign } from 'lucide-react';

export const Amount = () => {









const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


const  submitAmount=()=>{
  const data={
    homeTeam:"",
    awayTeam:"",
    amount:"",
    progress:"",
    date:"",
    day:"",
    awayWin:'',
    homeWin:'',
    placed:false



  }

}




   const onSubmit = async (data) => {
          console.log(data)
          // send data to backend API
          fetch("http://localhost:8000/clash/login", {
              method: "POST",
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(data)
          })
              .then((res) => res.json())
              .then((result) => {
                  console.log(result);
                  if (result.success) {
                      localStorage.setItem("usertoken", result.token)
                      localStorage.setItem("user", JSON.stringify(result.user));
  
                     // setLoginData(result.token)
                      
                      toast.success('Successfully toasted!')
                      //navigate('/'); 
                  }
                  else
                    console.log("hellooo")
                      ////oast.error(result.error)
              })
              .catch((err) => {
                 // toast.error("An error occured")
                  console.log(err);
              })
      }
  
  
  
  
  
  




























  return (
  <div className="space-y-4  right-0">
                 <div >
  <DrawerContent className='lg:w-[400px]'>
    <DrawerHeader>
      <DrawerTitle>Enter amount</DrawerTitle>
    </DrawerHeader>
    <form  className="ml-4 mr-4"  onSubmit={handleSubmit(onSubmit)}>
    <div className="">
                 
                  <input 
                  required {...register("amount")} 
                    type="text" 
                    className="w-full p-1 border rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="ksh:100"
                  />
                </div>
               
                <div>
                
                </div>
                   <DrawerFooter>
      <Button variant="gradient" className="w-full" size="sm">
                <DollarSign className="w-4 h-4 mr-2" />
              submit
              </Button>
      <DrawerClose>
       
      </DrawerClose>
    </DrawerFooter>



                </form>

  </DrawerContent>
  </div>
              </div>
  )
}
