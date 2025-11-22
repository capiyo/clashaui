const  auth=(status=false,action)=>{
    switch(action.type){
        case 'auth':
            console.log("Darling")
            console.log(action.payload)
            status=action.payload
            return  status;



        //return counter+1

        default:
            return status;
    }
}
export default auth

