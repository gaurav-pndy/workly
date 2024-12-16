import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Boxes, BriefcaseBusiness, Download, School2 } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { updateApplicationStatus } from "@/api/apiApplications";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingApplicationStatus, fn: fnApplicationStatus } =
    useFetch(updateApplicationStatus, {
      job_id: application?.job_id,
    });

  const handleStatusChange = (status) => {
    fnApplicationStatus(status);
  };
  return (
    <Card>
      <CardHeader className="py-4 ">
        <CardTitle className="flex items-center justify-between font-semibold">
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}

          <Button variant="outline" onClick={handleResumeDownload}>
            <Download /> Download Resume
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-4 flex flex-col flex-1">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex gap-2 items-center">
            <span className="text-gray-300 flex gap-1 items-center">
              <BriefcaseBusiness size={20} />
              Years of Experience:
            </span>
            {application?.experience}
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-gray-300 flex gap-1 items-center">
              <School2 size={20} />
              Highest Education:
            </span>
            {application?.education}
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-gray-300 flex gap-1 items-center">
              <Boxes size={20} />
              Major Skills:
            </span>
            {application?.skills}
          </div>
        </div>
      </CardContent>
      <hr />
      <CardFooter className="flex justify-between my-auto  py-3 ">
        <span className="text-gray-400">
          {new Date(application?.created_at).toLocaleString()}
        </span>

        {isCandidate ? (
          <span className="capitalize font-semibold">
            Status: {application?.status}
          </span>
        ) : (
          <div className="flex gap-3 items-center">
            <span className="font-semibold">Status:</span>
            <Select
              onValueChange={handleStatusChange}
              defaultValue={application?.status}
            >
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Aplication Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
