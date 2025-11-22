const userReducer=(userId="userId",action)=>{
    switch(action.type){
        case 'userDetails':
            userId=action.payload
            console.log(userId)
            return userId
        default:
           return userId;       
    }
}
export default  userReducer;

