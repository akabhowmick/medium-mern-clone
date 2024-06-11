import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import axios from "axios";
import { userId } from "./features/userIdSlice";
import { MainPage } from "./components/HomePage/MainPage";
import { OurStory } from "./components/OurStory/OurStory";
import { WriteStories } from "./components/WriteStories/WriteStories";
import { Memberships } from "./components/Memberships/Memberships";
import { Creators } from "./components/Creators/Creators";
import { ViewStory } from "./components/ViewStory/ViewStory";
import { Lists } from "./components/Lists/Lists";
import { MyStories } from "./components/MyStories/MyStories";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { auth } from "./components/firebase";

function App() {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState();

  const getUser = async (authUser) => {
    await axios.get(`/api/user/${authUser?.email}`).then(async (res) => {
      console.log(res.data);
      if (res.data.status) {
        setUserDetails(res.data?.data);
        dispatch(userId(res.data.data._id));
      }
      if (!res.data.status) {
        const confHeader = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = {
          providerId: authUser?.providerId,
          uid: authUser?.uid,
          displayName: authUser?.displayName,
          email: authUser?.email,
          phoneNumber: authUser?.phoneNumber,
          photoURL: authUser?.photoURL,
        };
        await axios
          .post("/api/user", body, confHeader)
          .then((res) => {
            console.log(res.data);
            setUserDetails(res.data?.data);
            dispatch(
              userId({
                _id: res.data.data._id,
              })
            );
          })
          .catch((err) => {
            console.log(err.response.data.message);
          });
      }
    });
  };

  useEffect(() => {
    // where is auth coming from
    auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        getUser(authUser);
        dispatch(
          login({
            providerData: authUser.providerData[0],
          })
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/getting-started" element={<MainPage signInPopup={undefined} />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/membership" element={<Memberships />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/story/:id" element={<ViewStory userDetails={userDetails} />} />
          <Route
            path="/new-story"
            element={
              <PrivateRoute>
                <WriteStories userDetails={userDetails} />
              </PrivateRoute>
            }
          />
          <Route
            path="/me/lists"
            element={
              <PrivateRoute>
                <Lists userDetails={userDetails} />
              </PrivateRoute>
            }
          />
          <Route
            path="/me/stories"
            element={
              <PrivateRoute>
                <MyStories userDetails={userDetails} />
              </PrivateRoute>
            }
          />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <LandingPage userDetails={userDetails} />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
