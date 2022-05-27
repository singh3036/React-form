import React from 'react'
import './App.css'
import { useState, useEffect } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';


export default function App() {

  const initialValues = { users: "", title: "", body: "" };
  const [formValues, setformValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const getusers = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      console.log(data);
      setUsers(await data);
    }
    getusers();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
    console.log(formValues);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    let dataa = formValues;
    console.warn(dataa)
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Acccept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataa)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn("resp", resp)
      })
    })
  }


  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }

  }, [formErrors])


  const validate = (values) => {
    const errors = {};
    if (!values.users) {
      errors.users = "Please select a user.";
    }
    if (!values.title) {
      errors.title = "Please enter title for a user.";
    }

    if (!values.body) {
      errors.body = "Please enter the body of a user.";
    }
    return errors;
  };


  return (
    <>
      <Container>
        
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">User Registration</h1>
        <Row className="mt-5">
          <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='formBasicUsers'>
                <Form.Label>Users</Form.Label>
                <Form.Select
                  name='users'
                  value={formValues.users}
                  aria-label="Default select example"
                  onChange={handleChange}

                >
                  <option>--Select Users--</option>
                  {
                    users.map((usersget) => (
                      <option key={usersget.id}>{usersget.name}</option>
                    ))
                  }
                </Form.Select>
              </Form.Group>
              <p>{formErrors.users}</p>

              <Form.Group className='mt-2' controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name='title'
                  value={formValues.title}
                  type="text"
                  placeholder="Enter title"
                  onChange={handleChange}
                />
              </Form.Group>
              <p>{formErrors.title}</p>

              <Form.Group className='mt-2' controlId="formBasicBody">
                <Form.Label >Body</Form.Label>
                <Form.Control
                  name='body'
                  value={formValues.body}
                  as="textarea" rows={3}
                  placeholder='Enter Body'
                  onChange={handleChange}
                />
              </Form.Group>
              <p>{formErrors.body}</p>

              <Button variant="success col-12 mt-3" type="submit">
                Register
              </Button>
              {Object.keys(formErrors).length === 0 && isSubmit ?
                (<span className=''>Registered Succesfully!</span>) : null
              }
            </Form>
          </Col>
        </Row>
        <h6 className="mt-2 p-5 text-center text-secondary ">
          Copyright © 2021 Siddharth Singh. All Rights Reserved.
        </h6>
      </Container>
    </>
  )
}

