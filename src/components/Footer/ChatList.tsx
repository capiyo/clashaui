
        import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../ContextProvider/Context';
import { useDispatch, useSelector } from 'react-redux';
import { FaMessage, FaEye } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { MapPin, Clock, DollarSign, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {  Card,CardContent, CardHeader } from "@/components/ui/card";


// Define TypeScript interfaces
interface User {
  userId: string;
  userName: string;
  userEmail: string;
  phoneNumber?: string;
}

interface ChatList {
  jobTitle: string;
  role: string;
  budget: string;
  jobId: string;
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

export const Chats: React.FC = () => {
  const [chatlist, setChatlist] = useState<ChatList[]>([]);
  const loginData = useContext(LoginContext);
  const [myId, setMyId] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      const user: User = JSON.parse(token);
      if (user) {
        setMyId(user.userId);
        fetch(`https://solvus-api-4.onrender.com/jobs/getChatlist`)
          .then(res => res.json())
          .then((data: ChatList[]) => {
            setChatlist(data);
            console.log(chatlist)
          })
          .catch((error: Error) => console.log(error));
      }
    }
  }, []);

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
  };

  const closeOverlay = (): void => {
    dispatch({ type: "overlay", payload: "close" });
    dispatch({ type: "footerOverlay", payload: "close" });
  };

  const setChatPage = (): void => {
    dispatch({ type: "overlay", payload: "chatpage" });
  };

  return (
    
      <div className='grid sm:grid-cols-1   h-[600px] md:grid-cols-1 overflow-y-auto container mt-1 mx-auto bg-white rounded-xl'>
        {chatlist.map((people, key) => (
          <Carda key={key} chatlist={people} />
        ))}
      
    </div>
  );
};

interface CardProps {
  chatlist: ChatList;
}

const Carda: React.FC<CardProps> = ({ chatlist }) => {
  const [assign, setAssign] = useState<boolean>(false);
  const [workerId, setWorkerId] = useState<string>('');
  const [posterId, setPosterId] = useState<string>("");
  const [workerName, setWorkername] = useState<string>("");
  const [loginData, setLoginData] = useState<User | null>(null);
  const [bossPhone, setBossPhone] = useState<string | undefined>();
  
  const dispatch = useDispatch();
//  const caseId = useSelector((state: RootState) => state.caseData.caseId);
//  const caseTitel = useSelector((state: RootState) => state.caseData.caseTitle);
//  const mybudget = useSelector((state: RootState) => state.caseData.budget);

  const [myId, setMyId] = useState<string>("");
  const [posterName, setPostername] = useState<string>("");
  const [posterEmail, setPosterEMail] = useState<string>("");

  const confirmAssign = (): void => {
    setAssign(true);
  };

/*  const getMessApplicantsData = (userName: string, userId: string, userEmail: string): void => {
    const messageData: MessageData = {
      workerId: userId,
      posterId: myId,
      caseId: caseId,
      caseTitle: caseTitel,
      workerEmail: userEmail,
      workerName: userName,
      posterName: posterName,
      posterEmail: posterEmail,
      message: `Congratulations you are assigned the gig of Angular dev from ${posterName}`,
      status: "Started"
    };

    fetch("https://solvus-api-4.onrender.com/case/addWorkerChats", {
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
*/
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      const user: User = JSON.parse(token);
      setMyId(user.userId);
      setPostername(user.userName);
      setPosterEMail(user.userEmail);
      setBossPhone(user.phoneNumber);
      setLoginData(user);
    }
  }, []);

  const closeOverlay = (): void => {
    dispatch({ type: "overlay", payload: "close" });
    dispatch({ type: "footerOverlay", payload: "close" });
  };

  const setChatPage = (): void => {
    dispatch({ type: "overlay", payload: "chatpage" });
  };

  const asssignNow = (): void => {
    setAssign(false);
  };

  const cancelAssign = (): void => {
    setAssign(false);
  };



  return (
<Card className="group hover:shadow-medium transition-all duration-300    animate-slide-up mt-2">
      <CardHeader className="pb-1">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-sm text-primary group-hover:text-primary transition-colors">
              {chatlist.jobTitle}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{chatlist.budget}</span>
            </div>
          </div>
          <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            {chatlist.role}
          </span>
        </div>
      </CardHeader>
       
      
      <CardContent className="space-y-1">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {chatlist.role}
        </p>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Hello we are looking for  Angular developer to check our ui</span>
          </div>
          
          
        </div>
        
        <div className="flex gap-2 pt-2 w-[300px] justify-between">
             <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            capiyo
          </span>
          <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            live
          </span>
        
             <Link to={`/current-job/${chatlist.jobId}`}>
                                            <div  className={`lg:block  `}>
                                                <div    onClick={closeOverlay} className='flex flex-row   rounded-full  p-2 bg-accent text-purple-400    text-sm '>view
                                                    
    </div>
                                                </div>
                                                
                                        </Link>
                       
          
        </div>
      </CardContent>
    </Card>

  )
}
  