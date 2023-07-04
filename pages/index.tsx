import Head from 'next/head';
import { Container, Grid } from '@mui/material';

import SidebarLayout from '@/layouts/SidebarLayout';

import PageHeader from '@/content/Dashboards/Crypto/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';

import AccountBalance from '@/content/Dashboards/Crypto/AccountBalance';
import Wallets from '@/content/Dashboards/Crypto/Wallets';
import AccountSecurity from '@/content/Dashboards/Crypto/AccountSecurity';
import WatchList from '@/content/Dashboards/Crypto/WatchList';
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
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item lg={8} xs={12}>
            <Wallets />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

Dashboard.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Dashboard;
