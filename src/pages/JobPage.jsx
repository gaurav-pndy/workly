import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";
import ApplicationCard from "@/components/ApplicationCard";
import JobApply from "@/components/JobApply";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import {
  BriefcaseBusinessIcon,
  DoorClosed,
  DoorOpenIcon,
  MapPinnedIcon,
} from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const JobPage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  useEffect(() => {
    if (isLoaded) {
      fnJob();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className=" h-[80vh] flex justify-center items-center">
        <BeatLoader className="opacity-50" color="purple" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8 mt-2 py-10">
      <div className="flex flex-col-reverse gap-3 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-bold md:pb-3 text-3xl sm:text-5xl">
          {job?.title}
        </h1>
        <img
          src={job?.company?.logo_url}
          className="h-10 sm:h-12"
          alt={job?.title}
        />
      </div>

      <div className="flex justify-between text-gray-400">
        <div className="flex gap-2">
          <MapPinnedIcon />
          {job?.location}
        </div>
        <div className="flex gap-2">
          <BriefcaseBusinessIcon /> {job?.applications?.length} Applicants
        </div>
        <div className="flex gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpenIcon /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>

      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full bg-opacity-60 ${
              job?.isOpen ? "bg-green-600" : "bg-red-700"
            }`}
          >
            <SelectValue
              placeholder={"Hiring: " + (job?.isOpen ? "Open" : "Closed")}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <div className="flex flex-col gap-1 sm:gap-3">
        <h2 className="text-2xl sm:text-3xl font-semibold">About the Job</h2>
        <p className="sm:text-lg text-gray-300">{job?.description}</p>
      </div>

      <div className="flex flex-col gap-1 sm:gap-3">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          What we are looking for ?
        </h2>

        <MDEditor.Markdown
          source={job?.requirements}
          className="bg-transparent sm:text-lg text-gray-300"
        />
      </div>

      {job?.recruiter_id !== user?.id && (
        <JobApply
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
        />
      )}

      {job?.recruiter_id === user?.id && (
        <div className="flex flex-col gap-1  sm:gap-3">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Received Applications
          </h2>
          {job?.applications?.length === 0 && (
            <div className=" flex items-center justify-center text-2xl font-semibold text-gray-700">
              No Applications received yet !
            </div>
          )}
          {job?.applications.map((application) => {
            return (
              <ApplicationCard key={application.id} application={application} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JobPage;
