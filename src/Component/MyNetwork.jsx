import React, { useEffect, useState } from 'react'
import AccountsService from '../Services/AccountsService';
import { useAuth } from '../Utils/Auth';
import { Link, useParams } from 'react-router-dom';

const MyNetwork = () => {
    const { id } = useParams()
    const [network, setNetwork] = useState([]);
    const auth = useAuth();
    console.log("first",id)
    useEffect(() => {
        AccountsService.getIntroducerUser(id, auth.user)
            .then((res) => {
                console.log(res.data)
                setNetwork(res.data)
            })
    }, [auth.user])

    return (
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        network.map((userDetails, i) => {
                            return (
                                <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{userDetails.firstname} {userDetails.lastname}</td>
                                    <td><Link to={`/mynetworks/${userDetails._id}`}>Details</Link></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default MyNetwork