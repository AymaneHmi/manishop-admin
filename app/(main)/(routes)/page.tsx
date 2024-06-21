'use client';

import { getStoreInfo } from "@/actions/getStoreInfo";
import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import Overview from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, DollarSign, Package } from "lucide-react";

export default function DashBoard() {
  const {data:storeInfo, isLoading, error} = getStoreInfo();

  if(error) {
    return <div className="w-full flex flex-col items-center my-4">
        <EmptyState
            title="Ups!! Something Went wrong!"
            subtitle={`Error Accured:` + error}
        />
    </div>
  }

  return (
    <section className="flex flex-col gap-4">
      <Heading
        title="Dashboard"
        subtitle="See how your store doing."
      />
      <Separator />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between text-sm">
            <CardTitle >Total Revenue</CardTitle>
            <DollarSign />
          </CardHeader>
          <CardContent className="font-bold text-4xl">
            {isLoading ? <Skeleton className="w-full h-20" /> : '$' + storeInfo?.totalRevenue }
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between text-sm">
            <CardTitle >Sales</CardTitle>
            <CreditCard />
          </CardHeader>
          <CardContent className="font-bold text-4xl">
            {isLoading ? <Skeleton className="w-full h-20" /> : '+' + storeInfo?.sales }
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between text-sm">
            <CardTitle >Product in stock</CardTitle>
            <Package />
          </CardHeader>
          <CardContent className="font-bold text-4xl">
            {isLoading ? <Skeleton className="w-full h-20" /> : storeInfo?.products }
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle >Overview</CardTitle>
          </CardHeader>
          <CardContent className="overflow-auto">
            <Overview data={storeInfo?.graphData} year={2024} loading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
