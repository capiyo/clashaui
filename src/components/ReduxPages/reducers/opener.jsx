const openerReducer=(opener="Love",action)=>{
    switch(action.type){
        case 'OPENER':
            console.log("Idah my Love")
            return opener
        default:
           return opener;       
    }
}
export default  openerReducer;

