import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ContactsContext, ApiBase } from "../../App";
import MainContent from "./MainContent";

function ContactDetails() {
  const { contacts, updateContacts } = useContext(ContactsContext);

  const { id } = useParams();
  const contact = contacts.find((c) => c.id == id);
  const navigate = useNavigate();

  if (!contact) return <p>Failed to find a contact with that ID!</p>;
  const handleDelete = (event) => {
    event.preventDefault();
    fetch(ApiBase + `/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete contact!");
        return res.text();
      })
      .then((data) => {
        console.log("Successfully deleted data: ", data);
        updateContacts();
        navigate("/");
      });
  };

  return (
    <MainContent title={`${contact.firstName} ${contact.lastName}`}>
      <p>Gender: {`${contact.gender}`}</p>
      <p>Job Title: {`${contact.jobTitle}`}</p>
      <p>Address: {`${contact.street}, ${contact.city}`}</p>
      <div className="buttons">
        <button
          className="fancy"
          onClick={() => {
            navigate(`/contact/${id}/edit`);
          }}
        >
          Edit Contact
        </button>
        <button className="delete fancy" onClick={handleDelete}>
          Delete Contact
        </button>
      </div>
    </MainContent>
  );
}

export default ContactDetails;
