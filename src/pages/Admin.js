import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import Layout from "../components/UI/Layout";
import AuthContext from "../store/auth-context";

const AdminPage = (props) => {
  const [roles, setRoles] = useState([]);
  const [roleForm, setRoleForm] = useState({
    id: "",
    name: "",
  });
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const isAdmin = authContext.isAdmin;

  const roleInputRef = useRef();
  useEffect(() => {
    axios
      .get("https://localhost:44373/api/Admin/allroles", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        const loadedData = [];
        const roles = response.data;
        console.log(roles);

        for (const key in response.data) {
          loadedData.push({
            key: key,
            id: response.data[key].id,
            name: response.data[key].name,
          });
        }
        setRoles(loadedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [authContext.isAdmin]);

  const RolesList = () => {
    return (
      <select
        id="roleName"
        name="roleName"
        ref={roleInputRef}
        value={roleForm}
        onChange={(e) => setRoleForm(e.target.value)}
      >
        {roles.map((role) => (
          <option id={role.id} key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>
    );
  };

  return (
    <Layout>
      <RolesList />
    </Layout>
  );
};

export default AdminPage;
