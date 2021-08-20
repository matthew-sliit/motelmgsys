export default function getAngle(value,max){
    if(max===0 || parseInt(max)===0){
        if(value===0){
            return 0;
        }else{
            return 3;
        }
    }else{
        let v = (value/max)*180;
        if(v<2){
            return 3;
        }
        return v;
    }
}