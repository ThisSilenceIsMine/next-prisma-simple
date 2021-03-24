import { Contact } from "@lib/types";
import { useState } from "react";
import { mutate } from "swr";
import { Container, Modal } from "semantic-ui-react";
// import useSWR from "swr";
import UserForm, { Form } from "./userForm";

const URL = "http://localhost:3000/api/users";

interface Props {
    trigger: JSX.Element;
    edit: boolean;
    person?: Contact;
}

const UserModal = ({ trigger, edit, person }: Props) => {
    const [open, setOpen] = useState(false);
    const onSubmit = async (data: Form) => {
        // console.log(`JSON.stringify(data)`, JSON.stringify(data));
        if (edit) {
            if (!person) {
                return;
            }

            fetch(URL, {
                method: "PUT",
                body: JSON.stringify({ ...person, ...data }),
            }).then((res) => console.log(res.json()));
            mutate("/api/users");
        } else {
            fetch(URL, {
                method: "POST",
                body: JSON.stringify(data),
            }).then((res) => console.log(res.json()));
            mutate("/api/users");
        }

        setOpen(false);
    };

    return (
        <>
            <Modal
                onClose={() => {
                    setOpen(false);
                }}
                onOpen={() => {
                    setOpen(true);
                }}
                open={open}
                trigger={trigger}
            >
                <UserForm
                    onSubmit={onSubmit}
                    firstName={person?.firstName}
                    lastName={person?.lastName}
                    phoneNumber={person?.phoneNumber}
                />
            </Modal>
        </>
    );
};

export default UserModal;
