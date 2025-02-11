import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ApiBase, ContactsContext } from "../../App";
import MainContent from "./MainContent";

const initialData = {
  firstName: "",
  lastName: "",
  gender: "",
  jobTitle: "",
  street: "",
  city: "",
};

function CreateContact() {
  const [formData, setFormData] = useState(initialData);
  const { updateContacts } = useContext(ContactsContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      let tempData = formData[name].filter((v) => v != value);
      if (event.target.checked) {
        tempData.push(value);
      }
      setFormData({ ...formData, [name]: tempData });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(ApiBase, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res) {
          throw new Error("Failed to create contact!");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Created contact: ", data);
        updateContacts();
        navigate("/contact/" + data.id);
      });
  };

  return (
    <MainContent title="Creating contact:">
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <label htmlFor="gender">Gender:</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
        <label htmlFor="jobTitle">Job Title:</label>
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
        />
        <label htmlFor="street">Street:</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />
        <label htmlFor="city">City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <input className="fancy" type="submit" value="Create contact" />
      </form>
    </MainContent>
  );
}

export default CreateContact;
