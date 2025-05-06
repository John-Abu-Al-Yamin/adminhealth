import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

const HomeDoctor = () => {
  const { getAllDoctors, doctors } = useAuthContext();

  const [searchTerm, setSearchTerm] = useState("");
  const filteredDoctors = doctors.filter((doctor) => {
    return (
      doctor.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <div className="w-full p-4 space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Doctors</CardTitle>
              <CardDescription>
                Manage your hospital's doctors and their information.
              </CardDescription>
            </div>
            <Button className="flex items-center gap-1">
              <Link to="/add-doctor" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Add Doctor</span>
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors by name or specialization..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-lg">ID</TableHead>
                  <TableHead className=" text-lg">email</TableHead>
                  <TableHead className="text-lg">Name</TableHead>
                  <TableHead className="text-lg">specialization</TableHead>
                  <TableHead className="text-lg">experienceYears</TableHead>
                  <TableHead className=" text-lg">averageRating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <TableRow key={doctor.id} className="h-12">
                      <TableCell className="font-medium">{doctor.id}</TableCell>
                      <TableCell className="">{doctor.email}</TableCell>
                      <TableCell>{doctor.doctorName}</TableCell>
                      <TableCell>{doctor.specialization}</TableCell>
                      <TableCell>{doctor.experienceYears}</TableCell>
                      <TableCell>
                        {doctor.averageRating === null
                          ? 0
                          : doctor.averageRating}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No doctors found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <div>
              Showing {filteredDoctors.length} of {doctors.length} doctors
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={filteredDoctors.length === doctors.length}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={filteredDoctors.length === doctors.length}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeDoctor;
