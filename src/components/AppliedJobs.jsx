import { getApplications } from "@/api/apiApplications";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { CircleLoader } from "react-spinners";
import ApplicationCard from "./ApplicationCard";

const AppliedJobs = () => {
  const { user } = useUser();

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications, {
    user_id: user?.id,
  });

  useEffect(() => {
    fnApplications();
  }, []);

  if (loadingApplications) {
    return (
      <div className=" h-[70vh] flex justify-center items-center">
        <CircleLoader className="opacity-50" color="purple" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {applications?.map((application) => {
        return (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate
          />
        );
      })}
    </div>
  );
};

export default AppliedJobs;
