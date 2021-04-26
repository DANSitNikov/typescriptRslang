/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useHistory } from 'react-router-dom';
import './Registration.scss';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import { registration } from '../../actions/userActions';

const Registration: React.FC = () => {
  const history = useHistory();

  const validationsSchema = yup.object().shape({
    name: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    password: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    email: yup.string().email('Введите верный email').required('Обязательно'),
  });

  return (
    <div>
      <Formik
        initialValues={{
          password: '',
          email: '',
          name: '',
        }}
        validateOnBlur
        onSubmit={(values) => {
          registration(values.email, values.password, values.name);
          history.push('/login');
        }}
        validationSchema={validationsSchema}
      >
        {({
          values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty,
        }) => (
          <div className="Login">
            <Form className="input-field">
              <label htmlFor="email" />
              <br />
              <input
                placeholder="Email"
                className="input"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                autoComplete="false"
              />
            </Form>
            {touched.email && errors.email && <p className="error">{errors.email}</p>}
            <Form className="input-field">
              <label htmlFor="secondName" />
              <br />
              <input
                placeholder="Пароль"
                className="input"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                autoComplete="false"
              />
            </Form>
            {touched.password && errors.password && <p className="error">{errors.password}</p>}
            <Form className="input-field">
              <label htmlFor="email" />
              <br />
              <input
                placeholder="Имя"
                className="input"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                autoComplete="false"
              />
            </Form>
            {touched.name && errors.name && <p className="error">{errors.name}</p>}
            <Button
              disabled={!isValid || !dirty}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onClick={handleSubmit}
              type="submit"
            >
              Регистрация
            </Button>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
