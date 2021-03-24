import React from "react";
import { List } from "semantic-ui-react";
import Contact from "./ContactItem";

interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    isFavorite: boolean;
}

interface Props {
    contacts: Contact[];
}

export const ContactsList = ({ contacts }: Props) => {
    return (
        <List divided relaxed>
            {contacts.map((contact) => {
                return (
                    <List.Item key={contact.id}>
                        <Contact contact={contact} />
                    </List.Item>
                );
            })}
        </List>
    );
};
