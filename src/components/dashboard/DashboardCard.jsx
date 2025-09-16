import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DashboardCard = ({ title, value, icon: Icon }) => (
    <Card className="bg-gray-400 text-white" >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {Icon && <Icon className="h-4 w-4 " />}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);