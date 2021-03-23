import React from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { Form, FormInput } from "semantic-ui-react";

interface Form {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

const UserModal = (props: Form) => {
    const { register, handleSubmit } = useForm<Form>();
    return (
        <div>
            <Form>
                <Form.Field>
                    <label>First Name</label>
                    <input type="text" placeholder="First Name" />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input type="text" placeholder="Last Name" />
                </Form.Field>
                <Form.Field>
                    <label>Phone Number</label>
                    <input type="text" placeholder="Phone Number" />
                </Form.Field>
            </Form>
        </div>
    );
};

export default UserModal;
