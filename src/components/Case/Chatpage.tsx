import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { Undo } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RootState } from '../ReduxPages/reducers/store';


// Define types for your data structures
interface User {
  userId: string;
  userName: string;
  userEmail?: string;
}

interface NotificationData {
  workerEmail: string;
  workerName: string;
  message: string;
  caseId: string;
  posterId: string;
  workerId: string;
}

interface MessageData {
  message: string;
  caseId: string;
  posterId: string;
  role: string;
  // Add other properties that might exist in messageData
  [key: string]: string;
}

interface DisplayMessagesProps {
  messageData: MessageData;
  myId: string;
}



export const Chats: React.FC = () => {
  const [chats, setChats] = useState<unknown>();
  const [workerEmail, setWorkerEmail] = useState<string>('');
  const [workerName, setWorkerName] = useState<string>('');
  const [notification, setNotification] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [caseId, setCaseId] = useState<string>('');
  const [posterId, setPosterId] = useState<string>('');
  const [workerId, setWorkerId] = useState<string>('');
  const [messageData, setMessageData] = useState<MessageData[]>([]);
  const [loginData, setLoginData] = useState<User | null>(null);
  const [myId, setMyId] = useState<string>('');
  const [myName, setMyname] = useState<string>('');

 const caseTitle = useSelector((state: RootState) => state.caser.caseData.caseTitle);
// const caseId = useSelector((state: RootState) => state.caser.caseData.caseId);
//  const mybudget = useSelector((state: RootState) => state.caseData.budget);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      const user: User = JSON.parse(token);
      setLoginData(user);
      setMyId(user.userId);
      setMyname(user.userName);
    }
  }, []);

  useEffect(() => {
    fetch("https://solvus-api-4.onrender.com/case/getNotification")
      .then(res => res.json())
      .then((data: NotificationData) => {
        setWorkerEmail(data.workerEmail);
        setWorkerName(data.workerName);
        setNotification(data.message);
        setCaseId(data.caseId);
        setWorkerId(data.workerId);
        console.log(data.workerName);
      })
      .catch(error => console.error('Error fetching notification:', error));
  }, []);

  useEffect(() => {
    fetch("https://solvus-api-4.onrender.com/case/getWorkerChats")
      .then(res => res.json())
      .then((myData: MessageData[]) => {
        setMessageData(myData);
        console.log(myData);
      })
      .catch(error => console.error('Error fetching chats:', error));
  }, []);

  const handleChange = () => {
    const data = {
      message: message,
      caseId: caseId,  
      posterId: myId,
      role: "owner"
    };

    const listData = {
      status: "live",
      role: "agent",
      budget: "8000",
      jobTitle: "Django",
      jobId: "id"
    };

    fetch("https://solvus-api-4.onrender.com/case/addWorkerChats", {
      method: "POST",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then((res) => {
      return fetch("https://solvus-api-4.onrender.com/jobs/addChatlist", {
        method: "POST",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(listData)
      });
    })
    .then((result) => {
      console.log(result);
      setMessage("");
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className='flex flex-col lg:w-[700px] relative h-screen  w-full'>
      <div className='flex flex-row'>
        <div className='flex flex-col ml-2 w-100%'>
          <div className='flex flex-col'>
            <div className="flex flex-row">
             
            </div>
            <div className='flex flex-row'>
              <Link   to="/" className='mr-7 flex md:flex lg:flex cursor-pointer  hover:text-red-900'>    <div className='family-rubik text-sm  '> <Undo color='green'/> 
              </div></Link> 
          
              <div className='family-rubik text-sm ml-2' >Admin:Newton</div>
              

              <div className='family-rubik ml-2 text-sm'>Agent: {workerName}</div>
            </div>
            <div className='family-rubik text-green-600 text-sm'>{'Online'}</div>
          </div>
        </div>
      </div>

      <div className='flex flex-col overflow-scroll w-full mb-[150px]'>
        <div className='bg-green-100 rounded-xl p-2 w-full text-sm'>{notification}</div>
        
        {messageData.map((messageItem, key) => (
          <div className='w-full' key={key}>
            <DisplayMessages messageData={messageItem} myId={myId} />
          </div>
        ))}
      </div>

      <div className='flex flex-row fixed bottom-10 rounded-xl'>
        <form className='flex flex-row border-blue-800 rounded-xl'>
          <input 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            className="lg:w-[500px] px-2 w-[300px] text-gray-800 border-2 border-blue-600 hover:border-blue-300 p-1 rounded-xl" 
            type='text' 
            placeholder='Reply' 
          />
          <div onClick={handleChange} className='text-blue-800 cursor-pointer text-xl'>
            <FaArrowAltCircleRight/>
          </div>
        </form>           
      </div>                   
    </div>
  );
};

const DisplayMessages: React.FC<DisplayMessagesProps> = ({ messageData, myId }) => {
  console.log("here " + myId);
  
  if (messageData.posterId === myId) {
    return (
      <div className='flex float-right justify-end text-base w-full mt-5'> 
        <div className='flex family-rubik bg-green-100 p-1 rounded-xl'>{messageData.message}</div>
        
      </div>
    );
  } else {
    return (
      <div className='flex text-base mt-5'>
        
        <div className='flex family-rubik bg-white p-1 rounded-xl'>{messageData.message}</div>
      </div>
    );
  }
};