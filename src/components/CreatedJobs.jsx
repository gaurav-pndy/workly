import { getCreatedJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { CircleLoader } from "react-spinners";
import JobCard from "./JobCard";

const CreatedJobs = () => {
  const { user } = useUser();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getCreatedJobs, {
    recruiter_id: user?.id,
  });

  useEffect(() => {
    fnCreatedJobs();
  }, []);

  if (loadingCreatedJobs) {
    return (
      <div className=" h-[70vh] flex justify-center items-center">
        <CircleLoader className="opacity-50" color="purple" />
      </div>
    );
  }

  return (
    <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10">
      {createdJobs?.length ? (
        createdJobs.map((job) => (
          <JobCard key={job.id} job={job} onJobSaved={fnCreatedJobs} isMyJob />
        ))
      ) : (
        <div>No Jobs Found !</div>
      )}
    </div>
  );
};

export default CreatedJobs;
