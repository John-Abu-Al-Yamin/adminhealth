import axiosInstance from "@/Api/axiosInstance ";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthContext } from "@/context/AuthContext";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { getAllAppointmentsValidationSchema } from "@/utils/validation";
import { useFormik } from "formik";

const Appointments = () => {
  const { getAllAppointments } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: { dateTime: "" },
    validationSchema: getAllAppointmentsValidationSchema,
    onSubmit: (values) => {
        
      getAllAppointments(values.dateTime);
    },
  });

  return (
    <div className="w-full p-4 space-y-6">
      <Card>
        <CardHeader className="pb-3">
          {/* Serach from dataTime */}
          <form onSubmit={formik.handleSubmit} className="flex  gap-4">
            <div className="w-1/2">
              <Input
                type="date"
                name="dateTime"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateTime}
              />
              {formik.touched.dateTime && formik.errors.dateTime && (
                <div className="text-red-500 text-sm mt-1 block">
                  {formik.errors.dateTime}
                </div>
              )}
            </div>

            <div className="">
              <Button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Search"}
              </Button>
            </div>
          </form>
        </CardHeader>
      </Card>
      <CardContent>
        {/* Table  */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-lg">ID</TableHead>
                <TableHead className="text-lg">Name</TableHead>
                <TableHead className="text-lg">specialization</TableHead>
                <TableHead className="text-lg">experienceYears</TableHead>
                <TableHead className=" text-lg">averageRating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="h-12">
                <TableCell className="font-medium">1</TableCell>
                <TableCell className="">John</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No doctors found matching your criteria.
                    </TableCell>
                  </TableRow>
                )} */}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </div>
  );
};

export default Appointments;
