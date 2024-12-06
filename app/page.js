import BarCharts from '@/components/BarChart';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <Card className='w-10/12 max-w-full mx-auto mt-4 p-4 md:p-8 shadow-input bg-background border border-border rounded-lg'>
      <CardContent>
        <BarCharts />
      </CardContent>
    </Card>
  );
}
