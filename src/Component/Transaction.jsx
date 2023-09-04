import React, { useEffect, useState } from "react";
import AccountsService from "../Services/AccountsService";
import { useAuth } from "../Utils/Auth";
import { Link, useNavigate } from "react-router-dom";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import TransactionService from "../Services/TransactionService";

const Transaction = () => {
  const auth = useAuth();
  const id = auth.user.id;
  const [toggle, setToggle] = useState(true);
  const [documentView, setDocumentView] = useState([]);
  const [subAdmin, setSubAdmin] = useState("");
  const [subAdminlist, setSubAdminlist] = useState([]);
  const [documentFilter, setDocumentFilter] = useState([]);
  const [startDatevalue, SetStartDatesetValue] = useState(new Date());
  const [endDatevalue, setEndDateValue] = useState(new Date());
  const [accountData, setAccountData] = useState([]);

  const test = ["subAdminName"];

  const handleClick = (key, value) => {
    let nArr = [...documentView];
    // const originalData = [...documentView];

    if (test.includes(key)) {
      nArr = nArr.filter((item) => item[key] === value);
    }
    // if (nArr.length === 0) {
    //   nArr = originalData;
    // }
    setDocumentView(nArr);
  };

  useEffect(() => {
    AccountsService.getprofile(auth.user, id).then(
      (res) => (setDocumentView(res.data), setAccountData(res.data))
    );
  }, [auth, id]);

  // useEffect(() => {
  //   if (auth.user) {
  //     TransactionService.subAdminList(auth.user).then((res) => {
  //       setSubAdminlist(res.data);
  //     });
  //   }
  // }, [auth]);

  const handleSubAdmin = (e) => {
    const value = e.target.value;
    setSubAdmin(value);
    handleClick("subAdminName", value);
  };

  const handelDate = () => {
    const sdate = moment(startDatevalue, "DD-MM-YYYY HH:mm").toDate();
    const edate = moment(endDatevalue, "DD-MM-YYYY HH:mm").toDate();
    const filteredDocuments = documentView.filter((data) => {
      const transactionDate = new Date(data.createdAt);
      return transactionDate >= sdate && transactionDate <= edate;
    });
    setDocumentFilter(filteredDocuments);
    setToggle(false);
  };

  const handleStartDatevalue = (e) => {
    SetStartDatesetValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  const handleEndDatevalue = (e) => {
    setEndDateValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  const handleReset = () => {
    setDocumentView(accountData);
    setToggle(true);
    SetStartDatesetValue("");
    setEndDateValue("");
  };

  return (
    <div style={{ backgroundColor: "#ecfc9d" }}>
      <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
        <ul className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link to="/welcome">
              <b>Your Profile</b>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/transaction">
              <b>Your Transactions</b>
            </Link>
          </li>
          {/* <li className="breadcrumb-item active" aria-current="page">
                    Log Out
                  </li> */}
        </ul>
      </nav>
      <div className="d-flex justify-content-center">
        <h6 className="fw-bold text-nowrap pt-2"> SubAdminlist</h6>
        <select
          className="form-control mx-3 w-25"
          value={subAdmin || ""}
          autoComplete="off"
          onChange={handleSubAdmin}
          style={{
            boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
            border: "0.5px solid black",
            borderRadius: "6px",
          }}
          required
        >
          <option selected>Select subAdmin</option>
          {subAdminlist.map((data) => {
            return (
              <option key={data._id} value={data.firstname}>
                {data.firstname}
              </option>
            );
          })}
        </select>
      </div>
      <div className="d-flex pt-2 justify-content-center">
        <h6 className="fw-bold text-nowrap pt-2"> Start Date</h6>
        <Datetime
          value={startDatevalue}
          onChange={handleStartDatevalue}
          dateFormat="DD-MM-YYYY"
          timeFormat="HH:mm"
        />
      </div>
      <div className="d-flex pt-2 justify-content-center mb-3">
        <h6 className="fw-bold text-nowrap pt-2"> End Date</h6>
        <Datetime
          value={endDatevalue}
          onChange={handleEndDatevalue}
          dateFormat="DD-MM-YYYY"
          timeFormat="HH:mm"
        />
      </div>
      <div className="d-flex pt-3 justify-content-center mb-2">
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-dark"
            style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
            onClick={handelDate}
          >
            Filter
          </button>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-dark"
            style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      <div className=" container mt-5">
        {/* This is for Deposit Card Normal View */}
        <div
          className="card  rounded-2 mb-2"
          style={{
            boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
            backgroundImage:
              "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
          }}
        ></div>
        {toggle ? (
          <div className=" container mt-5">
            <div
              className="card  rounded-2 mb-2"
              style={{
                boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
                backgroundImage:
                  "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
              }}
            >
              <div className="card-body">
                <div className="row">
                  <h4 className="col fs-6">Date</h4>
                  <h4 className="col fs-6">Amount</h4>
                  <h4 className="col fs-6">Transaction Id</h4>
                  <h4 className="col fs-6">Transaction Type</h4>
                  <h4 className="col fs-6">Gateway</h4>
                  <h4 className="col fs-6">CreatedBy</h4>
                  <h4 className="col fs-6">User Id</h4>
                  <h4 className="col fs-6">Bank</h4>
                  <h4 className="col fs-6">Website</h4>
                </div>
              </div>
            </div>

            {documentView.length > 0 ? (
              documentView.map((data, i) => {
                return (
                  <div
                    className="card rounded-2"
                    style={{
                      transition: "transform 0.3s",
                      transform: "scale(1)",
                      boxShadow: "20px 3px 22px 1px rgba(0, 0, 0, 0.36)",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.01)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <p className="col fs-6 font-weight-bold">
                          {new Date(data.date).toLocaleString("default", {
                            month: "long",
                          })}{" "}
                          {new Date(data.date).getDate()}
                        </p>
                        <p className="col fs-6 font-weight-bold">
                          ₹&nbsp;{data.amount}
                        </p>
                        {/* <p className="col fs-6 text-break font-weight-bold">
                          {data.transactionID}
                        </p>
                        <p className="col fs-6 font-weight-bold">
                          {data.paymentMethod}
                        </p> */}
                        {/* <p className="col fs-6 text-break">{data.subAdminId}</p> */}
                        <p className="col fs-6 font-weight-bold">
                          {data.transactionType}
                        </p>
                        {/* <p className="col fs-6 font-weight-bold">
                          {data.userId}
                        </p>
                        <p className="col fs-6 font-weight-bold">
                          {data.bankName}
                        </p>
                        <p className="col fs-6 font-weight-bold">
                          {data.websiteName}
                        </p> */}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="text-center">No Transaction Found</h1>
            )}
          </div>
        ) : (
          <div className=" container mt-5">
            <div
              className="card  rounded-2 mb-2"
              style={{
                boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
                backgroundImage:
                  "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
              }}
            >
              <div className="card-body">
                <div className="row">
                  <h4 className="col fs-6">Date</h4>
                  <h4 className="col fs-6">Amount</h4>
                  <h4 className="col fs-6">Transaction Id</h4>
                  <h4 className="col fs-6">Gateway</h4>
                  <h4 className="col fs-6">CreatedBy</h4>
                  <h4 className="col fs-6">User Id</h4>
                  <h4 className="col fs-6">Bank</h4>
                  <h4 className="col fs-6">Website</h4>
                </div>
              </div>
            </div>

            {documentFilter.length > 0 ? (
              documentFilter.map((data, i) => {
                return (
                  <div
                    className="card rounded-2"
                    style={{
                      transition: "transform 0.3s",
                      transform: "scale(1)",
                      boxShadow: "20px 3px 22px 1px rgba(0, 0, 0, 0.36)",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.01)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <p className="col fs-6">
                          {new Date(data.createdAt).toLocaleString("default")}{" "}
                        </p>
                        <p className="col fs-6 font-weight-bold">
                          ₹&nbsp;{data.amount}
                        </p>
                        {/* <p className="col fs-6 text-break font-weight-bold">
                          {data.transactionID}
                        </p>
                        <p className="col fs-6 font-weight-bold">
                          {data.paymentMethod}
                        </p> */}
                        {/* <p className="col fs-6 text-break">{data.subAdminId}</p> */}
                        <p className="col fs-6 font-weight-bold">
                          {data.transactionType}
                        </p>
                        {/* <p className="col fs-6 font-weight-bold">
                          {data.userId}
                        </p>
                        <p className="col fs-6 font-weight-bold">
                          {data.bankName}
                        </p>
                        <p className="col fs-6 font-weight-bold">
                          {data.websiteName}
                        </p> */}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="text-center">No Transaction Found</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Transaction;
