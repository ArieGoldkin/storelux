import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import Card from "../../../components/common/UIElements/Card";
import Button from "../../../components/common/FormElements/Button";
import LoadingSpinner from "../../../components/common/UIElements/LoadingSpinner";
import ErrorModal from "../../../components/common/UIElements/ErrorModal";
import ProfileManagement from "../../../components/UserProfile/ProfileManagement/ProfileManagement";
import ImageUpload from "../../../components/common/FormElements/ImageUpload";
import Input from "../../../components/common/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../../components/common/util/InputValidators";
import { useForm } from "../../../hooks/form-hook";
import { userUpdateRequest } from "../../../store/actions";

import {
  getAuthUserId,
  getUserItem,
  getUserIsDone,
  getUserLoading,
  getUsersError,
} from "../../../store/selectors";

import "./css/Profile.css";

const UpdateProfile = ({ user, userId, onUpdate, loading, error }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(null);
  const [formState, inputHandler, setFormData] = useForm();

  const history = useHistory();

  useEffect(() => {
    setFormData(
      {
        firstName: {
          value: user.firstName,
          isValid: true,
        },
        lastName: {
          value: user.lastName,
          isValid: true,
        },
        email: {
          value: user.email,
          isValid: true,
        },
        address: {
          value: user.address,
          isValid: true,
        },
        phone: {
          value: user.phone,
          isValid: true,
        },
        image: {
          value: user.image,
          isValid: true,
        },
      },
      true
    );
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (error) {
      setErrorMessage(error.error);
    }
  }, [
    error,
    loading,
    setFormData,
    user.address,
    user.email,
    user.firstName,
    user.image,
    user.lastName,
    user.phone,
  ]);

  const updateUserSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", formState.inputs.email.value);
    formData.append("firstName", formState.inputs.firstName.value);
    formData.append("lastName", formState.inputs.lastName.value);
    formData.append("address", formState.inputs.address.value);
    formData.append("phone", formState.inputs.phone.value);
    formData.append("image", formState.inputs.image.value);

    onUpdate(userId, formData);
    if (!loading) {
      history.push(`/user/profile`);
    }
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <ErrorModal error={ErrorMessage} onClear={clearError} />
      <div className="user-profile__wrapper">
        <ProfileManagement />
        {isLoading && (
          <div className="loadingSpinnerPosition">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && (
          <Card className="update-user__form">
            <form onSubmit={updateUserSubmitHandler}>
              <div className="info">
                <div className="info_content">
                  <div className="user-profile__profile-image">
                    <div className="avatar-size">
                      <ImageUpload
                        id="image"
                        onInput={inputHandler}
                        initialValue={user.image}
                        initialValid={true}
                      />
                    </div>
                  </div>
                  <div className="user-profile__profile-info">
                    <div className="user-profile__profile-info__title">
                      <label className="profile_label">User Email:</label>
                      <label className="profile_label">First Name:</label>
                      <label className="profile_label">Last Name:</label>
                      <label className="profile_label">Address:</label>
                      <label className="profile_label">Phone Number:</label>
                    </div>
                    <div className="user-profile__profile-info__content">
                      <div className="user-profile__input-container">
                        <Input
                          id="email"
                          element="input"
                          validators={[VALIDATOR_EMAIL()]}
                          errorText="Please enter a valid email address."
                          onInput={inputHandler}
                          initialValue={user.email}
                          initialValid={true}
                        />
                        <Input
                          id="firstName"
                          element="input"
                          type="text"
                          validators={[VALIDATOR_REQUIRE()]}
                          onInput={inputHandler}
                          errorText="Please enter a valid First Name"
                          initialValue={user.firstName}
                          initialValid={true}
                        />
                        <Input
                          id="lastName"
                          element="input"
                          type="text"
                          validators={[VALIDATOR_REQUIRE()]}
                          onInput={inputHandler}
                          errorText="Please enter a valid Last Name"
                          initialValue={user.lastName}
                          initialValid={true}
                        />
                        <Input
                          id="address"
                          element="input"
                          type="text"
                          validators={[VALIDATOR_REQUIRE()]}
                          onInput={inputHandler}
                          errorText="Please enter a valid Address"
                          initialValue={user.address}
                          initialValid={true}
                        />
                        <Input
                          id="phone"
                          element="input"
                          type="text"
                          validators={[VALIDATOR_MINLENGTH(10)]}
                          onInput={inputHandler}
                          errorText="Please enter a valid phone Number"
                          initialValue={user.phone}
                          initialValid={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="user-profile__footer">
                  <Button type="submit" buttonClass="update-profile_btn" disabled={!formState.isValid}>
                    UPDATE PROFILE
                  </Button>
                </div>
              </div>
            </form>
          </Card>
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
    loading: getUserLoading(state),
    error: getUsersError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (userId, formData) =>
      dispatch(userUpdateRequest(userId, formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
