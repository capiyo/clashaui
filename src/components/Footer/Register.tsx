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

export const Register = () => {
  const url="http://localhost:3000/api/auth/register"









const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()







   const onSubmit = async (data) => {
          console.log(data)
          // send data to backend API
          fetch(url, {
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
  <div className="space-y-4 justify-center ml-[200px]">
                 <div >
  <DrawerContent className='lg:w-[400px]'>
    <DrawerHeader>
      <DrawerTitle>Register and enjoy </DrawerTitle>
    </DrawerHeader>
    <form  className="ml-4 mr-4"  onSubmit={handleSubmit(onSubmit)}>
    <div className="">
      <label className="block text-sm font-medium mb-2">username</label>
                  <input 
                  required {...register("username")} 
                    type="text" 
                    className="w-full p-1 border rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. tesla"
                  />
                  <label className="block text-sm font-medium mb-2">phone</label>
                  <input 
                  required {...register("phone")} 
                    type="phone" 
                    className="w-full p-1 border rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="e.g 0712345679"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">password</label>
                  <input 
                  required {...register("password")} 
                    type="password" 
                    className="w-full p-1 border rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="e.g @tesla"
                  />
                </div>
                <div>
                
                </div>
                   <DrawerFooter>
      <Button >Submit</Button>
      <DrawerClose>
        <Button  type="submit" variant="outline">New User? Register</Button>
      </DrawerClose>
    </DrawerFooter>



                </form>

  </DrawerContent>
  </div>
              </div>
  )
}
