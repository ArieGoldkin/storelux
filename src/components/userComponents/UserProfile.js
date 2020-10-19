import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import UserManagement from "./UserManagement";
import UserProfileItem from "./UserProfileItem";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import * as actionTypes from "./usersActions/UserActions";
import { getAuthUserId } from "./selectors/AuthSelectors";
import {
  getUserItem,
  getUserIsDone,
  getUserError,
  getUserLoading,
} from "./selectors/UserSelectors";
import "./usersCss/UserProfile.css";

const UserProfile = ({ userId, userData, user, loading, error }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // if (!isDone && !loading) {
    //   userData(userId);
    // }
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
            <UserManagement />
            <UserProfileItem user={user} />
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
    userData: (userId) => dispatch(actionTypes.userDataStart(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
