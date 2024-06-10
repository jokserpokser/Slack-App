import "./Sidebar2.css";
import Avatar, { genConfig } from 'react-nice-avatar'

export default function Profile() {
   const status = localStorage.getItem("isLoggedIn");
   const user = JSON.parse(localStorage.getItem("user"));
   const config = genConfig();
   const { uid, id } = user;

   return (
      <div className="messages-container">
         <div className="userList-page">
            <h1 style={{marginRight: "7rem", color: "whitesmoke"}}>Profile</h1>
            {status === "true" && (
               <>
                  
                  <div className="profile-container">
                  <Avatar
                     style={{ width: "10rem", height: "10rem" }}
                     {...config}
                  />
                     <h3 className="bold">{uid} </h3>
                     <p># {id} </p>
                  </div>
               </>
            )}
         </div>
      </div>
   );
}
