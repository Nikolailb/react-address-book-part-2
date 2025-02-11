import { useContext } from "react";

import MainContent from "./MainContent";
import { ContactsContext } from "../../App";

import { Link } from "react-router-dom";

function ContactList() {
  const { contacts } = useContext(ContactsContext);
  return (
    <MainContent title="Contacts">
      <ul className="common-list" id="contacts-list">
        {contacts.map((el) => {
          return (
            <li key={el.id}>
              <p>{`${el.firstName} ${el.lastName}`}</p>
              <p>
                <Link to={`/contact/${el.id}`}>View</Link>
              </p>
            </li>
          );
        })}
      </ul>
    </MainContent>
  );
}

export default ContactList;
