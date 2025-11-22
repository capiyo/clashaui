const caseDataReducer=(myData={},action)=>{
    switch(action.type){
        case 'caseData':
         myData=action.payload
            console.log(action.payload['caseTitle'])

            console.log(action.payload['budget'])
            return myData
        default:
           return myData;       
    }
}
export default  caseDataReducer;

