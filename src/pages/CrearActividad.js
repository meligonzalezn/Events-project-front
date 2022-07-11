import { DashboardLayout } from '../components/dashboard-layout';
import { Calendar } from 'src/components/activities/calendar';
import { useRouter } from "next/router";

const CreateActivity = () => {
  return(
  <div style={{padding:'15px'}}>
      <Calendar />
  </div>
);}

CreateActivity.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default CreateActivity;