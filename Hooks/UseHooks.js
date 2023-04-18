import { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import { ModalComponent } from "./../Components/General/Modal";

export const UseContacts = () => {
  const [contacts, setContacts] = useState([]);

  const mapContactToUser = (contact) => {
    return {
      contactName:
        contact.firstName && contact.lastName
          ? `${contact.firstName} ${contact.lastName}`
          : contact.firstName,
      email: contact.emails[0].email,
    };
  };

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if ((status = "denied")) {
        <ModalComponent message={"Failed permission"} buttonMessage={"OK!"} />;
      }
      if ((status = "granted")) {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });
        if (data.length > 0) {
          setContacts(
            data
              .filter(
                (value) =>
                  value.firstName &&
                  value.emails &&
                  value.emails[0] &&
                  value.emails[0].email
              )
              .map(mapContactToUser(data))
          );
        }
      }
    })();
  }, []);


  return contacts
};
