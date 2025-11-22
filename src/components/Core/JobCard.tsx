import { MapPin, Clock, DollarSign, Building2,ThumbsUp,Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDispatch } from 'react-redux';
//import { setCaseData } from "../ReduxPages/slices/caseSlice";
import { setCaseData } from "../ReduxPages/slices/caseSlice";
import { UseDispatch,useSelector } from "react-redux";
import { RootState } from "../ReduxPages/reducers/store";
import { useToast } from "@/hooks/use-toast";




interface JobCardProps {
awayTeam: string;
  : string;
  location: string;
  



    
  }












const JobCard = () => {
       const[myId,setMyId]=useState("")
     const[myName,setMyname]=useState("")
     const[workerEmail,setWorkerEmail]=useState("")

    const overlay = useSelector((state: RootState) => state.laydata.overlay);
     const { toast } = useToast();

 const [jobs, setJobs] = useState<JobCardProps[]>([]);
 
  


useEffect(() => {
           const token = localStorage.getItem("user");
        const user = JSON.parse(token);
        //setLoginData(user)  
        //console.log(user.userId)
        if(user){
             setMyId(user._id)
        setMyname(user.userName)
       setWorkerEmail(user.userEmail)
        }

        

      
       // console.log(LoginContext["userId"])
       // console.log(typeof(LoginContext))
        //setBossId(loginData.userId)
       // console.log(bossId+"The capiyo")
    }, [])










 
 









  useEffect(() => {
        const getUsers = async () => {
          try {
            const data = await fetchUsers();
            setJobs(data);
            //console.log(jobs)
          } catch (err) {
            console.log(err)
           // setError("Error fetching users.");
          } finally {
            console.log("Capiyo")
            //setLoading(false);
          }
        };

        getUsers();
      }, []);



      async function fetchUsers(): Promise<JobCardProps[]> {
      try {
        const response = await fetch('https://solvus-api-4.onrender.com/jobs/all-jobs'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: JobCardProps[] = await response.json();
        console.log(data)
        return data;
      } catch (error) {
        console.error("Failed to fetch users:", error);
        throw error; // Re-throw to allow component to handle
      }
    }



















  return (
      <div className='flex  w-screen '  >
            
                      
                           
            <div className='grid sm:grid-cols-2 md:grid-cols-3' >
              {jobs.map((job, key) => <Carda    key={key} jobs={job} />)}
              

          
            
            </div>
        </div>
    
     

  );
};

function Carda({jobs}){
   const[myId,setMyId]=useState("")
 const[myName,setMyname]=useState('')
 const[workerEmail,setWorkerEmail]=useState("")
 const dispatch=useDispatch()
 const {toast}=useToast()
  const showRequest=(jobId)=>{
    const output={
    "jobId":jobId,
    "workerName":myName,
    "workerId":myId,
    "workerEmail":workerEmail,
    }
    
    
                fetch("https://solvus-api-4.onrender.com/jobs/add-applicants", {
            method: "POST",
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify(output)
            
        })
        .then((res) => res.json())
        .then((result) => {
           toast({
      title: "Agent Request",
      description: `Your job request is submitted successfully`,
    });
            console.log(result);
            

            //setRequest(true)
          //  window.location.href = '/all-jobs';
        })
        .catch((error) => {
            console.log(error);
            toast({
      title: "Agent Request",
      description: `Error occurred`,
    });
        });

    console.log(jobId)
    console.log(myId)
    console.log(myName)
}

 useEffect(() => {
            const token:string = localStorage.getItem("user");
         const user = JSON.parse(token);
         //setLoginData(user)  
         //console.log(user.userId)
         if(user){
              setMyId(user._id)
         setMyname(user.userName)
        setWorkerEmail(user.userEmail)
         }
 
         
 
       
        // console.log(LoginContext["userId"])
        // console.log(typeof(LoginContext))
         //setBossId(loginData.userId)
        // console.log(bossId+"The capiyo")
     }, [])
 
 
     interface CaseData {
  caseTitle: string;
  caseId: string;
  budget:string;
}

 
 
 








const getGigData = (gigTitle: string, gigId: string, budget: string): void => {
 
  
  const data: CaseData = {
    caseTitle: gigTitle,
    caseId: gigId,
    budget: budget
  };

  dispatch(setCaseData(data));
//  console.log(data);
};







  return(
        <Card className="m-1   sm:m-3 justify-evenly group hover:shadow-medium transition-all duration-300 animate-slide-up lg:w-[500px]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-sm text-primary group-hover:text-primary transition-colors">
              {jobs.jobTitle}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{jobs.budget}</span>
            </div>
          </div>
          <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            {jobs.location}
          </span>
        </div>
      </CardHeader>
       
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {jobs.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{jobs.posterName}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>{jobs.postedTime}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{jobs.deadline}</span>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2 justify-evenly">
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            {jobs.posterName}
          </span>
         

              <span onClick={()=>showRequest(jobs.jobID)} className="bg-accent  cursor-pointer text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            request
          </span>

          {myId===jobs.posterId?
            <Link to={`/current-job/${jobs._id}`}>
                                                       <div  className={`lg:block  text-blue-900 `}>
                                                           <div  onClick={()=>getGigData(jobs.jobTitle,jobs.jobID,jobs.budget)} 
                                                             className='flex flex-row  text-purple-400   px-2  bg-accent  cursor-pointer  font-medium  lg:text-base  py-1 rounded-full'>
                                                               view   
               </div>
                                                           </div>
                                                           
                                                   </Link>:    <span className="bg-accent   cursor-pointer text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            <ThumbsUp/>
            
          </span>}
        </div>
      </CardContent>
    </Card>

  )
}




export default JobCard;