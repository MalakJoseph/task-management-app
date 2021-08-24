import * as React from "react";
import axios from "axios";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { useGravatar } from "../utils/useGravatar";
import { UserInfo } from "../types";
import Loader from "react-loader-spinner";

const HomePage = () => {
  const history = useHistory();
  const [userData, setUserData] = React.useState<UserInfo>({} as UserInfo);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userImageSrc] = useGravatar(userData.email);
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
        })
        .finally(() => setIsLoading(false));
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
      {isLoading ? (
        <StyledLoader
          type="Bars"
          width="100px"
          height="100px"
          color="#0075ff"
        />
      ) : (
        <>
          <img src={userImageSrc!} alt="User" />
          <p>
            {!userData ? "Loading..." : JSON.stringify({ userData }, null, 2)}
          </p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </AppContainer>
  );
};

export default HomePage;

const AppContainer = styled.div`
  position: relative;
  height: 100%;
  background-color: #f5f7f9;
`;

const StyledLoader = styled(Loader)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
