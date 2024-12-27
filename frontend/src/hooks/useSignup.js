import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useSignup = () => {
const[loading,setloading] = useState(false);
const signup = async ({fullname,username,password,confirmpassword,gender}) => {
    const success = handleInputErrors({fullname,username,password,confirmpassword, gender});
    if(!success) return;
    setloading(true);
    try {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullname, username, password, confirmpassword, gender }),
          });
          

        const data = await res.json();
        console.log(data);

    } catch (error) {
        toast.error(error.message);
    }
    finally{
        setloading(false);
    }
};
return {loading,signup};
};

export default useSignup;

function handleInputErrors({fullname,username,password,confirmpassword,gender}){
    if(!fullname || !username || !password || !confirmpassword || !gender){
        toast.error('All fields are required');
        return false;
    }
    if(password !== confirmpassword){
        toast.error('Passwords do not match');
        return false;
    }
    if(password.length < 6){
        toast.error('Password must be at least 6 characters');
        return false;
    }
    return true;
}