
import {IconMail, IconLock} from '@tabler/icons';
import {Link} from 'react-router-dom';
import useLogin from "./useLogin";
import {TextInput, PasswordInput, Title, Button, Center, Stack, Image, Box, Anchor, Paper, LoadingOverlay} from '@mantine/core';
import {useForm} from '@mantine/form';
import {BrandLogo} from "components";

const Login = () => {

  const {submitLoginForm, isLoading} =useLogin();
  const form = useForm({
    initialValues:{
      validateInputOnChange: ['email'],
      email: '',
      password: ''
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => value === undefined ? 'Password can not be empty': null
    },
  });

  return (
    <Center sx={theme=>({width: '100vw', height: '80vh'})}>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />

      <Stack spacing="xl">
          <BrandLogo size={80}/>
          <Title order={1} align="center">Welcome to Levr</Title>
          <form onSubmit={form.onSubmit(submitLoginForm)}>
            <Stack sx={theme=>({ width: 300})}>
              <TextInput
                name="email"
                placeholder="Your Email"
                label="Email Address"
                icon={<IconMail size={14}/>}
                withAsterisk
                {...form.getInputProps('email')}

              />
              <PasswordInput
                name="password"
                placeholder="Your Password"
                label="Password"
                icon={<IconLock size={14}/>}
                withAsterisk
                {...form.getInputProps('password')}

              />
              <Button type="submit">Sign In</Button>
            </Stack>
          </form>
          <Center>
            <Anchor component={Link} to="/forgot-password">Forgot Password?</Anchor>
          </Center>
        </Stack>
    </Center>
  )
}
export default Login;

