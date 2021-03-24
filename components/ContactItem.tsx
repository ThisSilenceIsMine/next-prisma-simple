import { Contact } from "@lib/types";
import React from "react";
import { Button, Icon, List } from "semantic-ui-react";
import UserModal from "./userModal";

interface Props {
    contact: Contact;
}

const URL = "http://localhost:3000/api/users";

const switchFavorite = async (contact: Contact) => {
    contact.isFavorite = !contact.isFavorite;
    console.log(contact);
    const res = await fetch(URL, {
        method: "PUT",
        body: JSON.stringify(contact),
    });

    const json = await res.json();
    console.log(json);
};

const ContactItem = ({ contact }: Props) => {
    return (
        <>
            <List.Content floated="left">
                <List.Header>{`${contact.firstName} ${contact.lastName}`}</List.Header>
                <List.Description>{contact.phoneNumber}</List.Description>
            </List.Content>
            <List.Content floated="right">
                <Button circular icon>
                    <Icon
                        inverted={!contact.isFavorite}
                        name="favorite"
                        onClick={() => switchFavorite(contact)}
                    />
                </Button>

                <UserModal
                    trigger={<Button circular icon="edit" />}
                    edit={true}
                />
                <Button circular icon="delete" />
            </List.Content>
        </>
    );
};

export default ContactItem;
