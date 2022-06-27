import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import axios from "axios";

function UserProfile() {
  // // Redirect away if NOT auth
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(async () => {
  //   const session = await getSession();
  //   if (!session) {
  //     window.location.href = "/auth";
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }
  const changePasswordHandler = async (passwordData) => {
    const data = await axios.patch("api/user/change-password", passwordData);
  };
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
