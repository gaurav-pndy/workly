import { getSavedJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BeatLoader } from "react-spinners";

const SavedJobs = () => {
  const { isLoaded } = useUser();

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) {
      fnSavedJobs();
    }
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJobs) {
    return (
      <div className=" h-[80vh] flex justify-center items-center">
        <BeatLoader className="opacity-50" color="purple" />
      </div>
    );
  }
  return (
    <div className="pb-10 ">
      <h1 className="gradient-title font-bold text-4xl md:text-6xl text-center pb-8">
        Your saved jobs
      </h1>

      {loadingSavedJobs === false && (
        <div
          className={`mt-8 ${
            savedJobs?.length && "grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          }`}
        >
          {savedJobs?.length ? (
            savedJobs.map((savedJob) => (
              <JobCard
                key={savedJob.id}
                job={savedJob.job}
                savedInit={true}
                onJobSaved={fnSavedJobs}
              />
            ))
          ) : (
            <div className=" h-[50vh] flex items-center justify-center text-2xl font-semibold text-gray-700">
              You have not saved any jobs yet !
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
