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
  const [startDatevalue, SetStartDatesetValue] = useState(
    moment().subtract(1, "days").toDate()
  );
  const [endDatevalue, setEndDateValue] = useState(new Date());
  const [toggle, setToggle] = useState(true);
  const [documentView, setDocumentView] = useState([]);
  const [select, setSelect] = useState("");
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const pageLimit = 10;

  useEffect(() => {
    const formattedStartDate = moment(
      startDatevalue,
      "DD-MM-YYYY HH:mm"
    ).format("YYYY-MM-DD");
    const formattedEndDate = moment(endDatevalue, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD"
    );

    AccountsService.getIntroducerSingleUser(
      auth.user,
      id,
      page,
      pageLimit,
      select,
      formattedStartDate,
      formattedEndDate
    ).then((res) => {
      setSingleData(res.data?.data);
      setDocumentView(res.data?.data?.transactionDetail);
      setTotalData(res?.data?.pagination?.totalItems);
      setTotalPage(res?.data?.pagination?.totalPages);
    });
  }, [auth.user, id, page, startDatevalue, endDatevalue, select]);

  const startIndex = Math.min((page - 1) * pageLimit + 1);
  const endIndex = Math.min(page * pageLimit, totalData);

  const handleReset = () => {
    setSelect("");
    setToggle(true);
    SetStartDatesetValue(moment().subtract(1, "days").toDate());
    setEndDateValue(new Date());
  };

  const handleStartDatevalue = (e) => {
    SetStartDatesetValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  const handleEndDatevalue = (e) => {
    setEndDateValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

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
                          {user?.firstname} {user?.lastname}
                        </h4>
                        <div class="text-left">
                          <p class="text-secondary mb-1 text-capitalize">
                            Username:&nbsp;{user?.userName}&nbsp;
                          </p>

                          <p class="text-secondary mb-1 text-capitalize">
                            Role:&nbsp;{user?.role}&nbsp;
                          </p>
                          <p class="text-secondary mb-1 text-capitalize">
                            Wallet:&nbsp;{user?.wallet}&nbsp;
                          </p>
                          <p class="text-secondary mb-1 text-capitalize">
                            Introducer Username:&nbsp;
                            {user?.matchedIntroducersUserName}
                            &nbsp;
                          </p>
                          <p class="text-secondary mb-1 text-capitalize">
                            Introducer Percentage:&nbsp;
                            {user?.introducerPercentage === null
                              ? 0
                              : user?.introducerPercentage}
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
                          style={{
                            boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
                            border: "0.5px solid black",
                            borderRadius: "6px",
                          }}
                          onChange={(e) => setSelect(e.target.value)}
                        >
                          <option className="d-flex" value="">
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
                            onClick={handleReset}
                          >
                            Reset
                          </button>
                        </div>
                        <div className="mx-2">
                          <div className="mx-2">
                            <CSVLink
                              data={documentView}
                              className="btn btn-success"
                            >
                              Download Data
                            </CSVLink>
                          </div>
                        </div>
                      </div>
                      <small>
                        <table class="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl w-auto">
                          <thead className="table-success">
                            <tr align="center" bgcolor="green" className="fs-6">
                              <th scope="col fs-6" className="text-primary">
                                Date <br />&<br /> Time
                              </th>
                              <th scope="col  fs-6" className="text-primary">
                                Amount
                              </th>
                              <th scope="col  fs-6" className="text-primary">
                                Transaction Id
                              </th>
                              <th scope="col  fs-6" className="text-primary">
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
                                {documentView.map((data) => {
                                  return (
                                    <tr align="center" className="fs-6">
                                      <td>
                                        {" "}
                                        {new Date(
                                          data?.createdAt
                                        ).toLocaleString("default")}{" "}
                                      </td>

                                      <td className="">
                                        <p
                                          className={`col fs-6 text-break ${
                                            data?.transactionType.includes(
                                              "Manual-Website-Withdraw"
                                            ) ||
                                            data?.transactionType.includes(
                                              "Manual-Bank-Withdraw"
                                            ) ||
                                            data?.transactionType === "Withdraw"
                                              ? "text-red"
                                              : "text-green"
                                          }`}
                                        >
                                          {data?.amount && (
                                            <p className="col fs-6">
                                              {data?.amount}
                                            </p>
                                          )}
                                          {data?.depositAmount && (
                                            <p className="col fs-6">
                                              {data?.depositAmount}
                                            </p>
                                          )}
                                          {data?.withdrawAmount && (
                                            <p className="col fs-6">
                                              {data?.withdrawAmount}
                                            </p>
                                          )}
                                        </p>
                                      </td>

                                      <td>
                                        {data?.transactionID && (
                                          <p className="col fs-6 ">
                                            {data?.transactionID}
                                          </p>
                                        )}
                                        {data?.depositAmount && (
                                          <p className="col fs-6 ">N.A</p>
                                        )}
                                        {data?.withdrawAmount && (
                                          <p className="col fs-6 ">N.A</p>
                                        )}
                                      </td>
                                      <td>
                                        {data?.transactionType && (
                                          <p
                                            className={`col fs-6 text-break ${
                                              data?.transactionType.includes(
                                                "Manual-Website-Withdraw"
                                              ) ||
                                              data?.transactionType.includes(
                                                "Manual-Bank-Withdraw"
                                              ) ||
                                              data?.transactionType ===
                                                "Withdraw"
                                                ? "text-red"
                                                : "text-green"
                                            }`}
                                          >
                                            {data?.transactionType}
                                          </p>
                                        )}
                                      </td>
                                      <td>
                                        {data?.paymentMethod && (
                                          <p className="col fs-6">
                                            {data?.paymentMethod}
                                          </p>
                                        )}
                                        {data?.depositAmount && (
                                          <p className="col fs-6 ">N.A</p>
                                        )}
                                        {data?.withdrawAmount && (
                                          <p className="col fs-6 ">N.A</p>
                                        )}
                                      </td>
                                      <td>{data?.subAdminName}</td>

                                      <td>
                                        <p className="col fs-6">
                                          {data?.bankName
                                            ? data?.bankName
                                            : "N.A"}
                                        </p>
                                      </td>
                                      <td>
                                        <p className="col fs-6">
                                          {data?.websiteName
                                            ? data?.websiteName
                                            : "N.A"}
                                        </p>
                                      </td>
                                    </tr>
                                  );
                                })}
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
                        currentPage={page}
                        totalPages={totalPage}
                        handlePageChange={selectPageHandler}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        totalData={totalData}
                      />
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
