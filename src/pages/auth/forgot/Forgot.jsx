import {Button, TextInput, Title, Stack, Center, Anchor} from "@mantine/core";
import {Link} from "react-router-dom";
import {BrandLogo} from 'components'
import {IconMail} from '@tabler/icons';
import {useForm} from '@mantine/form';
import useForgot from "./useForgot";

const Forgot = () => {

  const form = useForm({
    initialValues: {
      email: ''
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const {submitForgotForm} = useForgot();

  return (
    <Center sx={theme => ({width: '100vw', height: '80vh'})}>
      <Stack sx={theme => ({width: 300})}>
        <BrandLogo size={80}/>
        <Title order={1} align="center">Did you forget your password?</Title>
        <form onSubmit={form.onSubmit(submitForgotForm)}>
          <Stack>
            <TextInput
              placeholder="Your Email"
              label="Email Address"
              icon={<IconMail size={14}/>}
              {...form.getInputProps('email')}
            />
            <Button type="submit">Reset Password</Button>
          </Stack>
        </form>
        <Center>
          <Anchor component={Link} to='/login'>
            Login
          </Anchor>
        </Center>
      </Stack>
    </Center>
  )
}
export default Forgot;
