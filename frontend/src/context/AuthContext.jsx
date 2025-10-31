import { createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    async function userRegister (username, email, password) {
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                credentials: "include",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, email, password})
            })

            const data = await response.json();

            return data
        } catch (error) {
            console.log('Frontend User Register Function Error: ', error.message);
        } 
    }

    async function userLogin (username, password) {
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers:  {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
            })

            const data = await response.json();

            return data
        } catch(error) {
            console.log('Frontend User Login Function Error: ', error.message)
        }
    }

    return (
        <AuthContext.Provider value={{userRegister, userLogin}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;