import React, { useState, useEffect } from 'react';
import { Info } from './Info';
import { Chats } from './Chatpage.tsx';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Applicants } from './Applicants/Applicants';
import ContactList from './Applicants/ContactList';
import { RootState } from '../ReduxPages/reducers/store.tsx';

// Define TypeScript interfaces
interface Job {
  id: string;
  status: string;
  // Add other job properties as needed
}



export const JobDetails: React.FC = () => {
  const [people, setPeople] = useState<[]>([]);
  const [gigStatus,setGigStatus]=useState("")
  const [job, setJob] = useState<Job | undefined>();
  const [status, setStatus] = useState<string>("");
  const { id } = useParams<{ id: string }>();
   const caseId = useSelector((state: RootState) => state.caser.caseData.caseId);

  useEffect(() => {
    if (id) {
      fetch(`https://solvus-api-4.onrender.com/jobs/current-job/${id}`)
        .then(res => res.json())
        .then((data: Job) => { 
          setStatus(data.status);
          setJob(data);
          console.log(data.status);
        })
        .catch((error: Error) => {
          console.error('Error fetching job details:', error);
        });
    }
  }, [id, gigStatus]);

  return (
    <div className='flex w-full lg:flex-row justify-evenly   h-[1000px]'>
      <div>
        {status?


        <div>
        {status==="Open" ? (
          <div  className='overflow-auto md:flex h-screen'>
          <div className='overflow-auto md:flex h-screen '>
            <Info />
          </div>
           <div className='overflow-auto md:flex  lg:flex h-screen hidden'>
            <Info />
          </div>
          </div>
        ) : (
          <div className='overflow-auto md:flex h-screen'>
          <div className='overflow-auto hidden md:flex' >
            <Info/>
            
          </div>
           <div className='overflow-auto' >
            <Chats/>
            
          </div>
          </div>
        )}
        </div>:<div>Loading ...</div>}
      </div>



     
     
    </div>
  );
};