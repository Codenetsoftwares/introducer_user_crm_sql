import React, { useEffect, useState } from 'react'
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { CSVLink } from "react-csv";
import TransactionService from '../../Services/TransactionService';
import { useAuth } from '../../Utils/Auth';

const WeeklyReport = () => {
    const auth = useAuth();
    const [startDatevalue, SetStartDatesetValue] = useState(new Date());
    const [endDatevalue, setEndDateValue] = useState(new Date());
    const [documentView, setDocumentView] = useState([]);
    const [accountView, setAccountView] = useState([]);


    useEffect((() => {
        TransactionService.getIntroducerUserData(auth.user.userName, auth.user).then((res) => (setDocumentView(res.data.transaction), setAccountView(res.data.transaction))).catch((err) => (setDocumentView([])))
    }), [auth])

    console.log(documentView)
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
        <div className="modal fade" id="weeklyreport" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">WEEKLY REPORT</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='mb-2'>
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
                            {/* <div className="mx-2">
                                {documentView && <CSVLink data={documentView} className="btn btn-success">
                                    Download Data
                                </CSVLink>}

                            </div> */}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <div data-bs-dismiss="modal">
                            {documentView && <CSVLink data={documentView} className="btn btn-primary">
                                Download Data
                            </CSVLink>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeeklyReport;