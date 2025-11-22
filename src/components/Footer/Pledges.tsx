import { MapPin, Clock, DollarSign, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,

  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import ball from "@/assets/ball.webp"
import { MessageCircle, TrendingUp, Calendar, Trophy, Users, Zap ,Heart} from "lucide-react";

interface PledgeCard{
  awayTeam: string;
  homeTeam: string;
  awayWin: string;
  homeWin: string;
  progress: string;
  day: string;
  date:string,
  placed:string,
  amount:string,
  



    
  }

  import { cn } from "@/lib/utils";












const Pledges = () => {

 const [pledges, setPledges] = useState<PledgeCard[]>([]);
 const[myId,setMyId]=useState("")
 const[myname,setMyname]=useState('')
 const[workerEmail,setWorkerEmail]=useState("")


 
 


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








  useEffect(() => {
        const getUsers = async () => {
          try {
            const data = await fetchUsers();
            setPledges(data);
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



      async function fetchUsers(): Promise<PledgeCard[]> {
      try {
        const response = await fetch('http://localhost:8000/clash/getPledges'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PledgeCard[] = await response.json();
        console.log(data)
        return data;
      } catch (error) {
        console.error("Failed to fetch pledges:", error);
        throw error; // Re-throw to allow component to handle
      }
    }



















  return (
      <div className=' overflow-y-auto h-[600px]'  >          
                      
                           
            <div className='grid sm:grid-cols-2 md:grid-cols-3  gap-1 overflow-y-auto h-[600px]' >
              {pledges.map((pledge, key) => <Carda    key={key} pledges={pledge} />)}
              

          
            
            </div>
        </div>
    
     

  );
};

function Carda({pledges}){
  const[featured,setFeatured]=useState(false)
  const[isLive,setLive]=useState(false)
  const[amount,setAmount]=useState(false)
  const  submitAmount=(homeTeam,awayTeam,date,day)=>{
   

  const data={
    homeTeam:homeTeam,
    awayTeam:awayTeam,
    amount:amount,
    progress:"upcoming",
    date:date,
    day:day,
    awayWin:'60',
    homeWin:'40',
    placed:false



  }

  fetch("http://localhost:8000/clash/pledging", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then((res) => res.json())
                
                .catch((err) => {
                   // toast.error("An error occured")
                    console.log(err);
                })




}

const addPlacer=(pledgeId)=>{
   const placerData={  
    pledgeId:pledgeId,
  placer:"placer"}

}


















const handleChange = (event) => {
    setAmount(event.target.value); // Update the state with the new value
  };



  return(
         <Card
      className={cn(
        "relative m-3  backdrop-blur-sm border-border/50 bg-gradient-to-br from-card/90 to-card/50 hover:shadow-glow transition-all duration-300 animate-slideUp",
        featured && "ring-2 ring-primary shadow-pink"
      )}
    >
      {/* Tournament Badge */}
      <div className="flex items-center justify-between p-1 border-b border-border/50">
        <div className="flex items-center gap-1">
          <Trophy className="w-4 h-4 text-[#300669]" />
          <span className="text-lg font-medium text-muted-foreground">{pledges.pledger}</span>
        </div>
        {isLive && (
          <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground animate-pulse">
            <Zap className="w-3 h-3 mr-1" />
            LIVE
          </Badge>
        )}
      </div>

      {/* Match Details */}
      <div className="p-2 space-y-4">
        {/* Teams */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <img  className="rounded-full" src={ball}/>
              </div>
              <div>
                {pledges.option==="homeTeam"?
                <p className="font-semibold text-foreground  rounded-l-lg px-1 bg-gradient-to-r from-purple-300 to-blue-500">{pledges.homeTeam}</p>:
                <p className="font-semibold text-foreground">{pledges.homeTeam}</p>}
                <p className="text-xs text-muted-foreground">Home</p>
              </div>
            </div>
          </div>
          
          <div className="px-4">
            <span className="text-xl font-bold bg-gradient-to-r from-[#300669] to-accent bg-clip-text text-transparent">VS</span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 justify-end">
              <div className="text-right">
                 {pledges.option==="awayTeam"?
                <p className="font-semibold text-foreground  rounded-l-lg px-1 bg-gradient-to-r from-purple-300 to-blue-500">{pledges.awayTeam}</p>:
                <p className="font-semibold text-foreground">{pledges.awayTeam}</p>}
                <p className="text-xs text-muted-foreground">Away</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{pledges.day}, {pledges.date}</span>
        </div>

        {/* Betting Options */}
        <div className="grid grid-cols-3 gap-2">
          <Button variant="social" className="flex flex-col h-auto py-1 hover:bg-primary/10 hover:border-primary">
            <span className="text-xs text-muted-foreground mb-1">Home Win</span>
            <span className="text-lg font-bold text-[#300669]">45</span>
          </Button>
          <Button variant="social" className="flex flex-col h-auto py-1 hover:bg-accent/10 hover:border-accent">
            <span className="text-xs text-muted-foreground mb-1">Draw</span>
            <span className="text-lg font-bold text-accent">45</span>
          </Button>
          <Button variant="social" className="flex flex-col h-auto py-1 hover:bg-primary/10 hover:border-primary">
            <span className="text-xs text-muted-foreground mb-1">Away Win</span>
            <span className="text-lg font-bold text-[#300669]">78</span>
          </Button>
        </div>

        {/* Pledge Button */}
         <div className="space-y-2 space-x-2">
           <Sheet>
                <SheetTrigger className="w-full "> <Button   onClick={()=>addPlacer(pledges._id)} variant="gradient" className="w-full" size="sm">
                                <DollarSign className="w-4 h-4 mr-2" />
                              place {pledges.amount}
                              </Button></SheetTrigger>


                <SheetContent  className="sm:w-screen lg:w-[400px] h-[200px]  rounded-lg right-0" side="right">
                   <SheetHeader>
                    <SheetTitle>place {pledges.amount}</SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
                  </SheetHeader>
                  <form  className="ml-4 mr-4"  onSubmit={()=>submitAmount(pledges.homeTeam,pledges.awayTeam,pledges.date,pledges.day)} >
                      <div className="">
                                   
                                    <input 
                                    value={amount}
                                    onChange={handleChange}
                                      type="text" 
                                      className="w-full p-1 border rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                      placeholder="ksh:100"
                                    />
                                  </div>
                                 
                                  <div>
                                  
                                  </div>
                                     
                        <Button  type="submit" variant="gradient" className=" mt-2 w-full" size="sm">
                                  <DollarSign className="w-4 h-4 mr-2" />
                                submit
                                </Button>
                       
                      
                  
                  
                  
                                  </form>
















                   {/* Specify 'right' for the side property */}
                 
                  {/* Add your content here */}
                </SheetContent>
              </Sheet>
        </div>

        {/* Social Interactions */}
        <div className="flex items-center justify-between  border-t border-border/50">
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Heart className="w-4 h-4 mr-1" />
              56
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <MessageCircle className="w-4 h-4 mr-1" />
              78
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
            <TrendingUp className="w-4 h-4 mr-1" />
            Stats
          </Button>
        </div>
      </div>
    </Card>)


  
}




export default Pledges;