

const archiveReducer=(archive="hello",action)=>{
    switch(action.type){
        case 'skills':
            archive=action.payload
            console.log(archive)
            return archive;
     case 'uprofile':
                archive=action.payload
                console.log(archive)
                return archive;

    case 'profile':
              archive=action.payload
               console.log(archive)      
                 return archive  
    case 'projects':
                    archive=action.payload
                     console.log(archive)      
                       return archive  
    case 'balance':
                        archive=action.payload
                         console.log(archive)      
                           return archive                     
        default:
        return archive    
    }

     
    
}
export default archiveReducer;