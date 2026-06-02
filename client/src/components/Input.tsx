import type React from "react";

type InputProps={type:string; placeholder:string; value:string; onChange:(e:React.ChangeEvent<HTMLInputElement>)=> void;};
function Input ({type, placeholder, value,onChange}:InputProps){
    return(
        <input
        type={type} placeholder={placeholder} value={value} onChange={onChange} className ="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" 
        />
    );
}
export default Input;
