import React, { useEffect, useState } from "react";
import AccountsService from "../Services/AccountsService";
import { useAuth } from "../Utils/Auth";
import { Link, useNavigate } from "react-router-dom";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import TransactionService from "../Services/TransactionService";
import { CSVLink } from "react-csv";
import Pagination from "./Pagination";

const Statement = () => {
  const auth = useAuth();
  const id = auth?.user.introId;
  const [documentView, setDocumentView] = useState([]);
  const [startDatevalue, SetStartDatesetValue] = useState(
    moment().subtract(1, "days").toDate()
  );
  const [endDatevalue, setEndDateValue] = useState(new Date());
  const [select, setSelect] = useState("");
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const pageLimit = 10;

  console.log("select", select);

  const selectPageHandler = (selectedPage) => {
    console.log(selectedPage);
    setPage(selectedPage);
  };

  const startIndex = Math.min((page - 1) * pageLimit + 1);
  const endIndex = Math.min(page * pageLimit, totalData);

  useEffect(() => {
    const formattedStartDate = moment(
      startDatevalue,
      "DD-MM-YYYY HH:mm"
    ).format("YYYY-MM-DD");
    const formattedEndDate = moment(endDatevalue, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD"
    );

    TransactionService.getIntroducerSingleUser(
      auth.user,
      id,
      page,
      pageLimit,
      select,
      formattedStartDate,
      formattedEndDate
    ).then(
      (res) => (
        setDocumentView(res?.data?.data),
        setTotalData(res?.data?.pagination?.totalItems),
        setTotalPage(res?.data?.pagination?.totalPages)
      )
    );
  }, [auth, id, page, startDatevalue, endDatevalue, select]);

  const handleStartDatevalue = (e) => {
    SetStartDatesetValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  const handleEndDatevalue = (e) => {
    setEndDateValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  const handleReset = () => {
    SetStartDatesetValue(moment().subtract(1, "days").toDate());
    setEndDateValue(new Date());
    setSelect("All");
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
        </ul>
      </nav>
      <div className="d-flex  pt-3 justify-content-center">
        <h6 className="fw-bold text-nowrap pt-2">Transaction</h6>
        <select
          className="form-control mx-3 w-25"
          value={select || ""}
          autoComplete="off"
          style={{
            // boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
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
        <div className="mx-2"></div>
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
        <div className="mx-2">
          <CSVLink data={documentView} className="btn btn-success">
            Download Data
          </CSVLink>
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
        <small className="d-flex justify-content-center">
          {/* Normal View */}
          <table class="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl w-auto ">
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
                        {new Date(data?.createdAt).toLocaleString(
                          "default"
                        )}{" "}
                      </td>
                      <td>
                        {data?.amount && (
                          <p className="col fs-6">{data?.amount}</p>
                        )}
                        {data?.depositAmount && (
                          <p className="col fs-6">{data?.depositAmount}</p>
                        )}
                        {data?.withdrawAmount && (
                          <p className="col fs-6">{data?.withdrawAmount}</p>
                        )}
                      </td>

                      <td>
                        {data?.transactionType && (
                          <p className="col fs-6 text-break">
                            {data?.transactionType}
                          </p>
                        )}
                      </td>

                      <td>{data?.remarks}</td>
                    </tr>
                  );
                })
              ) : (
                <h1 className="text-center">No Transaction Found</h1>
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
  );
};

export default Statement;
