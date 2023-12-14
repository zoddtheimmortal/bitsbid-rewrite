import client from "./client";

const supabase=client();
const getUserInfo=async()=>{
    const { data, error } = await supabase.auth.getSession();
    const user=data.session.user.user_metadata;
    console.log(user);
    return user;
}

export default getUserInfo;