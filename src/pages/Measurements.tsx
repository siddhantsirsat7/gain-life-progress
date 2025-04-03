
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Plus, Ruler, Weight } from "lucide-react";
import { generateSampleData } from "@/lib/data";
import { format, parseISO } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const Measurements = () => {
  const { measurements } = generateSampleData();
  
  const chartData = measurements.slice().reverse().map(m => ({
    date: format(parseISO(m.date), "MMM dd"),
    weight: m.weight,
    bodyFat: m.bodyFat,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Body Measurements</h1>
          <p className="text-muted-foreground">Track your physical progress over time.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Measurement</span>
        </Button>
      </div>

      {/* Measurement Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Weight
            </CardTitle>
            <Weight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{measurements[0]?.weight} lbs</div>
              <div className="flex items-center text-xs text-fitness-green">
                <ArrowDown className="h-4 w-4" />
                2.5
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Body Fat
            </CardTitle>
            <Ruler className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{measurements[0]?.bodyFat}%</div>
              <div className="flex items-center text-xs text-fitness-green">
                <ArrowDown className="h-4 w-4" />
                1.2%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Waist Size
            </CardTitle>
            <Ruler className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{measurements[0]?.waistSize} in</div>
              <div className="flex items-center text-xs text-fitness-green">
                <ArrowDown className="h-4 w-4" />
                0.5
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Arm Size
            </CardTitle>
            <Ruler className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{measurements[0]?.armSize} in</div>
              <div className="flex items-center text-xs text-fitness-blue">
                <ArrowUp className="h-4 w-4" />
                0.25
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Over Time</CardTitle>
        </CardHeader>
        <CardContent className="px-2">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
              <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
              <Tooltip />
              <Legend />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="weight" 
                name="Weight (lbs)" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.2} 
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="bodyFat" 
                name="Body Fat (%)" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.2} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Measurement History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Measurement History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Weight (lbs)</TableHead>
                <TableHead>Body Fat (%)</TableHead>
                <TableHead>Chest (in)</TableHead>
                <TableHead>Waist (in)</TableHead>
                <TableHead>Arms (in)</TableHead>
                <TableHead>Legs (in)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {measurements.map(measurement => (
                <TableRow key={measurement.id}>
                  <TableCell>{format(parseISO(measurement.date), "MMM dd, yyyy")}</TableCell>
                  <TableCell>{measurement.weight}</TableCell>
                  <TableCell>{measurement.bodyFat}</TableCell>
                  <TableCell>{measurement.chestSize}</TableCell>
                  <TableCell>{measurement.waistSize}</TableCell>
                  <TableCell>{measurement.armSize}</TableCell>
                  <TableCell>{measurement.legSize}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Measurements;
