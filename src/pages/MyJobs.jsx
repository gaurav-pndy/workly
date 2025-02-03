import AppliedJobs from "@/components/AppliedJobs";
import CreatedJobs from "@/components/CreatedJobs";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { BeatLoader } from "react-spinners";

const MyJobs = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className=" h-[80vh] flex justify-center items-center">
        <BeatLoader className="opacity-70" color="purple" />
      </div>
    );
  }
  return (
    <div className="pb-10">
      <h1 className="gradient-title font-bold text-4xl md:text-6xl text-center pb-8">
        {user?.unsafeMetadata?.role === "candidate"
          ? "Applied Jobs"
          : "Created Jobs"}
      </h1>

      {user?.unsafeMetadata?.role === "candidate" ? (
        <AppliedJobs />
      ) : (
        <CreatedJobs />
      )}
    </div>
  );
};

export default MyJobs;
