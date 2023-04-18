import { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import { ModalComponent } from "./../Components/General/Modal";

export const UseContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status = "denied") {
        <ModalComponent message={"Failed permission"} buttonMessage={"OK!"} />;
      }
      if(status="granted"){
        
      }

    })();
  }, []);
};
