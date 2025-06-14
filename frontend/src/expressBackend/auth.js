import axios from 'axios';
import envConf from '../conf/envConf';

export class AuthService{
    constructor() {}


    async registerAccount({username, email, password, avatar}) {

            const formData =new FormData()
            formData.append('avatar', avatar)
            formData.append('username', username)
            formData.append('email', email)
            formData.append('password', password)

        try{
            const userAccount = await axios.post(
                `/api/v1/users/register`,
                formData,
            )
            // const userAccount = await axios.post(
            //     `/api/v1/users/register`,
            //     {username, email, password,avatar,}
            // )
            return userAccount
        }catch(error){
            console.log("error at auth.js, registeraccount")
            throw error
            
        }
    }
    async login({username,email, password}){

        const reqBody=username? {username,password}: {email,password}
        
        try {
            const loggedUser = await axios.post(
                `/api/v1/users/login`, 
                reqBody
                )
            console.log("auth.js:: login:: user logged in successfully")
            return loggedUser
        } catch (error) {
            // console.log("auth error",error)
            return false
        }
    }
    async logout(){
        try {
            await axios.post(`/api/v1/users/logout`)
            .then(()=>{
                console.log("Auth.js:: logout()::logged Out succesffully")
            })
        } catch (error) {
            console.log("auth.js:: logout():: ",error)
        }
    }
    async getCurrentUser(){
        try {
            
            const userData=  await axios.get(`/api/v1/users/current-user`,
                {withCredentials:true}
            )
            // console.log("auth.js:: getcurruser:: ", userData)
            return userData
            
        } catch (error) {
         console.log("get current User error:: ",error)   
        }

    }
    async getNewAccessToken(){
       try {
         await axios.post('/api/v1/users/refresh-accToken')
         .then((res)=>{
             console.log("token refreshed")
         })
       } catch (error) {
        console.log("auth.js:: getnewAccessTOKEN:: ",error)
       }
    }

    
}


const authService = new AuthService();

export default authService