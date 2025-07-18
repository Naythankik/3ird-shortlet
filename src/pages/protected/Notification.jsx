import {HiCog, HiDotsVertical} from "react-icons/hi";
import {useEffect, useState} from "react";
import notificationService from "../../services/notificationService.js";
import {toast} from "react-toastify";
import Spinner from "../../components/Spinner.jsx";
import NoDataComponent from "../../components/helpers/NoDataComponent.jsx";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const getNotifications = async () => {
        setLoading(true)
        try{
            const { notifications } = await notificationService.getNotifications()
            setNotifications(notifications)
        }catch (e) {
            toast.error(e.message);
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        document.title = '3ird Shortlet | Notification';
        getNotifications()

    }, [])

    const handleMarkAllAsRead = async (e) => {
        e.preventDefault()
        try{
            const { matchedCount } = await notificationService.markAllAsRead()

            if(matchedCount > 0) {
                toast.success('All notifications marked as read.')
                setNotifications(prev =>
                    prev.map(n => ({ ...n, readStatus: true }))
                );
            } else {
                toast.error('An error occurred. Please try again.')
            }
        }catch (e) {
            toast.error(e.message);
        }
    }

    if(loading) return <Spinner />

    return <>
        { notifications.length > 0 ?
            <div className="rounded-3xl border border-blue-100 shadow-blue-100 shadow-lg flex gap-2 pb-4 flex-col">
            <div className="flex items-center justify-between text-gray-600 p-4">
                <p className="font-bold text-xl">Notifications</p>
                <HiCog />
            </div>
            <div aria-live="polite" className="flex flex-col overflow-y-auto">
                {notifications.map((notification, i) =>
                    <article key={notification._id}
                             className={`flex items-start justify-between gap-5 
                         ${i !== (notifications.length - 1) ? 'border-b' : ''} 
                         ${i === 0 ? 'border-t' : ''}
                          border-gray-300 px-4 py-5 
                          ${!notification.readStatus ? 'bg-blue-100' : 'bg-transparent'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img src={notification.image} alt={`Avatar of notification ${notification._id}`} className="rounded-full w-10 h-10" />
                                {!notification.readStatus && <span className="absolute top-0 right-1 w-2 h-2 bg-green-500 rounded-full"></span>}
                            </div>
                            <div>
                                <p>{notification.message}</p>
                                <span className="text-gray-500 text-sm">{notification.time}</span>
                            </div>
                        </div>
                        <button
                            aria-label="Notification options"
                            title="Notification options"
                            className="flex items-center justify-center text-gray-500 text-lg"
                        >
                            <HiDotsVertical />
                        </button>

                    </article>
                )}
            </div>
            <button onClick={handleMarkAllAsRead}
                    className="flex items-center w-full text-black px-3 rounded-lg">
                Mark all as read
            </button>
        </div>
            :
            <NoDataComponent
                title="No Notifications"
                description="You're all caught up!"
            />
        }
    </>
}

export default Notification;
