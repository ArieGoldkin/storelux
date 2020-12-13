import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import UsersList from "./UsersList";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import { getUsersRequest } from "./usersActions/UserActions";
import {
  getUsers,
  getUsersLoading,
  getUsersError,
  getUsersIsDone,
  getUserProductsChange,
} from "./selectors/UserSelectors";

const Users = ({
  loadUsers,
  loading,
  error,
  users,
  UsersIsDone,
  userProductsChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!UsersIsDone || userProductsChange) {
      loadUsers();
    }
    if (loading) {
      setIsLoading(true);
      loadUsers();
    } else {
      setIsLoading(false);
    }
    if (error) {
      setErrorMessage(error.error);
    }
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, [loading, error, loadUsers, UsersIsDone, userProductsChange]);

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
      {!isLoading && <UsersList items={users} />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    loading: getUsersLoading(state),
    error: getUsersError(state),
    UsersIsDone: getUsersIsDone(state),
    userProductsChange: getUserProductsChange(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(getUsersRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
