import  { useState } from 'react'
import InputBox from './InputBox'
import { SignupInput } from '@prathamchauhan/write.it';
import Button from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import BASE_URL from '../config';



const SignupInputs = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });
    async function handleSignup(){
        try {
            setIsLoading(true);
            const res = await axios.post(`${BASE_URL}/user/signup`, {
            name: postInputs.name,
            email: postInputs.email,
            password: postInputs.password
        })
        if(res.status===201){
            
            navigate("/signin") 
        }
       
        } catch (error) {
            alert("Error while signing up")
            // console.log(error)
        }finally {
            // Set loading to false after the request is completed (success or failure)
            setIsLoading(false);
        }
    }

  return (
    <div>
        <div>
            <InputBox label="Username" placeholder="John Doe" onChange={(e:any)=> {
                        setPostInputs(c => ({
                            ...c,
                            name: e.target.value
                        }))
            }}/>
                   
        </div>
        <div className='relative'>
            <InputBox label="Email" placeholder="johndoe@gmail.com" onChange={(e:any)=> {
                setPostInputs(c => ({
                    ...c,
                    email: e.target.value
                }))
            }}/>
            {/* <EmailOtp onChange={(e:any)=> {
                        setPostInputs(c => ({
                            ...c,
                            email: e.target.value
                        }))
            }} onClick={sendOtp}/> */}
        </div>
        <div>
            <InputBox label="password" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;" type="password" onChange={(e:any)=> {
                setPostInputs(c => ({
                    ...c,
                    password: e.target.value
                }))
            }}/>
        </div>
        <div>
            <Button label={isLoading?<Spinner/>:"Sign up"} onClick={handleSignup}/>
        </div>
    </div>

        
    
  )
}

export default SignupInputs
