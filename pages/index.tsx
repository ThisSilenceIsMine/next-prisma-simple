import UserModal from "components/userModal";
import { GetServerSideProps } from "next";
import "semantic-ui-css/semantic.min.css";
import { Tab, Container, Button } from "semantic-ui-react";
import { ContactsList } from "../components/contactsList";
import prisma from "@lib/prisma";

const mockContacts = [
    { name: "Emil", phone: "+380984686733", isFavorite: true },
    { name: "Ivan", phone: "+380984686733", isFavorite: false },
    { name: "Alex", phone: "+380984686733", isFavorite: true },
    { name: "Anton", phone: "+380984686733", isFavorite: false },
];

export default function Home({ persons }) {
    const panes = [
        {
            menuItem: "Contacts",
            render: () => {
                return (
                    <>
                        <UserModal
                            trigger={<Button>Add</Button>}
                            edit={false}
                        />
                        <ContactsList contacts={persons} />
                    </>
                );
            },
        },
        {
            menuItem: "Favorites",
            render: () => (
                <ContactsList contacts={persons.filter((x) => x.isFavorite)} />
            ),
        },
    ];

    return (
        <Container>
            <Tab panes={panes}></Tab>
        </Container>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const persons = await prisma.person.findMany({});
    // console.log(`persons`, persons);
    return {
        props: {
            persons,
        },
    };
};
