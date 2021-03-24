import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "semantic-ui-react";

export interface Form {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

interface Props {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    onSubmit: (data: Form) => void;
}

const UserForm = ({ firstName, lastName, phoneNumber, onSubmit }: Props) => {
    const { register, handleSubmit } = useForm<Form>();

    return (
        <div style={{ padding: "2em" }}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Field>
                    <label>First Name</label>
                    <input
                        type="text"
                        ref={register}
                        placeholder="First Name"
                        defaultValue={firstName || ""}
                        name="firstName"
                    />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input
                        type="text"
                        ref={register}
                        placeholder="Last Name"
                        defaultValue={lastName || ""}
                        name="lastName"
                    />
                </Form.Field>
                <Form.Field>
                    <label>Phone Number</label>
                    <input
                        type="text"
                        ref={register}
                        placeholder="Phone Number"
                        defaultValue={phoneNumber || ""}
                        name="phoneNumber"
                    />
                </Form.Field>
                <Form.Button>Submit</Form.Button>
            </Form>
        </div>
    );
};

export default UserForm;
