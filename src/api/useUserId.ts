import { useAuth0 } from "@auth0/auth0-react";


export function useUserId(){
    const { user } = useAuth0();
    return user.sub.replace(new RegExp(".*\\|"), "");          
}