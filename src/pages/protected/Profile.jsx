import {useEffect, useState} from "react";
import authService from "../../services/authService.js";
import Spinner from "../../components/Spinner.jsx";
import userService from "../../services/userService.js";
import {toast, ToastContainer} from "react-toastify";

const Profile = () => {
    const [user, setUser] = useState({});
    const [newUser, setNewUser] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInformationSubmission = async (e) => {
        e.preventDefault()
        try{
            const data = await userService.updateUser(newUser)
            setUser(prev => ({...prev, ...data}))
            setNewUser({})
            toast.success('Profile updated successfully')
        }catch (e){
            toast.error(e.message || 'An error occurred. Please try again.');
        }
    }

    useEffect(() => {
        const userProfile = async () => {
            setLoading(true);
            try {
                const { profile } = await authService.getUserProfile();
                setUser(profile);
            } catch (e) {
                console.error(e.message);
            } finally {
                setLoading(false);
            }
        };
        userProfile();
    }, []);

    if(loading) return <Spinner />

    return (
       <>
           <ToastContainer />

           <div className="w-[98%] mx-auto grid grid-cols-1 md:grid-cols-[2fr_5fr] divide-y-2 md:divide-x-2 border bg-white items-start border-gray-400 rounded-md">
               <section className="py-3 px-4 grid gap-4 w-full">
                   <h2 className="text-lg font-bold mb-2">Account Management</h2>
                   <img src="https://i.pravatar.cc/100?img=1" alt="profile" className="w-full h-64 rounded-md" />
                   <div className="border rounded-lg p-4 w-full bg-blue-50">
                       <button className="border py-1 w-full rounded-lg bg-white">Upload Photo</button>
                   </div>
                   <form className="grid gap-3 mt-4" action="" method="post">
                       <div className="grid gap-2">
                           <label htmlFor="oldPassword">Old Password</label>
                           <input type="password" id="oldPassword" className="border rounded-lg p-2 w-full" />
                       </div>
                       <div className="grid gap-2">
                           <label htmlFor="newPassword">New Password</label>
                           <input type="password" id="newPassword" className="border rounded-lg p-2 w-full" />
                       </div>
                       <div className="grid gap-2">
                           <label htmlFor="confirmNewPassword">Confirm New Password</label>
                           <input type="password" id="confirmNewPassword" className="border rounded-lg p-2 w-full" />
                       </div>
                       <button type="submit" className="border py-2 w-full rounded-lg bg-white">Change Password</button>
                   </form>
               </section>
               <section className="py-3 px-4 grid gap-4 w-full">
                   <h2 className="text-lg font-bold mb-2">Profile Information</h2>
                   <form className="grid gap-3" onSubmit={handleInformationSubmission} method="post">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                           <div className="grid gap-2">
                               <label htmlFor="firstName">First Name</label>
                               <input
                                   type="text"
                                   value={newUser.firstName ?? user.firstName ?? ''}
                                   onChange={(e) => setNewUser(prev => ({...prev, firstName: e.target.value}))}
                                   name="firstName"
                                   id="firstName"
                                   className="border rounded-lg p-2 w-full" />
                           </div>
                           <div className="grid gap-2">
                               <label htmlFor="lastName">Last Name</label>
                               <input
                                   type="text"
                                   value={newUser.lastName ?? user.lastName ?? ''}
                                   onChange={(e) => setNewUser(prev => ({...prev, lastName: e.target.value}))}
                                   name="lastName"
                                   id="lastName"
                                   className="border rounded-lg p-2 w-full" />
                           </div>
                           <div className="grid gap-2">
                               <label htmlFor="email">Email</label>
                               <input
                                   type="email"
                                   value={newUser.email ?? user.email ?? ''}
                                   onChange={(e) => setNewUser(prev => ({...prev, email: e.target.value}))}
                                   name="email"
                                   id="email"
                                   className="border rounded-lg p-2 w-full" />
                           </div>
                           <div className="grid gap-2">
                               <label htmlFor="telephone">Telephone</label>
                               <input
                                   type="tel"
                                   value={newUser.telephone ?? user.telephone ?? ''}
                                   onChange={(e) => setNewUser(prev => ({...prev, telephone: e.target.value}))}
                                   name="telephone"
                                   id="telephone"
                                   className="border rounded-lg p-2 w-full" />
                           </div>
                       </div>
                       <button type="submit" disabled={!Object.keys(newUser).length} className="border py-2 w-full rounded-lg bg-white">Update Information</button>
                   </form>
               </section>
           </div></>
    )
}

export default Profile;
