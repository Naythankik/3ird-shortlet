import {HiCog, HiDotsVertical} from "react-icons/hi";

const Notification = () => {
    const notifications = [
        {
            id: 1,
            message: "Emily Carter commented: 'Great work on the redesign!'",
            image: "https://picsum.photos/id/1011/200/300",
            time: "2 min ago",
            readStatus: false
        },
        {
            id: 2,
            message: "Michael sent you a message: 'Let’s meet at 3 PM today.'",
            image: "https://picsum.photos/id/1012/200/300",
            time: "5 min ago",
            readStatus: true
        },
        {
            id: 3,
            message: "Your analytics report for the week is now available.",
            image: "https://picsum.photos/id/1015/200/300",
            time: "10 min ago",
            readStatus: false
        },
        {
            id: 4,
            message: "The task 'Update user interface design' is 2 days overdue.",
            image: "https://picsum.photos/id/1016/200/300",
            time: "15 min ago",
            readStatus: true
        },
        {
            id: 5,
            message: "Scheduled maintenance will occur on Saturday at 11 PM.",
            image: "https://picsum.photos/id/1025/200/300",
            time: "20 min ago",
            readStatus: false
        },
        {
            id: 6,
            message: "You have been invited to join the 'Phoenix Revamp' project.",
            image: "https://picsum.photos/id/1027/200/300",
            time: "25 min ago",
            readStatus: true
        },
        {
            id: 7,
            message: "James Lee submitted feedback on your latest upload.",
            image: "https://picsum.photos/id/1033/200/300",
            time: "30 min ago",
            readStatus: false
        },
        {
            id: 8,
            message: "Maria Thompson has joined the Marketing team.",
            image: "https://picsum.photos/id/1035/200/300",
            time: "35 min ago",
            readStatus: true
        },
        {
            id: 9,
            message: "Daily team stand-up starts in 15 minutes.",
            image: "https://picsum.photos/id/1038/200/300",
            time: "40 min ago",
            readStatus: false
        },
        {
            id: 10,
            message: "Sarah Johnson started following you.",
            image: "https://picsum.photos/id/1040/200/300",
            time: "45 min ago",
            readStatus: false
        },
        {
            id: 11,
            message: "New features and bug fixes are available in the latest release.",
            image: "https://picsum.photos/id/1042/200/300",
            time: "50 min ago",
            readStatus: true
        },
        {
            id: 12,
            message: "Mark: 'Let’s sync up tomorrow morning?'",
            image: "https://picsum.photos/id/1044/200/300",
            time: "1 hour ago",
            readStatus: false
        },
        {
            id: 13,
            message: "You’ve used 95% of your available storage space.",
            image: "https://picsum.photos/id/1047/200/300",
            time: "1 hour ago",
            readStatus: true
        },
        {
            id: 14,
            message: "Project 'Aurora' is due in 2 days.",
            image: "https://picsum.photos/id/1049/200/300",
            time: "1 hour 10 min ago",
            readStatus: false
        },
        {
            id: 15,
            message: "Your account settings were successfully updated.",
            image: "https://picsum.photos/id/1051/200/300",
            time: "1 hour 30 min ago",
            readStatus: true
        },
        {
            id: 16,
            message: "New login detected from an unknown device.",
            image: "https://picsum.photos/id/1053/200/300",
            time: "2 hours ago",
            readStatus: false
        },
        {
            id: 17,
            message: "‘Sprint Planning’ event moved to Friday.",
            image: "https://picsum.photos/id/1055/200/300",
            time: "2 hours 15 min ago",
            readStatus: true
        },
        {
            id: 18,
            message: "Ben shared a file: 'User_Research_Notes.pdf'.",
            image: "https://picsum.photos/id/1057/200/300",
            time: "2 hours 30 min ago",
            readStatus: false
        },
        {
            id: 19,
            message: "Chloe: 'Looking forward to working together!'",
            image: "https://picsum.photos/id/1060/200/300",
            time: "3 hours ago",
            readStatus: true
        },
        {
            id: 20,
            message: "Thanks for signing up. Let’s get started!",
            image: "https://picsum.photos/id/1062/200/300",
            time: "4 hours ago",
            readStatus: false
        }
    ];

    return <div className="rounded-3xl border border-blue-100 shadow-blue-100 shadow-lg flex gap-2 pb-4 flex-col">
        <div className="flex items-center justify-between text-gray-600 p-4">
            <p className="font-bold text-xl">Notifications</p>
            <HiCog />
        </div>
        <div className="flex flex-col overflow-y-auto">
            {notifications.map((notification, i) =>
                <article key={notification.id}
                         className={`flex items-start justify-between gap-5 
                         ${i !== (notifications.length - 1) ? 'border-b' : ''} 
                         ${i === 0 ? 'border-t' : ''}
                          border-gray-300 px-4 py-5 
                          ${!notification.readStatus ? 'bg-blue-100' : 'bg-transparent'}`}
                >
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img src={notification.image} alt={`Avatar of notification ${notification.id}`} className="rounded-full w-10 h-10" />
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
        <button onClick={() => console.log('Mark all as read')}
            className="flex items-center w-full text-black px-3 rounded-lg">
            Mark all as read
        </button>
    </div>
}

export default Notification;
