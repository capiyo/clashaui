import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginContext } from '../ContextProvider/Context.jsx';
import { useDispatch, useSelector } from 'react-redux';

// Define TypeScript interfaces
interface User {
  userId: string;
  userName: string;
  userEmail: string;
  phoneNumber?: string;
}

interface Applicant {
  workerName: string;
  workerEmail: string;
  workerId: string;
  pSkill?: string;
  // Add other properties as needed based on your API response
}

interface MessageData {
  workerId: string;
  posterId: string;
  caseId: string;
  caseTitle: string;
  workerEmail: string;
  workerName: string;
  posterName: string;
  posterEmail: string;
  message: string;
  status: string;
}

interface PaymentData {
  budget: string;
  phoneNumber?: string;
}

interface RootState {
  caseData: {
    caseId: string;
    budget: string;
    caseTitle: string;
  };
  // Add other state properties as needed
}

interface SimilarJobsProps {
  title?: string;
}

interface CardProps {
  applicants: Applicant;
  title?: string;
}

export const SimilarJobs: React.FC<SimilarJobsProps> = ({ title }) => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const loginData = useContext(LoginContext);
  const [myId, setMyId] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      try {
        const user: User = JSON.parse(token);
        setMyId(user.userId);
        // Note: setLoginData might not work as expected since LoginContext is likely a context object
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  useEffect(() => {
    fetch("https://solvus-api-4.onrender.com/jobs/applicants")
      .then(res => res.json())
      .then((data: Applicant[]) => {
        const newData = data;
        setApplicants(newData);
        console.log(newData);
      })
      .catch((error: Error) => console.log(error));
  }, []);

  return (
    <div className=''>
      <h1 className='text-center text-xl md:text-2xl font-bold text-primary mt-8 md:mt-6'>All Applicants</h1>
      <div className='grid sm:grid-cols-1 md:grid-cols-1'>
        {applicants.map((people, key) => (
          <Card key={key} applicants={people} title={title} />
        ))}
      </div>
    </div>
  );
};

const Card: React.FC<CardProps> = ({ applicants, title }) => {
  const [assign, setAssign] = useState<boolean>(false);
  const [workerId, setWorkerId] = useState<string>('');
  const [posterId, setPosterId] = useState<string>("");
  const [workerName, setWorkername] = useState<string>("");
  const [loginData, setLoginData] = useState<User | null>(null);
  const [bossPhone, setBossPhone] = useState<string | undefined>();
  
  const caseId = useSelector((state: RootState) => state.caseData.caseId);
  const caseTitel = useSelector((state: RootState) => state.caseData.caseTitle);
  const mybudget = useSelector((state: RootState) => state.caseData.budget);

  const [myId, setMyId] = useState<string>("");
  const [posterName, setPostername] = useState<string>("");
  const [posterEmail, setPosterEMail] = useState<string>("");

  const confirmAssign = (): void => {
    setAssign(true);
  };

  const getMessApplicantsData = (userName: string, userId: string, userEmail: string): void => {
    const messageData: MessageData = {
      workerId: userId,
      posterId: myId,
      caseId: caseId,
      caseTitle: caseTitel,
      workerEmail: userEmail,
      workerName: userName,
      posterName: posterName,
      posterEmail: posterEmail,
      message: "Congratulations you are assigned the gig of Angular dev from @Capiyo",
      status: "Started"
    };

    fetch("http://localhost:5000/case/addWorkerChats", {
      method: "POST",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(messageData)
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      setAssign(false);
      toast.success("Notified successfully kindly wait for his reply in your inbox or check thread chat");
    })
    .catch((error: Error) => {
      console.log(error);
      toast.error("Failed to Notify, Please try again");
      setAssign(false);
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      try {
        const user: User = JSON.parse(token);
        setMyId(user.userId);
        setPostername(user.userName);
        setPosterEMail(user.userEmail);
        setBossPhone(user.phoneNumber);
        setLoginData(user);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const asssignNow = (): void => {
    setAssign(false);
  };

  const cancelAssign = (): void => {
    setAssign(false);
  };

  const sendPayments = (username: string, userId: string, userEmail: string): void => {
    const paymentData: PaymentData = {
      budget: mybudget,
      phoneNumber: bossPhone
    };

    fetch("http://localhost:5000/payment/stk/push", {
      method: "POST",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(paymentData)
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    })
    .catch((error: Error) => {
      console.log(error);
      toast.error("Payment Failed kindly try again later");
      setAssign(false);
    });
  };

  return (
    <div className='border shadow-lg hover:border-green-800 lg:w-[700px] rounded-xl flex-row bg-green-100 card'>
      <div className='flex items-center gap-3'>
        <div>
          <img src={logoURL} alt={applicants.workerName} className='rounded-full w-12' />
        </div>
        <div>
          <div className='flex items-center'>
            <span className='pl-1 text-blue-800'>{applicants.workerName}</span>
          </div>
          <h1 className='font-bold text-md lg:text-lg'>{applicants.workerEmail}</h1>
        </div>
      </div>
      <div>
        <p className='text-sm py-4'>{applicants.workerEmail}</p>
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex justify-center items-center'>
          <span className='pl-2'>{applicants.workerEmail}</span>
        </div>
      </div>
      <div className='flex flex-row justify-evenly w-100%'>
        <div>
          <button className='lg:block bg-green-500 text-white text-sm py-1 px-4 rounded-md'>
            View Profile
          </button>
        </div>
        <div>
          <button onClick={confirmAssign} className='lg:block bg-green-500 text-white text-sm py-1 px-4 rounded-md'>
            Assign task
          </button>
        </div>
      </div>
      <div>
        {assign && (
          <div className='flex bg-white flex-col p-2 rounded-xl -rotate-20 sticky'>
            <div className='flex'>
              <div className='flex flex-row'>
                <p>
                  Confirm Payment before assigning{' '}
                  <span className='font-bold text-red-800'>
                    {`@${applicants.workerName}`}
                  </span>
                  , once assigned No reassigning
                </p>
              </div>
              <img src={logoURL} alt='Logo' className='w-12 rounded-full'/>
            </div>
            <div className='flex flex-row justify-evenly w-100%'>
              <div>
                <button onClick={cancelAssign} className='lg:block bg-primary text-white text-sm py-1 px-4 rounded-md'>
                  Cancel
                </button>
              </div>
              <div>
                <button 
                  onClick={() => sendPayments(applicants.workerName, applicants.workerId, applicants.workerEmail)}
                  className='lg:block bg-primary text-white text-sm py-1 px-4 rounded-md'
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};