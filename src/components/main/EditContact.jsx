import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ApiBase, ContactsContext } from "../../App";
import MainContent from "./MainContent";

const initialData = {
  firstName: "",
  lastName: "",
  gender: "",
  street: "",
  city: "",
};

function EditContact() {
  const [formData, setFormData] = useState(initialData);
  const { id } = useParams();
  const { contacts, updateContacts } = useContext(ContactsContext);
  const contact = contacts.find((el) => el.id == id);
  const navigate = useNavigate();
  useEffect(() => {
    if (contact == null) return;
    setFormData({
      firstName: contact.firstName,
      lastName: contact.lastName,
      gender: contact.gender,
      street: contact.street,
      city: contact.city,
    });
  }, [contact]);
  if (contact == null) return <p>Failed to load contact...</p>;
  const fullName = `${contact.firstName} ${contact.lastName}`;

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
    fetch(ApiBase + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res) {
          throw new Error("Failed to update contact!");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Updated contact: ", data);
        updateContacts();
        navigate("/contact/" + id);
      });
  };

  return (
    <MainContent title={`Editing: "${fullName}"`}>
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
        <input className="fancy" type="submit" value="Save changes" />
      </form>
    </MainContent>
  );
}

export default EditContact;
