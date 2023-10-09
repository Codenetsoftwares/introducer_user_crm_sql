import React, { useEffect, useState } from "react";
import AccountsService from "../Services/AccountsService";
import { useAuth } from "../Utils/Auth";
import { Link, useNavigate } from "react-router-dom";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import TransactionService from "../Services/TransactionService";
import { CSVLink } from "react-csv";

const Statement = () => {
  const auth = useAuth();
  const id = auth.user.id;
  const [toggle, setToggle] = useState(true);
  const [documentView, setDocumentView] = useState([]);
  const [documentFilter, setDocumentFilter] = useState([]);
  const [startDatevalue, SetStartDatesetValue] = useState(new Date());
  const [endDatevalue, setEndDateValue] = useState(new Date());
  const [select, setSelect] = useState("All");
  const [accountData, setAccountData] = useState([]);

  // const [FoundObject, setFoundObject] = useState([]);

  const test = [
    "transactionType",
    "subAdminName",
    "websiteName",
    "bankName",
    "introducerUserName",
  ];
  const handleClick = (key, value) => {
    let nArr = [...documentView];
    if (test.includes(key)) {
      nArr = nArr.filter((item) => item[key] === value);
    }
    setDocumentView(nArr);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    handleClick("transactionType", value);
  };

  useEffect(() => {
    TransactionService.getIntroducerSingleUser(id, auth.user).then(
      (res) => (setDocumentView(res.data), setAccountData(res.data))
    );
  }, [auth, id]);

  console.log(documentView);

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
    setToggle(true);
    SetStartDatesetValue("");
    setEndDateValue("");
    setDocumentView(accountData);
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
            <Link to="">
              <b>Your Transactions</b>
            </Link>
          </li>
          {/* <li className="breadcrumb-item active" aria-current="page">
                    Log Out
                  </li> */}
        </ul>
      </nav>
      <div className="d-flex  pt-3 justify-content-center">
        <h6 className="fw-bold text-nowrap pt-2">Transaction</h6>
        <select
          className="form-control mx-3 w-25"
          value={select || ""}
          autoComplete="off"
          onChange={handleChange}
          style={{
            // boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
            border: "0.5px solid black",
            borderRadius: "6px",
          }}
        >
          <option className="d-flex" value="All">
            <b>All</b>
          </option>
          <option className="d-flex" value="Deposit">
            <b>Deposit</b>
          </option>
          <option className="d-flex" value="Withdraw">
            <b>Withdraw</b>
          </option>
        </select>
      </div>
      <div className="d-flex flex-row justify-content-center gap-2">
        <div className="d-flex pt-2 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> Start Date&nbsp;</h6>
          <Datetime
            value={startDatevalue}
            onChange={handleStartDatevalue}
            dateFormat="DD-MM-YYYY"
            timeFormat="HH:mm"
          />
        </div>
        <div className="d-flex pt-2 justify-content-center mb-3">
          <h6 className="fw-bold text-nowrap pt-2"> End Date &nbsp;</h6>
          <Datetime
            value={endDatevalue}
            onChange={handleEndDatevalue}
            dateFormat="DD-MM-YYYY"
            timeFormat="HH:mm"
          />
        </div>
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
        {toggle ? (
          <div className="mx-2">
            <CSVLink data={documentView} className="btn btn-success">
              Download Data
            </CSVLink>
          </div>
        ) : (
          <div className="mx-2">
            <CSVLink data={documentFilter} className="btn btn-success">
              Download Filter Data
            </CSVLink>
          </div>
        )}
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
          <small className="d-flex justify-content-center">
            {/* Normal View */}
            <table class="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl w-auto ">
              {/* This is for Deposit Card Normal View */}
              {/* <div
            className="card  rounded-2 mb-2"
            style={{
              boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
              backgroundImage:
                "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
            }}
          > */}
              <thead className="table-success">
                <tr align="center" bgcolor="green" className="fs-6">
                  <th scope="col fs-6" className="text-primary">
                    Date & Time
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Amount
                  </th>
                  {/* <th scope="col text-break fs-6" className="text-primary">
                                Txn Id
                            </th> */}
                  <th scope="col text-break fs-6" className="text-primary">
                    Txn Type
                  </th>

                  <th scope="col text-break" className="text-primary">
                    Remarks
                  </th>
                </tr>
              </thead>
              {/* </div> */}
              <tbody>
                {documentView.length > 0 ? (
                  documentView.map((data, i) => {
                    return (
                      <tr align="center" className="fs-6">
                        <td>
                          {" "}
                          {new Date(data.createdAt).toLocaleString(
                            "default"
                          )}{" "}
                        </td>
                        <td>
                          {data.amount && (
                            <p className="col fs-6">{data.amount}</p>
                          )}
                          {data.depositAmount && (
                            <p className="col fs-6">{data.depositAmount}</p>
                          )}
                          {data.withdrawAmount && (
                            <p className="col fs-6">{data.withdrawAmount}</p>
                          )}
                        </td>

                        <td>
                          {data.transactionType && (
                            <p className="col fs-6 text-break">
                              {data.transactionType}
                            </p>
                          )}
                        </td>

                        <td>{data.remarks}</td>
                      </tr>
                    );
                  })
                ) : (
                  <h1 className="text-center">No Transaction Found</h1>
                )}
              </tbody>
            </table>
          </small>
        ) : (
          <small className="d-flex justify-content-center">
            <table class="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl w-auto ">
              {/* This is for Deposit Card Normal View */}
              {/* <div
            className="card  rounded-2 mb-2"
            style={{
              boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
              backgroundImage:
                "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
            }}
          > */}
              <thead className="table-success">
                <tr align="center" bgcolor="green" className="fs-6">
                  <th scope="col fs-6" className="text-primary">
                    Date & Time
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Amount
                  </th>
                  {/* <th scope="col text-break fs-6" className="text-primary">
                                Txn Id
                            </th> */}
                  <th scope="col text-break fs-6" className="text-primary">
                    Txn Type
                  </th>

                  <th scope="col text-break" className="text-primary">
                    Remarks
                  </th>
                </tr>
              </thead>
              {/* </div> */}
              <tbody>
                {documentFilter.length > 0 ? (
                  documentFilter.map((data, i) => {
                    return (
                      <tr align="center" className="fs-6">
                        <td>
                          {" "}
                          {new Date(data.createdAt).toLocaleString(
                            "default"
                          )}{" "}
                        </td>
                        <td>
                          {data.amount && (
                            <p className="col fs-6">{data.amount}</p>
                          )}
                          {data.depositAmount && (
                            <p className="col fs-6">{data.depositAmount}</p>
                          )}
                          {data.withdrawAmount && (
                            <p className="col fs-6">{data.withdrawAmount}</p>
                          )}
                        </td>

                        <td>
                          {data.transactionType && (
                            <p className="col fs-6 text-break">
                              {data.transactionType}
                            </p>
                          )}
                        </td>

                        <td>{data.remarks}</td>
                      </tr>
                    );
                  })
                ) : (
                  <h1 className="text-center">No Transaction Found</h1>
                )}
              </tbody>
            </table>
          </small>
        )}
      </div>
    </div>
  );
};

export default Statement;
