import React, { useEffect, useState } from 'react'
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { CSVLink } from "react-csv";
import DatePicker from "react-datepicker";

const WeeklyReport = () => {
    const [startDatevalue, SetStartDatesetValue] = useState(new Date() - 1 * 24 * 60 * 60 * 1000);
    const [endDatevalue, setEndDateValue] = useState(new Date());
    const [documentView, setDocumentView] = useState([]);


    useEffect((() => {
        TransactionService.getIntroducerUserData(auth.user.userName, auth.user).then((res) => (setDocumentView(res.data.transaction), setAccountView(res.data.transaction))).catch((err) => (setDocumentView([])))
    }), [auth])
    console.log("====>", documentView)

    const handleStartDatevalue = (e) => {
        SetStartDatesetValue(moment(e));
    };

    const handleEndDatevalue = (e) => {
        setEndDateValue(moment(e));
    };

    const handleFilter = () => {
        const sdate = moment(startDatevalue).toDate();
        const edate = moment(endDatevalue).toDate();
        sdate.setHours(0, 0, 0);
        edate.setHours(23, 59, 59);
        console.log("==>", sdate, "===>", edate)
        let filteredDocuments = documentView.filter((data) => {
            const transactionDate = new Date(data.createdAt);
            return transactionDate >= sdate && transactionDate <= edate;
        });
        setDocumentView(filteredDocuments)

    }

    const handleReset = () => {
        SetStartDatesetValue(new Date());
        setEndDateValue(new Date())
        setDocumentView(accountView)
    }
    console.log(documentView)



    return (
        <div
            className="card card-body rounded-1 "
            style={{ backgroundColor: '#fff4ec' }}
        >
            <h2 className='text-center' style={{ marginBottom: "3rem" }}>WEEKLY REPORT</h2>
            <div className="row row-cols-4 row-cols-lg-4 g-2 g-lg-3 w-100 " style={{ paddingLeft: '5rem' }} >
                <div className="d-flex col justify-content-center ">
                    <h6 className="fw-bold text-nowrap pt-2 pr-2"> Start Date</h6>
                    <Datetime
                        value={startDatevalue}
                        onChange={handleStartDatevalue}
                        dateFormat="DD-MM-YYYY"
                        timeFormat={false}
                    />
                </div>
                <div className="d-flex col  justify-content-center">
                    <h6 className="fw-bold text-nowrap pt-2 pr-2"> End Date</h6>
                    <Datetime
                        value={endDatevalue}
                        onChange={handleEndDatevalue}
                        dateFormat="DD-MM-YYYY"
                        timeFormat={false}
                    />
                </div>
                <div className="d-flex col justify-content-center">
                    <div className="mx-2">
                        <button
                            type="button"
                            className="btn btn-dark"
                            onClick={handleFilter}
                        >
                            Filter
                        </button>
                    </div>
                    <div className="mx-2">
                        <button
                            type="button"
                            className="btn btn-dark"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    </div>
                    <div className="mx-2">
                        {documentView && <CSVLink data={flattenedData} className="btn btn-success">
                            Download Data
                        </CSVLink>}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeeklyReport;