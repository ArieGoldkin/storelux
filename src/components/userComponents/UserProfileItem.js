import React from "react";

import Card from "../common/UIElements/Card";
import CustomAvatar from "../common/UIElements/CustomAvatar";
import Button from "../common/FormElements/Button";

const UserProfileItem = ({ user }) => {
  return (
    <Card className="user-profile__info">
      <div>
        <div className="info">
          <div className="user-profile__profile-name">
            <div className="avatar-size">
              <CustomAvatar
                image={`${process.env.REACT_APP_BACKEND_URL}/${user.image}`}
                alt={user.firstName}
              />
            </div>
            <div className="user-profile__title">
              <h4>User Email:</h4>
              {user.email}
            </div>
          </div>
          <div className="user-profile__profile-info">
            <div className="user-profile__profile-info__title">
              <label className="profile_label">First Name:</label>
              <label className="profile_label">Last Name:</label>
              <label className="profile_label">Address:</label>
              <label className="profile_label">Phone Number:</label>
            </div>
            <div className="user-profile__profile-info__content">
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
              <p>{user.address}</p>
              <p>{user.phone}</p>
            </div>
          </div>
        </div>
        <div className="user-profile__footer">
          <Button to={`/user/${user.id}`}>EDIT PROFILE</Button>
        </div>
      </div>
    </Card>
  );
};

export default UserProfileItem;
