import UserModal from "components/userModal";
import { GetServerSideProps } from "next";
import "semantic-ui-css/semantic.min.css";
import { Tab, Container, Button } from "semantic-ui-react";
import { ContactsList } from "../components/contactsList";
import prisma from "@lib/prisma";
import useSWR from "swr";

const fetcher = (url) =>
    fetch(`http://localhost:3000${url}`).then((res) => res.json());

export default function Home({ persons }) {
    const { data, error } = useSWR("/api/users", fetcher, {
        initialData: persons,
    });

    const panes = [
        {
            menuItem: "Contacts",
            render: () => (
                <>
                    <UserModal trigger={<Button>Add</Button>} edit={false} />
                    <ContactsList contacts={data} />
                </>
            ),
        },
        {
            menuItem: "Favorites",
            render: () => (
                <ContactsList contacts={data.filter((x) => x.isFavorite)} />
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
