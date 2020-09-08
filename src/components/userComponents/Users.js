import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import UsersList from "./UsersList";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import * as actionTypes from "./usersActions/UserActions";
import * as userSelectors from "./selectors/UserSelectors";

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
    users: userSelectors.getUsers(state),
    loading: userSelectors.getUsersLoading(state),
    error: userSelectors.getUsersError(state),
    UsersIsDone: userSelectors.getUsersIsDone(state),
    userProductsChange: userSelectors.getUserProductsChange(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(actionTypes.getUsersRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
