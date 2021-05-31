import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import Link from 'next/link'
import { handleLogin} from '../utils/auth'
import catchErrors from '../utils/catchErrors'

const INITIAL_USER = {
  name: "",
  email: "",
  password: ""
}
function Signup() {
  const [user, setUser] = useState(INITIAL_USER)
  const [disabled,setDisabled] = useState(false)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')

  useEffect(() => {
    const isUser = Object.values(user).every(el=> Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true)
  },[user])

function handleChange(event) {
  const { name , value} = event.target
  setUser(prevState => ({...prevState, [name]: value}))
}

async function handleSubmit(event) {
  event.preventDefault()
  try {
    setLoading(true)
    setError('')
    const url =`${baseUrl}/api/signup`
    const payload = {...user }
    const response = await axios.post(url,payload)
    handleLogin(response.data)
    //make request to user
  } catch (error) {
      catchErrors(error, setError)
  } finally {
    setLoading(false)
  }
}

  return (
    <>
      <Message
        attached
        icon="settings"
        header="Get Started!"
        content="Create a new account"
        color="teal"
      />
      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
        <Message 
          error
          header="Oops!"
          content={error}
        />
        <Segment>
          <Form.Input 
            fluid
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
           <Form.Input 
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
           <Form.Input 
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button 
            icon="signup"
            type="submit"
            color="orange"
            content="Signup"
            disabled={disabled || loading}
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Existing User ? {" "}
        <Link href="/login">
          <a>Login Here</a>
        </Link>{" "}
        instead
      </Message>
    </>
  );
}

export default Signup;
