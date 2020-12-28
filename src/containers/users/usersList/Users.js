import React, { useEffect } from "react";
import { connect } from "react-redux";

import UsersList from "./UsersList";
import ErrorModal from "../../../components/common/UIElements/ErrorModal";
import LoadingSpinner from "../../../components/common/UIElements/LoadingSpinner";

import {
  getUsersRequest,
  clearUsersErrorMessage,
} from "../../../store/actions";
import {
  getUsers,
  getUsersLoading,
  getUsersError,
  getUsersIsDone,
  getUserProductsChange,
} from "../../../store/selectors";

const Users = ({
  loadUsers,
  loading,
  error,
  users,
  UsersIsDone,
  userProductsChange,
  clearErrorMessage,
}) => {
  useEffect(() => {
    if (!UsersIsDone || userProductsChange) {
      loadUsers();
    }
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, [loadUsers, UsersIsDone, userProductsChange]);

  const clearError = () => {
    clearErrorMessage();
  };

  let errorMessage = null;
  if (error) {
    errorMessage = error.error;
  }

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {loading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!loading && <UsersList items={users} />}
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
    clearErrorMessage: () => dispatch(clearUsersErrorMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
