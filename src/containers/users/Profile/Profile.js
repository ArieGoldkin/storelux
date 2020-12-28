import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ProfileManagement from "./../../../components/UserProfile/ProfileManagement/ProfileManagement";
import UserProfile from "./../../../components/UserProfile/UserProfile";
import ErrorModal from "../../../components/common/UIElements/ErrorModal";
import LoadingSpinner from "../../../components/common/UIElements/LoadingSpinner";
import { userDataStart } from "../../../store/actions";
import {
  getAuthUserId,
  getUserItem,
  getUserIsDone,
  getUserError,
  getUserLoading,
} from "../../../store/selectors";

import "./css/Profile.css";

const Profile = ({ userId, userData, user, loading, error }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      userData(userId);
    } else {
      setIsLoading(false);
    }
    if (error) {
      setErrorMessage(error.error);
    }
  }, [userData, userId, loading, error]);

  const clearError = () => {
    setErrorMessage(null);
  };
  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <div className="user-profile__wrapper">
        {!isLoading && (
          <>
            <ProfileManagement />
            <UserProfile user={user} />
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: getAuthUserId(state),
    user: getUserItem(state),
    isDone: getUserIsDone(state),
    error: getUserError(state),
    loading: getUserLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userData: (userId) => dispatch(userDataStart(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
