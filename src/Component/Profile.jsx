import React, { useState, useEffect } from "react";
import { useAuth } from "../Utils/Auth";
import verify from "../Assets/verify.png";
import "./Profile.css";
import Add from "../Assets/Addd.png";
import Edit from "../Assets/editt.png";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import ModalBank from "./ModalBank";
import AccountsService from "../Services/AccountsService";
import ModalBankView from "./ModalBankView";
import "./Profile.css";
import Editicon from "../Assets/Editpas.png";
import WeeklyReport from "./Modal/WeeklyReport";

const Profile = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const id = auth.user.id;
  console.log("This is Auth=>", auth);
  const [userAuth, setUserAuth] = useState([]);
  const [profiledata, setProfiledata] = useState([]);
  const [FoundObject, setFoundObject] = useState([]);
  // const [Lbalance setLbalance] = useState([]);
  const [balance, setBalance] = useState([]);

  const handleLogout = () => {
    const response = true;
    if (response) {
      alert("You are going to Logout from this site");
      auth.logout();
      navigate("/");
    }
  };

  useEffect(() => {
    AccountsService.getprofile(auth.user).then((res) =>
      setProfiledata(res.data)
    );
  }, [auth, id]);
  console.log("This is Profile Data =>>>", profiledata);

  useEffect(() => {
    AccountsService.liveBalance(id, auth.user).then((res) =>
      setBalance(res.data)
    );
  }, [auth, id]);
  console.log("This is Live Balance=>>>", balance);

  // useEffect(() => {
  //   AccountsService.getprofile(auth.user)
  //     .then((res) => {
  //       setProfiledata(res.data);

  //       const userWithId = res.data.find((user) => user._id === id);

  //       setFoundObject(userWithId);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error("Error fetching user data:", error);
  //     });
  // }, [auth, id]);

  // console.log("This is profile data ==>>>", profiledata);
  const handeleditprofile = () => {
    navigate(`/editprofile/${profiledata._id}`);
  };

  const handleStatement = () => {
    navigate(`/statement`);
  };

  const handleMyNetwork = () => {
    navigate(`/mynetworks/${auth.userName}`);
  };

  const handelresetpass = () => {
    navigate("/Resetpasword");
  };
  return (
    <div
      style={{
        backgroundImage:
          " linear-gradient(90deg, rgba(236,208,146,1) 0%, rgba(252,255,131,0.9500175070028011) 50%, rgba(236,208,146,1) 100%)",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <section className="mt-5 pt-5">
        <div className="container py-5">
          <div className="row">
            <div className="col">
              <nav
                aria-label="breadcrumb"
                className="bg-light rounded-3 p-3 mb-4"
              >
                <ul className="breadcrumb mb-0 d-flex justify-content-between">

                  <button type="button" class="btn" >
                    <b>My Profile</b>
                  </button>



                  <button type="button" class="btn" onClick={handleMyNetwork}>
                    <b>My Network</b>
                  </button>


                  <button type="button" class="btn " data-toggle="modal" data-target="#weeklyReport">
                    <b>weekly Report</b>
                  </button>


                  <button type="button" class="btn" onClick={handleStatement}>
                    <b>Statement</b>
                  </button>

                </ul>
              </nav>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4" style={{ height: "31.8rem" }}>
                <div className="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <h5 className="my-3 pt-3">
                    Hi!&nbsp;{profiledata.firstname}
                  </h5>
                  {/* <marquee class="news-content"> */}
                  <p className="text-muted">
                    Current Due :{" "}
                    {profiledata.currentDue > 0 ? (
                      <blink>
                        {" "}
                        <b className="blink_me" style={{ color: "green" }}>
                          {profiledata.currentDue}
                        </b>
                      </blink>
                    ) : (
                      <b className="blink_me" style={{ color: "red" }}>
                        <blink>{profiledata.currentDue}</blink>
                      </b>
                    )}
                  </p>
                  <p></p>
                  {/* </marquee> */}
                  <p className="text-muted ">{profiledata.email}</p>
                  <p className="text-muted mb-4 ">
                    <img
                      src={verify}
                      style={{
                        width: "20px",
                        border: "2px #20b1f5",
                        borderRadius: "15px",
                      }}
                    />
                    &nbsp;Verified By Obhisab.com
                  </p>
                  <div className="d-flex justify-content-center mb-2 pt-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>

                    {/* <button
                      type="button"
                      className="btn btn-outline-primary ms-1"
                      onClick={handeleditprofile}
                    >
                      <small>Edit Profile</small>
                    </button> */}
                  </div>
                </div>
              </div>
              {/* ... Other content ... */}
            </div>
            <div className="col-lg-8">
              <div className="card mb-4" style={{ height: "31.8rem" }}>
                <div className="card-body">
                  <p>
                    <h6>
                      Name:&nbsp;{profiledata.firstname}&nbsp;
                      {profiledata.lastname}{" "}
                    </h6>
                    <br />
                    <h6>Username: &nbsp;{profiledata.userName}</h6>
                    <br />

                    <h6 className="toUppercase">
                      Role: &nbsp;{profiledata.role}
                    </h6>
                    <br /><h6 className="toUppercase">
                      {" "}
                      Live Balance: &nbsp;{balance.LiveBalance}
                    </h6>
                    <br />
                    <h6 className="toUppercase">
                      {" "}
                      Payment Done Lifetime: &nbsp;{profiledata.balance}
                    </h6>
                    <br />
                    <h6 className="toUppercase">
                      {" "}
                      Current Due: &nbsp;{profiledata.currentDue}
                    </h6>
                    <br />
                    <h6>
                      Password: &nbsp; ********{" "}
                      <img
                        src={Editicon}
                        style={{ width: "25px" }}
                        onClick={handelresetpass}
                        title="Reset"
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.4)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      />
                    </h6>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalBankView />
      <Modal />
      <ModalBank />
      <WeeklyReport />
    </div>
  );
};

export default Profile;
