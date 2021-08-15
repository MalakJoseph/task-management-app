import * as React from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useGravatar } from "../utils/useGravatar";
import { UserInfo } from "../types";

const HomePage = () => {
  const history = useHistory();
  const [userData, setUserData] = React.useState<UserInfo>({} as UserInfo);
  const [userImageSrc] = useGravatar(userData.email);
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    const fetchData = async () => {
      await axios
        .get<UserInfo>("/users/me", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setUserData(res.data))
        .catch((e) => {
          if (e.response.status === 401) {
            localStorage.removeItem("token");
            history.replace("/login");
          }
        });
    };
    fetchData();
  }, [token, history]);

  const handleLogout = async () => {
    await axios.post("/users/logout", null, {
      headers: { authorization: token },
    });
    localStorage.removeItem("token");
    history.replace("/login");
  };

  if (!token) history.replace("/login");

  return (
    <AppContainer>
      <img src={userImageSrc!} alt="User" />
      <p>{!userData ? "Loading..." : JSON.stringify({ userData }, null, 2)}</p>
      {/* <button>Sign up</button>
      <button>Login</button> */}
      <button onClick={handleLogout}>Logout</button>
    </AppContainer>
  );
};

export default HomePage;

const AppContainer = styled.div`
  /* background-color: red; */
`;