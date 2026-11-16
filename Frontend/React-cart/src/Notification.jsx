import { useSelector } from "react-redux";

function Notification() {
  const notification = useSelector((state) => state.ui.notification);

  if (!notification) {
    return null;
  }

  return (
    <div
      className={`w-full p-3 text-white text-center ${
        notification.status === "pending"
          ? "bg-blue-500"
          : notification.status === "success"
          ? "bg-green-500"
          : "bg-red-500"
      }`}
    >
      <h2 className="font-bold">{notification.title}</h2>
      <p>{notification.message}</p>
    </div>
  );
}

export default Notification;