import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome back!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">
                            Hello, <span className="font-semibold text-gray-900">{session?.user?.name || session?.user?.email}</span>.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Project Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-green-600 font-medium">Initial setup complete.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
