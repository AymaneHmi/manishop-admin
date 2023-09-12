'use client';

import { getStoreInfo } from "@/actions/getStoreInfo";
import Heading from "@/components/Heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, DollarSign, Package } from "lucide-react";

export default function DashBoard() {
  const storeInfo = getStoreInfo();

  return (
    <section className="flex flex-col gap-4">
      <Heading
        title="DashBoard"
        subtitle="See how your store doing."
      />
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between text-sm">
            <CardTitle >Total Revenue</CardTitle>
            <DollarSign />
          </CardHeader>
          <CardContent className="font-bold text-4xl">
            ${storeInfo?.totalRevenue}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between text-sm">
            <CardTitle >Sales</CardTitle>
            <CreditCard />
          </CardHeader>
          <CardContent className="font-bold text-4xl">
            +{storeInfo?.sales}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between text-sm">
            <CardTitle >Product in stock</CardTitle>
            <Package />
          </CardHeader>
          <CardContent className="font-bold text-4xl">
            {storeInfo?.products}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
