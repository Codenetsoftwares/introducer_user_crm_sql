import React, { useEffect, useState } from "react";
import { useAuth } from "../Utils/Auth";
import AccountsService from "../Services/AccountsService";
import { useParams } from "react-router-dom";
import "./IndividulaNetwork.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { CSVLink } from "react-csv";
import Pagination from "./Pagination";

const IndividualNetwork = () => {
  const [singleData, setSingleData] = useState([]);
  const auth = useAuth();
  const { id } = useParams();
  const [select, setSelect] = useState("All");
  const [startDatevalue, SetStartDatesetValue] = useState(new Date());
  const [endDatevalue, setEndDateValue] = useState(new Date());
  const [toggle, setToggle] = useState(true);
  const [documentView, setDocumentView] = useState([]);
  const [documentFilter, setDocumentFilter] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [page, setPage] = useState(1);

  const test = ["transactionType", "subAdminName", "websiteName", "bankName"];

  const handleClick = (key, value) => {
    let nArr = [...documentView];
    if (test.includes(key)) {
      nArr = nArr.filter((item) => item[key] === value);
    }
    setDocumentView(nArr);
  };

  useEffect(() => {
    AccountsService.getIntroducerSingleUser(id, auth.user).then((res) => {
      console.log(res.data);
      setSingleData(res.data);
      setDocumentView(res.data.transactionDetail);
      setAccountData(res.data.transactionDetail);
    });
  }, [auth.user, id]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    handleClick("transactionType", value);
    setPage(1);
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

  const handleReset = () => {
    setSelect("");
    setDocumentView(accountData);
    setToggle(true);
    SetStartDatesetValue(new Date());
    setEndDateValue(new Date());
  };

  const handleStartDatevalue = (e) => {
    SetStartDatesetValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  const handleEndDatevalue = (e) => {
    setEndDateValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  let reminder = documentView.length % 10;
  let lastPage = Math.ceil(documentView.length / 10);
  let filterReminder = documentFilter.length % 10;
  let filterLastPage = Math.ceil(documentFilter.length / 10);
  let lastFilterPageReminder = documentView.length % 10 === !0;
  let lastPageReminder = documentFilter.length % 10 === !0;
  console.log("===>", filterLastPage);

  const selectPageHandler = (selectedPage) => {
    console.log(selectedPage);
    setPage(selectedPage);
  };

  console.log("singleData", singleData);
  return (
    <div class="fluid-container">
      <div class="main-body">
        {[singleData].map((user) => {
          return (
            <div class="row gutters-sm ">
              <div class="col-md-4 mb-3">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Admin"
                        class="rounded-circle"
                        width="150"
                      />
                      <div class="mt-3">
                        <h4>
                          {user.firstname} {user.lastname}
                        </h4>
                        <div class="text-left">
                          <p class="text-secondary mb-1 text-capitalize">
                            Username:&nbsp;{user.userName}&nbsp;
                          </p>

                          <p class="text-secondary mb-1 text-capitalize">
                            Role:&nbsp;{user.role}&nbsp;
                          </p>
                          <p class="text-secondary mb-1 text-capitalize">
                            Wallet:&nbsp;{user.wallet}&nbsp;
                          </p>
                          <p class="text-secondary mb-1 text-capitalize">
                            Introducer Username:&nbsp;{user.introducersUserName}
                            &nbsp;
                          </p>
                          <p class="text-secondary mb-1 text-capitalize">
                            Introducer Percentage:&nbsp;
                            {user.introducerPercentage === null
                              ? 0
                              : user.introducerPercentage}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <div class="card mb-3">
                  <div class="card-body">
                    <div className=" container mt-1">
                      <div className="d-flex mt-5 mt-5 ml-5 pt-5 justify-content-center">
                        <h6 className="fw-bold text-nowrap ">View</h6>
                        <select
                          className="form-control mx-3 w-25 mb-2"
                          value={select || ""}
                          autoComplete="off"
                          onChange={handleChange}
                          style={{
                            boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
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
                      <div className="d-flex pt-2 justify-content-center">
                        <h6 className="fw-bold text-nowrap pt-2">
                          {" "}
                          Start Date
                        </h6>
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
                            style={{
                              boxShadow:
                                "17px 15px 27px -9px rgba(0, 0, 0, 0.41)",
                            }}
                            onClick={handelDate}
                          >
                            Filter
                          </button>
                        </div>
                        <div className="mx-2">
                          <button
                            type="button"
                            className="btn btn-dark"
                            style={{
                              boxShadow:
                                "17px 15px 27px -9px rgba(0, 0, 0, 0.41)",
                            }}
                            onClick={handleReset}
                          >
                            Reset
                          </button>
                        </div>
                        <div className="mx-2">
                          {toggle ? (
                            <div className="mx-2">
                              <CSVLink
                                data={documentView}
                                className="btn btn-success"
                              >
                                Download Data
                              </CSVLink>
                            </div>
                          ) : (
                            <div className="mx-2">
                              <CSVLink
                                data={documentFilter}
                                className="btn btn-success"
                              >
                                Download Filter Data
                              </CSVLink>
                            </div>
                          )}
                        </div>
                      </div>
                      {toggle ? (
                        <>
                          <small>
                            <table class="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl">
                              <thead className="table-success">
                                <tr
                                  align="center"
                                  bgcolor="green"
                                  className="fs-6"
                                >
                                  <th scope="col fs-6" className="text-primary">
                                    Date & Time
                                  </th>
                                  <th
                                    scope="col  fs-6"
                                    className="text-primary"
                                  >
                                    Amount
                                  </th>
                                  <th
                                    scope="col  fs-6"
                                    className="text-primary"
                                  >
                                    Transaction Id
                                  </th>
                                  <th
                                    scope="col  fs-6"
                                    className="text-primary"
                                  >
                                    Transaction Type
                                  </th>
                                  <th scope="col fs-6" className="text-primary">
                                    Gateway
                                  </th>
                                  <th scope="col fs-6" className="text-primary">
                                    CreatedBy
                                  </th>

                                  <th scope="col" className="text-primary">
                                    Bank
                                  </th>
                                  <th scope="col" className="text-primary">
                                    Website
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {documentView.length > 0 ? (
                                  <>
                                    {page === lastPageReminder ? (
                                      <>
                                        {documentView
                                          .slice(
                                            page * 10 - 10,
                                            page * 10 - 10 + reminder
                                          )
                                          .map((data) => {
                                            return (
                                              <tr
                                                align="center"
                                                className="fs-6"
                                              >
                                                <td>
                                                  {" "}
                                                  {new Date(
                                                    data.createdAt
                                                  ).toLocaleString(
                                                    "default"
                                                  )}{" "}
                                                </td>

                                                <td className="">
                                                  <p
                                                    className={`col fs-6 text-break ${
                                                      data.transactionType.includes(
                                                        "Manual-Website-Withdraw"
                                                      ) ||
                                                      data.transactionType.includes(
                                                        "Manual-Bank-Withdraw"
                                                      ) ||
                                                      data.transactionType ===
                                                        "Withdraw"
                                                        ? "text-red"
                                                        : "text-green"
                                                    }`}
                                                  >
                                                    {data.amount && (
                                                      <p className="col fs-6">
                                                        {data.amount}
                                                      </p>
                                                    )}
                                                    {data.depositAmount && (
                                                      <p className="col fs-6">
                                                        {data.depositAmount}
                                                      </p>
                                                    )}
                                                    {data.withdrawAmount && (
                                                      <p className="col fs-6">
                                                        {data.withdrawAmount}
                                                      </p>
                                                    )}
                                                  </p>
                                                </td>

                                                <td>
                                                  {data.transactionID && (
                                                    <p className="col fs-6 ">
                                                      {data.transactionID}
                                                    </p>
                                                  )}
                                                  {data.depositAmount && (
                                                    <p className="col fs-6 ">
                                                      N.A
                                                    </p>
                                                  )}
                                                  {data.withdrawAmount && (
                                                    <p className="col fs-6 ">
                                                      N.A
                                                    </p>
                                                  )}
                                                </td>
                                                <td>
                                                  {data?.transactionType && (
                                                    <p
                                                      className={`col fs-6 text-break ${
                                                        data.transactionType.includes(
                                                          "Manual-Website-Withdraw"
                                                        ) ||
                                                        data.transactionType.includes(
                                                          "Manual-Bank-Withdraw"
                                                        ) ||
                                                        data.transactionType ===
                                                          "Withdraw"
                                                          ? "text-red"
                                                          : "text-green"
                                                      }`}
                                                    >
                                                      {data.transactionType}
                                                    </p>
                                                  )}
                                                </td>
                                                <td>
                                                  {data.paymentMethod && (
                                                    <p className="col fs-6">
                                                      {data.paymentMethod}
                                                    </p>
                                                  )}
                                                  {data.depositAmount && (
                                                    <p className="col fs-6 ">
                                                      N.A
                                                    </p>
                                                  )}
                                                  {data.withdrawAmount && (
                                                    <p className="col fs-6 ">
                                                      N.A
                                                    </p>
                                                  )}
                                                </td>
                                                <td>{data.subAdminName}</td>

                                                <td>
                                                  <p className="col fs-6">
                                                    {data.bankName
                                                      ? data.bankName
                                                      : "N.A"}
                                                  </p>
                                                </td>
                                                <td>
                                                  <p className="col fs-6">
                                                    {data.websiteName
                                                      ? data.websiteName
                                                      : "N.A"}
                                                  </p>
                                                </td>
                                              </tr>
                                            );
                                          })}
                                      </>
                                    ) : (
                                      <>
                                        {documentView
                                          .slice(page * 10 - 10, page * 10)
                                          .map((data) => {
                                            return (
                                              <tr
                                                align="center"
                                                className="fs-6"
                                              >
                                                <td>
                                                  {" "}
                                                  {new Date(
                                                    data.createdAt
                                                  ).toLocaleString(
                                                    "default"
                                                  )}{" "}
                                                </td>

                                                <td className="">
                                                  <p
                                                    className={`col fs-6 text-break ${
                                                      data.transactionType.includes(
                                                        "Manual-Website-Withdraw"
                                                      ) ||
                                                      data.transactionType.includes(
                                                        "Manual-Bank-Withdraw"
                                                      ) ||
                                                      data.transactionType ===
                                                        "Withdraw"
                                                        ? "text-red"
                                                        : "text-green"
                                                    }`}
                                                  >
                                                    {data.amount && (
                                                      <p className="col fs-6">
                                                        {data.amount}
                                                      </p>
                                                    )}
                                                    {data.depositAmount && (
                                                      <p className="col fs-6">
                                                        {data.depositAmount}
                                                      </p>
                                                    )}
                                                    {data.withdrawAmount && (
                                                      <p className="col fs-6">
                                                        {data.withdrawAmount}
                                                      </p>
                                                    )}
                                                  </p>
                                                </td>

                                                <td>
                                                  {data.transactionID && (
                                                    <p className="col fs-6 ">
                                                      {data.transactionID}
                                                    </p>
                                                  )}
                                                  {data.depositAmount && (
                                                    <p className="col fs-6 ">
                                                      N.A
                                                    </p>
                                                  )}
                                                  {data.withdrawAmount && (
                                                    <p className="col fs-6 ">
                                                      N.A
                                                    </p>
                                                  )}
                                                </td>
                                                <td>
                                                  {data?.transactionType && (
                                                    <p
                                                      className={`col fs-6 text-break ${
                                                        data.transactionType.includes(
                                                          "Manual-Website-Withdraw"
                                                        ) ||
                                                        data.transactionType.includes(
                                                          "Manual-Bank-Withdraw"
                                                        ) ||
                                                        data.transactionType ===
                                                          "Withdraw"
                                                          ? "text-red"
                                                          : "text-green"
                                                      }`}
                                                    >
                                                      {data.transactionType}
                                                    </p>
                                                  )}
                                                </td>
                                                <td>
                                                  {data.paymentMethod && (
                                                    <p className="col fs-6">
                                                      {data.paymentMethod}
                                                    </p>
                                                  )}
                                                  {data.depositAmount && (
                                                    <p className="col fs-6 ">
                                                      N.A
                                                    </p>
                                                  )}
                                                  {data.withdrawAmount && (
                                                    <p className="col fs-6 ">
                                                      N.A
                                                    </p>
                                                  )}
                                                </td>
                                                <td>{data.subAdminName}</td>

                                                <td>
                                                  <p className="col fs-6">
                                                    {data.bankName
                                                      ? data.bankName
                                                      : "N.A"}
                                                  </p>
                                                </td>
                                                <td>
                                                  <p className="col fs-6">
                                                    {data.websiteName
                                                      ? data.websiteName
                                                      : "N.A"}
                                                  </p>
                                                </td>
                                              </tr>
                                            );
                                          })}
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <h1 className="text-center">
                                    No Transaction Found
                                  </h1>
                                )}
                              </tbody>
                            </table>
                          </small>
                          <Pagination
                            handlePage={selectPageHandler}
                            page={page}
                            totalPage={lastPage}
                            totalData={documentView.length}
                            perPagePagination={10}
                          />
                        </>
                      ) : (
                        <>
                          <small>
                            <table class="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl w-auto">
                              <thead className="table-success">
                                <tr
                                  align="center"
                                  bgcolor="green"
                                  className="fs-6"
                                >
                                  <th scope="col fs-6" className="text-primary">
                                    Date <br />&<br /> Time
                                  </th>
                                  <th
                                    scope="col  fs-6"
                                    className="text-primary"
                                  >
                                    Amount
                                  </th>
                                  <th
                                    scope="col  fs-6"
                                    className="text-primary"
                                  >
                                    Transaction Id
                                  </th>
                                  <th
                                    scope="col  fs-6"
                                    className="text-primary"
                                  >
                                    Transaction Type
                                  </th>
                                  <th scope="col fs-6" className="text-primary">
                                    Gateway
                                  </th>
                                  <th scope="col fs-6" className="text-primary">
                                    CreatedBy
                                  </th>

                                  <th scope="col" className="text-primary">
                                    Bank
                                  </th>
                                  <th scope="col" className="text-primary">
                                    Website
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {documentFilter.length > 0 ? (
                                  <>
                                    {page === lastFilterPageReminder ? (
                                      <>
                                        {lastPage === 1 ? (
                                          <>
                                            {documentFilter
                                              .slice(page * 10 - 10, page * 10)
                                              .map((data) => {
                                                return (
                                                  <tr
                                                    align="center"
                                                    className="fs-6"
                                                  >
                                                    <td>
                                                      {" "}
                                                      {new Date(
                                                        data.createdAt
                                                      ).toLocaleString(
                                                        "default"
                                                      )}{" "}
                                                    </td>

                                                    <td className="">
                                                      <p
                                                        className={`col fs-6 text-break ${
                                                          data.transactionType.includes(
                                                            "Manual-Website-Withdraw"
                                                          ) ||
                                                          data.transactionType.includes(
                                                            "Manual-Bank-Withdraw"
                                                          ) ||
                                                          data.transactionType ===
                                                            "Withdraw"
                                                            ? "text-red"
                                                            : "text-green"
                                                        }`}
                                                      >
                                                        {data.amount && (
                                                          <p className="col fs-6">
                                                            {data.amount}
                                                          </p>
                                                        )}
                                                        {data.depositAmount && (
                                                          <p className="col fs-6">
                                                            {data.depositAmount}
                                                          </p>
                                                        )}
                                                        {data.withdrawAmount && (
                                                          <p className="col fs-6">
                                                            {
                                                              data.withdrawAmount
                                                            }
                                                          </p>
                                                        )}
                                                      </p>
                                                    </td>

                                                    <td>
                                                      {data.transactionID && (
                                                        <p className="col fs-6 ">
                                                          {data.transactionID}
                                                        </p>
                                                      )}
                                                      {data.depositAmount && (
                                                        <p className="col fs-6 ">
                                                          N.A
                                                        </p>
                                                      )}
                                                      {data.withdrawAmount && (
                                                        <p className="col fs-6 ">
                                                          N.A
                                                        </p>
                                                      )}
                                                    </td>
                                                    <td>
                                                      {data?.transactionType && (
                                                        <p
                                                          className={`col fs-6 text-break ${
                                                            data.transactionType.includes(
                                                              "Manual-Website-Withdraw"
                                                            ) ||
                                                            data.transactionType.includes(
                                                              "Manual-Bank-Withdraw"
                                                            ) ||
                                                            data.transactionType ===
                                                              "Withdraw"
                                                              ? "text-red"
                                                              : "text-green"
                                                          }`}
                                                        >
                                                          {data.transactionType}
                                                        </p>
                                                      )}
                                                    </td>
                                                    <td>
                                                      {data.paymentMethod && (
                                                        <p className="col fs-6">
                                                          {data.paymentMethod}
                                                        </p>
                                                      )}
                                                      {data.depositAmount && (
                                                        <p className="col fs-6 ">
                                                          N.A
                                                        </p>
                                                      )}
                                                      {data.withdrawAmount && (
                                                        <p className="col fs-6 ">
                                                          N.A
                                                        </p>
                                                      )}
                                                    </td>
                                                    <td>{data.subAdminName}</td>

                                                    <td>
                                                      <p className="col fs-6">
                                                        {data.bankName
                                                          ? data.bankName
                                                          : "N.A"}
                                                      </p>
                                                    </td>
                                                    <td>
                                                      <p className="col fs-6">
                                                        {data.websiteName
                                                          ? data.websiteName
                                                          : "N.A"}
                                                      </p>
                                                    </td>
                                                  </tr>
                                                );
                                              })}
                                          </>
                                        ) : (
                                          <>
                                            {documentFilter
                                              .slice(
                                                page * 10 - 10,
                                                page * 10 - 10 + filterReminder
                                              )
                                              .map((data) => {
                                                return (
                                                  <tr
                                                    align="center"
                                                    className="fs-6"
                                                  >
                                                    <td>
                                                      {" "}
                                                      {new Date(
                                                        data.createdAt
                                                      ).toLocaleString(
                                                        "default"
                                                      )}{" "}
                                                    </td>

                                                    <td className="">
                                                      <p
                                                        className={`col fs-6 text-break ${
                                                          data.transactionType.includes(
                                                            "Manual-Website-Withdraw"
                                                          ) ||
                                                          data.transactionType.includes(
                                                            "Manual-Bank-Withdraw"
                                                          ) ||
                                                          data.transactionType ===
                                                            "Withdraw"
                                                            ? "text-red"
                                                            : "text-green"
                                                        }`}
                                                      >
                                                        {data.amount && (
                                                          <p className="col fs-6">
                                                            {data.amount}
                                                          </p>
                                                        )}
                                                        {data.depositAmount && (
                                                          <p className="col fs-6">
                                                            {data.depositAmount}
                                                          </p>
                                                        )}
                                                        {data.withdrawAmount && (
                                                          <p className="col fs-6">
                                                            {
                                                              data.withdrawAmount
                                                            }
                                                          </p>
                                                        )}
                                                      </p>
                                                    </td>

                                                    <td>
                                                      {data.transactionID && (
                                                        <p className="col fs-6 ">
                                                          {data.transactionID}
                                                        </p>
                                                      )}
                                                      {data.depositAmount && (
                                                        <p className="col fs-6 ">
                                                          N.A
                                                        </p>
                                                      )}
                                                      {data.withdrawAmount && (
                                                        <p className="col fs-6 ">
                                                          N.A
                                                        </p>
                                                      )}
                                                    </td>
                                                    <td>
                                                      {data?.transactionType && (
                                                        <p
                                                          className={`col fs-6 text-break ${
                                                            data.transactionType.includes(
                                                              "Manual-Website-Withdraw"
                                                            ) ||
                                                            data.transactionType.includes(
                                                              "Manual-Bank-Withdraw"
                                                            ) ||
                                                            data.transactionType ===
                                                              "Withdraw"
                                                              ? "text-red"
                                                              : "text-green"
                                                          }`}
                                                        >
                                                          {data.transactionType}
                                                        </p>
                                                      )}
                                                    </td>
                                                    <td>
                                                      {data.paymentMethod && (
                                                        <p className="col fs-6">
                                                          {data.paymentMethod}
                                                        </p>
                                                      )}
                                                      {data.depositAmount && (
                                                        <p className="col fs-6 ">
                                                          N.A
                                                        </p>
                                                      )}
                                                      {data.withdrawAmount && (
                                                        <p className="col fs-6 ">
                                                          N.A
                                                        </p>
                                                      )}
                                                    </td>
                                                    <td>{data.subAdminName}</td>

                                                    <td>
                                                      <p className="col fs-6">
                                                        {data.bankName
                                                          ? data.bankName
                                                          : "N.A"}
                                                      </p>
                                                    </td>
                                                    <td>
                                                      <p className="col fs-6">
                                                        {data.websiteName
                                                          ? data.websiteName
                                                          : "N.A"}
                                                      </p>
                                                    </td>
                                                  </tr>
                                                );
                                              })}
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {documentFilter
                                          .slice(page * 10 - 10, page * 10)
                                          .map((data) => {
                                            return (
                                              <tr
                                                align="center"
                                                className="fs-6"
                                              >
                                                <td>
                                                  {" "}
                                                  {new Date(
                                                    data.createdAt
                                                  ).toLocaleString(
                                                    "default"
                                                  )}{" "}
                                                </td>

                                                <td className="">
                                                  <p
                                                    className={`col fs-6 text-break ${
                                                      data.transactionType.includes(
                                                        "Manual-Website-Withdraw"
                                                      ) ||
                                                      data.transactionType.includes(
                                                        "Manual-Bank-Withdraw"
                                                      ) ||
                                                      data.transactionType ===
                                                        "Withdraw"
                                                        ? "text-red"
                                                        : "text-green"
                                                    }`}
                                                  >
                                                    {data.amount && (
                                                      <p className="col fs-6">
                                                        {data.amount}
                                                      </p>
                                                    )}
                                                    {data.depositAmount && (
                                                      <p className="col fs-6">
                                                        {data.depositAmount}
                                                      </p>
                                                    )}
                                                    {data.withdrawAmount && (
                                                      <p className="col fs-6">
                                                        {data.withdrawAmount}
                                                      </p>
                                                    )}
                                                  </p>
                                                </td>

                                                <td>
                                                  {data.transactionID && (
                                                    <p className="col fs-6 ">
                                                      {data.transactionID}
                                                    </p>
                                                  )}
                                                  {data.depositAmount && (
                                                    <p className="col fs-6 ">
                                                      N.A
                                                    </p>
                                                  )}
                                                  {data.withdrawAmount && (
                                                    <p className="col fs-6 ">
                                                      N.A
                                                    </p>
                                                  )}
                                                </td>
                                                <td>
                                                  {data?.transactionType && (
                                                    <p
                                                      className={`col fs-6 text-break ${
                                                        data.transactionType.includes(
                                                          "Manual-Website-Withdraw"
                                                        ) ||
                                                        data.transactionType.includes(
                                                          "Manual-Bank-Withdraw"
                                                        ) ||
                                                        data.transactionType ===
                                                          "Withdraw"
                                                          ? "text-red"
                                                          : "text-green"
                                                      }`}
                                                    >
                                                      {data.transactionType}
                                                    </p>
                                                  )}
                                                </td>
                                                <td>
                                                  {data.paymentMethod && (
                                                    <p className="col fs-6">
                                                      {data.paymentMethod}
                                                    </p>
                                                  )}
                                                  {data.depositAmount && (
                                                    <p className="col fs-6 ">
                                                      N.A
                                                    </p>
                                                  )}
                                                  {data.withdrawAmount && (
                                                    <p className="col fs-6 ">
                                                      N.A
                                                    </p>
                                                  )}
                                                </td>
                                                <td>{data.subAdminName}</td>

                                                <td>
                                                  <p className="col fs-6">
                                                    {data.bankName
                                                      ? data.bankName
                                                      : "N.A"}
                                                  </p>
                                                </td>
                                                <td>
                                                  <p className="col fs-6">
                                                    {data.websiteName
                                                      ? data.websiteName
                                                      : "N.A"}
                                                  </p>
                                                </td>
                                              </tr>
                                            );
                                          })}
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <h1 className="text-center">
                                    No Transaction Found
                                  </h1>
                                )}
                              </tbody>
                            </table>
                          </small>
                          <Pagination
                            handlePage={selectPageHandler}
                            page={page}
                            totalPage={filterLastPage}
                            totalData={documentFilter.length}
                            perPagePagination={10}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndividualNetwork;
