import { MapPin, Clock, DollarSign, Building2,ThumbsUp,Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDispatch } from 'react-redux';
import { setCaseData } from "../ReduxPages/slices/caseSlice";
import { UseDispatch,useSelector } from "react-redux";
import { RootState } from "../ReduxPages/reducers/store";
import { useToast } from "@/hooks/use-toast";




interface GamesCardProps {
  awayTeam:string,
  homeTeam:string,
  date:string,
  time:string,
  day:string,



    
  }












const Posts= () => {
       const[myId,setMyId]=useState("")
     const[myName,setMyname]=useState("")
     const[workerEmail,setWorkerEmail]=useState("")

    const overlay = useSelector((state: RootState) => state.laydata.overlay);
     const { toast } = useToast();

 const [games, setGames] = useState<GamesCardProps[]>([]);
 
  


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
            setGames(data);
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



      async function fetchUsers(): Promise<GamesCardProps[]> {
      try {
        const response = await fetch('http://localhost:8000/clash/getAllGames'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: GamesCardProps[] = await response.json();
        console.log(data)
        return data;
      } catch (error) {
        console.error("Failed to fetch users:", error);
        throw error; // Re-throw to allow component to handle
      }
    }



















  return (
      <div className='flex  w-screen'  >
        <div className="text-center absolute top-20 bg-green-300 text-accent-foreground px-2 py-1 rounded-full text-xs font-medium right-0">view posts</div>            
                      
                           
            <div className='grid sm:grid-cols-2 md:grid-cols-2' >
              {games.map((game, key) => <Carda    key={key} games={game} />)}
              

          
            
            </div>
        </div>
    
     

  );
};

function Carda({games}){
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
    
    
                fetch("http://localhost:8000/clash/getgames", {
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
        <Card className="m-1   sm:w-[400px] sm:m-3  group hover:shadow-medium transition-all duration-300 animate-slide-up lg:w-[400px]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">         
            <div className="flex flex-row justify-evenly w-[300px]">          
            <span className="text-sm text-primary group-hover:text-primary transition-colors">
              {games.awayTeam}
              <span className="ml-10 text-black ">vs</span>
            </span>
             <span className="text-sm text-primary group-hover:text-primary transition-colors">
              {games.homeTeam}
            </span>
            </div>


            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{games.date}</span>
            </div>
          </div>
          <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            {games.day}
          </span>
        </div>
      </CardHeader>
       
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-2">
        {games.time}
        </p>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            follow
            
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            like
          
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            bet
          
          </div>
        </div>
        
        <div className="flex gap-2 pt-2 justify-evenly">
            <span className="bg-primary text-gray px-2 py-1 rounded-full text-xs font-medium">
              follow
            
          </span>
          <span className="bg-primary text-gray px-2 py-1 rounded-full text-xs font-medium">
      comments
            
          </span>

          <span className="bg-primary text-gray px-2 py-1 rounded-full text-xs font-medium">
            bet
            
          </span>
         

              
            
         
        </div>
      </CardContent>
    </Card>

  )
}




export default Posts;