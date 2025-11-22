const rightReducer=(rightPage="",action)=>{
    switch(action.type){
        case 'rightPage':
            rightPage=action.payload
            console.log(rightPage)
            return rightPage
        default:
           return  rightPage;       
    }
}
export default  rightReducer;

