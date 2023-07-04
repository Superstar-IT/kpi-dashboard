import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import KPIPageHeader from '@/content/Management/KPIs/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';

import RecentKPIs from '@/content/Management/KPIs/RecentKPIs';

function KpiList() {
  return (
    <>
      <Head>
        <title>Recent KPIs</title>
      </Head>
      <PageTitleWrapper>
        <KPIPageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentKPIs editable />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

KpiList.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default KpiList;
