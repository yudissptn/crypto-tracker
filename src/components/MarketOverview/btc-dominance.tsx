"use client";

import {
  ArrowBigDown,
  ArrowBigUp,
  ArrowDown,
  ArrowUp,
  Circle,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GlobalMetricsAPI } from "@/lib/types";

const BitcoinDominanceColor = {
  btc: "#F68819",
  eth: "#3861FB",
  other: "#53596A",
};

const chartConfig = {
  btc: {
    label: "BTC",
    color: BitcoinDominanceColor.btc,
  },
  eth: {
    label: "ETH",
    color: BitcoinDominanceColor.eth,
  },
  other: {
    label: "Other",
    color: BitcoinDominanceColor.other,
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

const BtcDominance = (props: GlobalMetricsAPI) => {
  const {
    btc_dominance,
    btc_dominance_24h_percentage_change,
    btc_dominance_yesterday,
    eth_dominance,
    eth_dominance_24h_percentage_change,
    eth_dominance_yesterday,
  } = props;

  const gmChartdata = [
    {
      name: "Bitcoin Dominance",
      btc: btc_dominance,
      eth: eth_dominance,
      other: 100 - btc_dominance - eth_dominance,
    },
  ];

  return (
    <Card className="max-w-2xl h-64 relative">
      <CardHeader>
        <CardTitle>Bitcoin Dominance</CardTitle>
        <CardDescription>
          Bitcoin (BTC) dominance is a metric used to measure the relative
          market share or dominance of Bitcoin in the overall cryptocurrency
          market.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          <DominanceSummary
            percentValue={btc_dominance}
            dailyPercentChange={btc_dominance_24h_percentage_change}
            label="Bitcoin"
            color={BitcoinDominanceColor.btc}
          />
          <DominanceSummary
            percentValue={eth_dominance}
            dailyPercentChange={eth_dominance_24h_percentage_change}
            label="Ethereum"
            color={BitcoinDominanceColor.eth}
          />
          <DominanceSummary
            percentValue={100 - btc_dominance - eth_dominance}
            dailyPercentChange={
              ((100 -
                btc_dominance -
                eth_dominance -
                (100 - btc_dominance_yesterday - eth_dominance_yesterday)) /
                (100 - btc_dominance - eth_dominance)) *
              100
            }
            label="Other"
            color={BitcoinDominanceColor.other}
          />
        </div>
        <ChartContainer className="max-h-28 w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={gmChartdata} layout="vertical">
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="btc"
              radius={[4, 0, 0, 4]}
              stackId="a"
              fill="var(--color-btc)"
              barSize={30}
            >
              <LabelList
                dataKey="btc"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
                width={20}
                formatter={(value: number) => `${value.toFixed(0)}%`}
              />
            </Bar>
            <Bar
              dataKey="eth"
              radius={[0, 0, 0, 0]}
              stackId="a"
              fill="var(--color-eth)"
              barSize={30}
            >
              <LabelList
                dataKey="eth"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
                formatter={(value: number) => `${value.toFixed(0)}%`}
              />
            </Bar>
            <Bar
              dataKey="other"
              radius={[0, 4, 4, 0]}
              stackId="a"
              fill="var(--color-other)"
              barSize={30}
            >
              <LabelList
                dataKey="other"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
                formatter={(value: number) => `${value.toFixed(0)}%`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

type DominanceSummaryTypes = {
  percentValue: number;
  dailyPercentChange: number;
  label: string;
  color: string;
};

const DominanceSummary = (props: DominanceSummaryTypes) => {
  return (
    <div>
      <div className="flex items-center gap-1">
        <Circle className="h-3 w-3" color={props.color} fill={props.color} />
        <p className="text-sm">{props.label}</p>
      </div>
      <h5 className="text-md font-bold">{props.percentValue.toFixed(1)}%</h5>
      <div className="flex items-center gap-1">
        {props.dailyPercentChange > 0 ? (
          <ArrowBigUp className="w-5 h-5" color="green" fill="green" />
        ) : (
          <ArrowBigDown className="w-5 h-5" color="red" fill="red" />
        )}
        <p
          className={`text-sm ${
            props.dailyPercentChange > 0 ? "text-green-500" : "text-red-500"
          } `}
        >
          {Math.abs(props.dailyPercentChange).toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default BtcDominance;
