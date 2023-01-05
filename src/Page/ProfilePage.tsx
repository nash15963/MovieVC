/** @format */

import UserListComponent from "../Components/UserListComponent";
import Signout from "../Member/Signout";

const ProfilePage = () => {
  return (
    <div className="profile">
      <UserListComponent />
      <Signout />
    </div>
  );
};

export default ProfilePage;
