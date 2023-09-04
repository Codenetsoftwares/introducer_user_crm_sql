import React, { useEffect, useState } from "react";
import AccountsService from "../Services/AccountsService";
import { useAuth } from "../Utils/Auth";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import "react-calendar/dist/Calendar.css";
const Transaction = () => {
  const auth = useAuth();
  const id = auth.user.id;
  const [filter, setFilter] = useState([]);
  const [profiledata, setProfiledata] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [outerSelect, setOuterSelect] = useState(true);

  useEffect(() => {
    AccountsService.getprofile(auth.user, id).then((res) =>
      setProfiledata(res.data.creditTransaction)
    );
  }, [auth, id]);
  console.log(profiledata);

  const handelDate = () => {
    setOuterSelect(false);
    const sdate = new Date(startDate);
    console.log("sdate", sdate);
    const edate = new Date(endDate);
    edate.setHours(23, 59, 59);
    console.log("ldate", edate);

    const filteredDocuments = profiledata.filter((data) => {
      const transactionDate = new Date(data.createdAt);
      // console.log('st', transactionDate)
      return transactionDate >= sdate && transactionDate <= edate;
    });

    setFilter(filteredDocuments);

    console.log(outerSelect);
  };

  const handeReset = () => {
    setOuterSelect(true);
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
      <div className="d-flex gap-2 justify-content-center w-25 ms-5 ">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="form-control datepicker-with-icon input-group input-group-sm"
          placeholderText="Start Date"
          dateFormat="dd/MM/yyyy"
        />

        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          className="form-control datepicker-with-icon input-group input-group-sm "
          placeholderText="End Date"
          dateFormat="dd/MM/yyyy"
        />

        <div className="gap-2 d-flex flex-row">
          {" "}
          <button
            type="button"
            className="btn btn-dark"
            style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
            onClick={handelDate}
          >
            Filter
          </button>
          <button
            type="button"
            className="btn btn-dark"
            style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
            onClick={handeReset}
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
        >
          <div className="card-body">
            <div className="row"  >
              <p className="col fs-6 font-weight-bold" style={{border: '2px solid black'}}>Date</p>
              <p className="col fs-6 font-weight-bold" style={{border: '2px solid black'}}>Amount</p>
              <p className="col fs-6 font-weight-bold">Transaction Type</p>
              <p className="col fs-6 font-weight-bold">user ID</p>
              <p className="col fs-6 font-weight-bold">User Name</p> 
        
            </div>
          </div>
        </div>
        {outerSelect ? (
          <>
            {profiledata.length > 0 ? (
              profiledata.map((data, i) => {
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
                      <div className="row" >
                        <p className="col fs-6 font-weight-bold" style={{border: '2px solid black'}}>
                          {new Date(data.date).toLocaleString("default", {
                            month: "long",
                          })}{" "}
                          {new Date(data.date).getDate()}
                        </p>
                        <p className="col fs-6 font-weight-bold" style={{border: '2px solid black'}}>
                          ₹&nbsp;{data.amount}
                        </p>
                         <p className="col fs-6 font-weight-bold">
                          {data.transactionID}
                        </p>
                        {/* <p className="col fs-6 font-weight-bold">
                          {data.paymentMethod}
                        </p>  */}
                       
                        <p className="col fs-6 font-weight-bold">
                          {data.transactionType}
                        </p>
                         <p className="col fs-6 font-weight-bold">
                          {data.userId}
                        </p>
                         <p className="col fs-6 font-weight-bold">
                          {data.userName}
                        </p>  
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="text-center">No Transaction Found</h1>
            )}
          </>
        ) : (
          <>
            {filter.length > 0 ? (
              filter.map((data, i) => {
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
                      
                        <p className="col fs-6 font-weight-bold">
                          {data.transactionType}
                        </p>
                         <p className="col fs-6 font-weight-bold">
                          {data.userId}
                        </p>
                    
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="text-center">No Transaction Found</h1>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Transaction;
