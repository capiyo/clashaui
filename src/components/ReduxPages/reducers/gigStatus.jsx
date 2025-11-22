const  gigStatus=(status="",action)=>{
    switch(action.type){
        case 'gigStatus':
            console.log("Darling")
            console.log(action.payload)
            status=action.payload
            return  status;



        //return counter+1

        default:
            return status;
    }
}
export default gigStatus

