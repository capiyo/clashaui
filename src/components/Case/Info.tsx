import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SimilarJobs } from './SimilarJobs';
import { toast } from 'react-toastify';
import { LoginContext } from '../ContextProvider/Context';
import { Applicants } from './Applicants/Applicants';
import ContactList from './Applicants/ContactList';
import { Undo } from 'lucide-react'; 

// Define TypeScript interfaces
interface Job {
  jobTitle: string;
  posterName: string;
  budget: string;
  location: string;
  description: string;
  postedDate: string;
  // Add other properties as needed
}

interface User {
  userId: string;
  userName: string;
  userEmail: string;
  // Add other properties as needed
}

interface ApplicationForm {
  question: string;
  answer: string;
}

interface FormValues {
  candidateID: string;
  jobID: string;
  applicationStatus: string;
  resume: File | null;
  applicationForm: ApplicationForm[];
  candidateFeedback: ApplicationForm[];
}

export const Info: React.FC = () => {
  const [openApplicants, setOpenApplicants] = useState<boolean>(true);
  const [open, setOpen] = useState<string>("max-sm:hidden");
  const [label, setLabel] = useState<string>("Close");
  const [job, setJob] = useState<Job | null>(null);
  const [applicants, setApplicants] = useState<[]>(null);
  const [file, setFile] = useState<File | undefined>();
  const [loginData, setLoginData] = useState<User | null>(null);

  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      candidateID: "",
      jobID: "",
      applicationStatus: "active",
      resume: null,
      applicationForm: [{
        question: "",
        answer: ""
      }],
      candidateFeedback: [{
        question: "",
        answer: ""
      }]
    }
  });

  const randomNum = Math.floor(Math.random() * (200 - 20 + 1) + 20);

  const opener = (): void => {
    if (label === "Close") {
      setOpen("max-sm:hidden");
      setLabel("View");
    } else {
      setOpen("absolute top-[300px] lg:hidden");
      setLabel("Close");
    }
  };

  useEffect(() => {
    if (id) {
      fetch(`https://solvus-api-4.onrender.com/jobs/current-job/${id}`)
        .then(res => res.json())
        .then((data: Job) => {
          setJob(data);
        })
        .catch((error: Error) => {
          console.error('Error fetching job:', error);
        });
    }
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      try {
        const user: User = JSON.parse(token);
        setLoginData(user);
        opener();
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  return (
    <div className='lg:w-[700px] container w-full '>
      <div className='rounded-lg'>
        <div className='flex flex-col lg:flex-row gap-8'></div>
           <Link   to="/" className=' flex md:flex lg:flex cursor-pointer  hover:text-red-900'>    
           <div className='family-rubik text-sm  '> <Undo color='green'/> 
                      </div></Link> 
                  
        
        {job ? (
          <div className='w-full'>
            {/* BASIC DETAILS */}
            <div className='max-sm:hidden flex items-center flex-wrap justify-center md:justify-normal'>
              
              <div className='mx-4 my-3 text-center md:text-left md:my-0'>
                <h1 className='text-xl md:text-2xl font-bold'>{job.jobTitle}</h1>
                <p className='text-secondary'>hopper.com</p>
                <p className='text-sm text-gray-700'>Posted: {job.postedDate}</p>
              </div>
            </div>

            {/* ADDITIONALS */}
            <div className='max-sm:hidden my-4 gap-2 grid grid-cols-2 sm:grid-cols-4'>
              <div className='bg-blue-300 rounded-lg py-4 md:py-5 text-center'>
                <h2 className='text-xs md:text-md font-semibold text-gray-700'>Employer:</h2>
                <p className='text-sm md:text-lg font-bold'>{job.posterName}</p>
              </div>
              <div className='bg-green-300 rounded-lg py-4 md:py-5 text-center'>
                <h2 className='text-xs md:text-md font-semibold text-gray-700'>Salary</h2>
                <p className='text-sm md:text-lg font-bold'>{job.budget}</p>
              </div>
              <div className='bg-blue-300 rounded-lg py-4 md:py-5 text-center'>
                <h2 className='text-xs md:text-md font-semibold text-gray-700'>Location</h2>
                <p className='text-sm md:text-lg font-bold'>{job.location}</p>
              </div>
              <div className='bg-background rounded-lg py-4 md:py-5 text-center'>
                <h2 className='text-xs md:text-md font-semibold text-gray-400'>Applicants</h2>
                <p className='text-sm md:text-lg font-bold'>{randomNum}</p>
              </div>
            </div>

            {/* JOB DESCRIPTION */}
            <div className='px-1 flex flex-col'>
              <h1 className='text-xl md:text-2xl font-bold'>{job.jobTitle}</h1>
              <h2 className='my-2 font-bold'>Job Description</h2>
              <p className='text-sm md:text-base text-justify'>
                {job.description}
              </p>
            </div>

            <div className='flex justify-center'>
              <button onClick={opener} className='block bg-background text-white text-md py-2 px-12 md:px-16 rounded-md'>
                {label} Applicants
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className='w-full'>
          <Applicants />
        </div>
      </div>
    </div>
  );
};
