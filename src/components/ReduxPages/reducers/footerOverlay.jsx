const  footerOverlay=(footerLay="",action)=>{
    switch(action.type){
        case 'footerOverlay':
            //console.log("Darling")
            console.log(action.payload)
            footerLay=action.payload
            return  footerLay;



        //return counter+1

        default:
            return footerLay;
    }
}
export default footerOverlay

