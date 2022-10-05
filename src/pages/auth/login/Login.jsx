
import {Lock, Sms} from 'levr/icons';
import {Link} from 'react-router-dom';
import Logo from 'assets/download.jpeg';
import useLogin from "./useLogin";
import {TextInput, PasswordInput, Title, Button, Center, Stack, Image, Box,Anchor} from '@mantine/core';
import {useForm} from '@mantine/form';

const View = () => {

  const {submitLoginForm, isLoading,loginError} =useLogin();
  const {} = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate:{
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    }
  });

  return (
    <Center sx={theme=>({width: '100vw', height: '80vh'})}>

      <Stack spacing="xl">
        <Center>
          <Image width={100} src={Logo} alt=""/>
        </Center>

        <Title order={1}>Welcome to Levr</Title>
        <form>
          <Stack>

            <TextInput
              placeholder="Your Email"
              label="Email Address"
              icon={<Sms/>}
            />
            <PasswordInput
              placeholder="Your Password"
              label="Password"
              icon={<Lock/>}
            />
            <Button>Sign In</Button>
          </Stack>
        </form>
        <Center>
          <Anchor component={Link} to="/forgot-password">Forgot Password?</Anchor>
        </Center>
      </Stack>

    </Center>
  )
}
export default View;

