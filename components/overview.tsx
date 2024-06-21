'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import Loader from './ui/loader';

interface OverviewProps {
    data: any[] | undefined;
    year: number | null;
    loading?: boolean
}

const Overview: React.FC<OverviewProps> = ({
    data,
    year,
    loading
}) => {
    const selectedYear = year !== null ? year : 2024

    if(loading) {
        return (
            <div className="w-full h-[250px] flex items-center justify-center">
                <Loader isLoading />
            </div>
        )
    }

    return (
        <div className='w-[200%] lg:w-[100%]'>

            <ResponsiveContainer width="100%" height={250} className={""}>
                <BarChart
                width={800}
                height={300}
                data={data?.[selectedYear]}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <XAxis
                    dataKey={"name"}
                    stroke='#888888'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    />
                <YAxis
                    yAxisId="left"
                    orientation="left"
                    stroke='#888888'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                    />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke='#888888'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                    />
                <Legend iconSize={25} radius={20} />
                <Bar yAxisId="left" name={'Revenue'} dataKey={"monthlyRevenue"} fill='#F0981D' radius={[4,4,0,0]} />
                <Bar yAxisId="right" name={'Sales'} dataKey={"monthlySales"} fill='#E6741C' radius={[4,4,0,0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Overview