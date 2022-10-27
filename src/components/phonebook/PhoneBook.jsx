import { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validateName, validateNumber } from './Validate';
import { Wraper, ErrorText, ButtonAdd, Block } from './PhoneBook.styled';
import { schema } from './Chema';

const initialValues = {
  name: '',
  number: '',
};

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};
export class PhoneBook extends Component {
  handleSubmit = (values, { resetForm }) => {
    console.log(values);
    this.props.onSubmit(values);
    resetForm();
  };

  nameInputId = shortid.generate();
  numberInputId = shortid.generate();
  render() {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={this.handleSubmit}
      >
        <Form autoComplete="off">
          <Wraper>
            <h1>Phonebook</h1>
            <Block>
              <h3>Name</h3>
              <label htmlFor="this.nameInputId">
                <Field
                  type="text"
                  name="name"
                  id={this.nameInputId}
                  validate={validateName}
                />
              </label>
            </Block>
            <FormError name="name" />
            <Block>
              <h3> Number</h3>
              <label htmlFor="this.nameInputId">
                <Field
                  type="tel"
                  name="number"
                  id={this.numberInputId}
                  validate={validateNumber}
                />
              </label>
            </Block>
            <FormError name="number" />
            <ButtonAdd type="submit">Add contact</ButtonAdd>
          </Wraper>
        </Form>
      </Formik>
    );
  }
}

initialValues.PropTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
PhoneBook.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
