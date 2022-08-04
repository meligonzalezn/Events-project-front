import { DashboardLayout } from '../components/dashboard-layout';
import { Calendar } from 'src/components/activities/calendar';

const CreateActivity = () => {
  return (
    <div style={{ padding: '15px' }}>
      <Calendar />
    </div>
  );
}

CreateActivity.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default CreateActivity;