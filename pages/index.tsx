import { GetServerSideProps } from "next";
import "semantic-ui-css/semantic.min.css";
import { Tab, Container } from "semantic-ui-react";
import { ContactsList } from "../components/contactsList";

const panes = [
    {
        menuItem: "Contacts",
        render: () => <ContactsList contacts={mockContacts} />,
    },
    {
        menuItem: "Favorites",
        render: () => (
            <ContactsList contacts={mockContacts.filter((x) => x.isFavorite)} />
        ),
    },
];

const mockContacts = [
    { name: "Emil", phone: "+380984686733", isFavorite: true },
    { name: "Ivan", phone: "+380984686733", isFavorite: false },
    { name: "Alex", phone: "+380984686733", isFavorite: true },
    { name: "Anton", phone: "+380984686733", isFavorite: false },
];

export default function Home() {
    return (
        <Container>
            <Tab panes={panes}></Tab>
        </Container>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            label: "hi",
        },
    };
};
