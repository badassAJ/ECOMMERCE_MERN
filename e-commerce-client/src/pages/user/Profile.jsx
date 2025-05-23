import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axiosIns from "../../utils/axios.jsx";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { auth, setAuth } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  //get user data
  useEffect(() => {
    if(auth?.user){
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosIns.put(`/api/v1/auth/profile`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Profile"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="register-container">
              <div className="register-form-box">
                <h2 className="register-title">USER PROFILE</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-4">
                    <label htmlFor="exampleInputName">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control large-input"
                      id="exampleInputName"
                      placeholder="Enter full name"
                      
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="exampleInputEmail">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control large-input"
                      id="exampleInputEmail"
                      placeholder="Enter email"
                      disabled
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control large-input"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="exampleInputPhone">Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control large-input"
                      id="exampleInputPhone"
                      placeholder="Enter phone number"
                      
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="exampleInputAddress">Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control large-input"
                      id="exampleInputAddress"
                      placeholder="Enter address"
                      
                    />
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn">
                    UPDATE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
