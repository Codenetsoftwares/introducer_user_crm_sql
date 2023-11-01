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


    const handleStartDatevalue = (e) => {
        SetStartDatesetValue(moment(e));
    };

    const handleEndDatevalue = (e) => {
        setEndDateValue(moment(e));
    };

    const handleFilter = () => {

    }

    const handleReset = () => {

    }
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
                        {documentView && <CSVLink data={documentView} className="btn btn-success">
                            Download Data
                        </CSVLink>}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeeklyReport;