import "./Sidebar2.css";

export default function Profile() {
   const status = localStorage.getItem("isLoggedIn");
   const user = JSON.parse(localStorage.getItem("user"));

   const { uid, id } = user;

   return (
      <div className="messages-container">
         <div className="sidebar2-container">
            <h1>Profile</h1>
            {status === "true" && (
               <div className="profile-container">
                  <h3 className="bold">{uid} </h3>
                  <p># {id} </p>
               </div>
            )}
         </div>
      </div>
   );
}
