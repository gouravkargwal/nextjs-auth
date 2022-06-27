import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import classes from "./main-navigation.module.css";

function MainNavigation() {
  const { data, status } = useSession();
  const logoutHandler = () => {
    signOut();
  };
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!data && status === "unauthenticated" && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}

          {data && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {data && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
