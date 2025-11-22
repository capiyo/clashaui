 const counterReducer=(counter="",action)=>{
    switch(action.type){
        case 'dashboard':
            console.log("Darling")
            counter='dashboard'               
                return counter;

       case 'account':
                    counter='account'               
                        return counter      
                        
     case 'archive':
                    counter='archive'               
                    return counter                         
    case 'post_gig':
                    counter='post_gig'               
                         return counter                          
        
       case 'gigs':
        counter='gigs'               
            return counter              


            
        //console.log("Idahh myLove")   
            //return counter+1
           
      default:
           return counter;       
    }
}
export default counterReducer



 