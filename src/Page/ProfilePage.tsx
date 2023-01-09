/** @format */

import { useEffect } from "react";
import UserListComponent from "../Components/UserListComponent";
import Signout from "../Member/Signout";

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "MovieVC";
  }, []);

  return (
    <div className="profile">
      <UserListComponent />
      <Signout />
    </div>
  );
};

export default ProfilePage;
