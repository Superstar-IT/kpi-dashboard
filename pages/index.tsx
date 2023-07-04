import Head from 'next/head';
import { Container, Grid } from '@mui/material';

import SidebarLayout from '@/layouts/SidebarLayout';

import PageHeader from '@/content/Dashboards/Crypto/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';

import RecentKPIs from '@/content/Management/KPIs/RecentKPIs';

function Dashboard() {
  return (
    <>
      <Head>
        <title>KPI Dashboard</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader title="Welcome, KPI Dashboard!" />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <RecentKPIs />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

Dashboard.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Dashboard;
