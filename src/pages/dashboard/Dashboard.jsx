import { ActionGrid, Content } from 'components'
import { Stack, Title, Grid } from '@mantine/core'

const Dashboard = () => {
  return <>
    <Stack>
      <Content>

        <Title>Welcome to Levr, </Title>

        <Grid>
          <Grid.Col span={8}></Grid.Col>
          <Grid.Col span={3}><ActionGrid /></Grid.Col>
        </Grid>
      </Content>
    </Stack>
  </>

}
export default Dashboard