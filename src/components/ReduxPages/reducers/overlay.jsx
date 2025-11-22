const  overlay=(overlay="",action)=>{
    switch(action.type){
        case 'overlay':
            console.log("Darling")
            console.log(action.payload)
            overlay=action.payload
            return  overlay;



        //return counter+1

        default:
            return overlay;
    }
}
export default overlay

