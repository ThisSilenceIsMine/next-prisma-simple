import React from "react";
import { Button, Icon, List } from "semantic-ui-react";

interface Contact {
    name: string;
    phone: string;
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
                    <List.Item key={contact.name}>
                        <List.Content floated="left">
                            <List.Header>{contact.name}</List.Header>
                            <List.Description>{contact.phone}</List.Description>
                        </List.Content>
                        <List.Content floated="right">
                            <Button circular icon>
                                <Icon
                                    inverted={!contact.isFavorite}
                                    name="favorite"
                                />
                            </Button>
                            <Button circular icon="edit" />
                            <Button circular icon="delete" />
                        </List.Content>
                    </List.Item>
                );
            })}
        </List>
    );
};
