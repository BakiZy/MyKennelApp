import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Layout from "../components/UI/Layout";

const AdminPage = (props) => {
  const [roles, setRoles] = useState([]);
  const [roleForm, setRoleForm] = useState({
    id: "",
    name: "",
  });

  const roleInputRef = useRef();
  useEffect(() => {
    axios
      .get("https://localhost:44373/api/Admin/allroles")
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
  }, []);

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
