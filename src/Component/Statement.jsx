import React, { useState, useEffect } from 'react'
import { useAuth } from "../Utils/Auth";
import TransactionService from '../Services/TransactionService';

const Statement = () => {
    const auth = useAuth();
    const id = auth.user.id;
    const [FoundObject, setFoundObject] = useState([]);


    useEffect(() => {
        TransactionService.getIntroducerSingleUser(id, auth.user).then((res) => setFoundObject(res.data));
    }, [auth, id]);

    console.log("This is Balance=>>>", FoundObject);

    return (
        <div style={{ backgroundColor: 'white'}}>
            <div class="d-flex justify-content-center">
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
                        {FoundObject.length > 0 ? (
                            FoundObject.map((data, i) => {
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
            </div>
        </div>
    )
}

export default Statement