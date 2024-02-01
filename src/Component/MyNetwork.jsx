import React, { useEffect, useState } from "react";
import AccountsService from "../Services/AccountsService";
import { useAuth } from "../Utils/Auth";
import { Link, useParams } from "react-router-dom";

const MyNetwork = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [network, setNetwork] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    // Fetch data from the server
    AccountsService.getIntroducerUser(auth.user.id, auth.user)
      .then((res) => {
        console.log(res.data);
        setNetwork(res.data);
      })
      .catch((error) => {
        console.error("Error fetching network data:", error);
      });
  }, [auth.user.id, auth.user]);

  // Filter the network based on the search query
  const filteredNetwork = network.filter((userDetails) =>
    userDetails.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <form className="form-inline my-2 my-lg-0 d-flex justify-content-center">
        <input
          className="form-control mr-sm-2 w-50"
          type="search"
          placeholder="Search by Username"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <div class="container table-responsive-md table-responsive-md table-responsive-lg table-responsive-xl">
        <table className="table table-bordered table-sm mt-2 ">
          <thead>
            <tr className="table-warning">
              <th scope="col">#</th>
              <th scope="col">UserName</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
            {filteredNetwork.map((userDetails, i) => (
              <tr key={userDetails._id}>
                <th scope="row">{i + 1}</th>
                <td>{userDetails.userName}</td>
                <td>
                  <Link to={`/individualNetwork/${userDetails._id}`}>
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyNetwork;
