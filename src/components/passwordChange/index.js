import React, { Component } from 'react';
import { Button, Message, Form } from 'semantic-ui-react'
import { withFirebase } from '../firebase';

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { passwordOne } = this.state;

        this.props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { passwordOne, passwordTwo, error } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '';

        return (
            <Form>
                <Form.Group widths={2}>
                    <Form.Field>
                        <label>New Password</label>
                        <input
                            name="passwordOne"
                            value={passwordOne}
                            onChange={this.onChange}
                            type="password"
                            placeholder="New Password"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Confirm New Password</label>
                        <input
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Confirm New Password"
                        />
                    </Form.Field>
                </Form.Group>
                <Button type='submit' onClick={this.onSubmit} disabled={isInvalid}>Reset My Password</Button>
                {error && <Message error header='Error' content={error.message} />}
            </Form>
        );
    }
}

export default withFirebase(PasswordChangeForm);