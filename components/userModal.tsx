import { useState } from "react";
import { Container, Modal } from "semantic-ui-react";
// import useSWR from "swr";
import UserForm, { Form } from "./userForm";

const URL = "http://localhost:3000/api/users";

const UserModal = ({ trigger, edit }) => {
    const [open, setOpen] = useState(false);
    const onSubmit = async (data: Form) => {
        console.log(`JSON.stringify(data)`, JSON.stringify(data));
        if (edit) {
            fetch(URL, {
                method: "UPDATE",
                body: JSON.stringify(data),
            }).then((res) => console.log(res.json()));
        } else {
            fetch(URL, {
                method: "POST",
                body: JSON.stringify(data),
            }).then((res) => console.log(res.json()));
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
                <UserForm onSubmit={onSubmit} />
            </Modal>
        </>
    );
};

export default UserModal;
