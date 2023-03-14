
import { useEffect, useState } from "react";
import socketIO from "socket.io-client";
const socket = socketIO("http://localhost:5000");

const NotificationPage = () => {

    console.log('socket', socket);
    const [schedules, setSchedules] = useState<any>([]);

    useEffect(() => {
        socket.emit("newEvent", { hour: "2", minute: "3", title: "4" });
        socket.on("sendSchedules", (schedules) => {
            console.log('schedules', schedules);
            setSchedules(schedules);
        });
        //Listens for the notification from the server
        socket.on("notification", (data) => {
            console.log("data", data);
        });
    }, []);
    return (
        <div>
            <h1>hello</h1>
            <ul>
                {schedules?.map((schedule: any) => (
                    <li key={schedule.title}>
                        {schedule.title} - {schedule.hour} : {schedule.minute}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationPage;