import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();

  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "recruiter" ? "/post-job" : "/jobs");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs"
      );
    }
  }, [user]);
  if (!isLoaded) {
    return (
      <div className=" h-[80%] flex justify-center items-center">
        <BeatLoader className="opacity-70" color="purple" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient-title font-bold text-5xl sm:text-8xl tracking-tighter">
        I am a...
      </h2>
      <div className="mt-16 grid  md:grid-cols-2 gap-4 w-full px-10 md:px-28 lg:px-56">
        <Button
          onClick={() => handleRoleSelection("candidate")}
          variant="outline"
          size="xl"
          className=" h-20 md:h-32 text-2xl border border-blue-400 bg-transparent hover:bg-blue-400 transition-all duration-300"
        >
          Job Seeker
        </Button>
        <Button
          onClick={() => handleRoleSelection("recruiter")}
          variant="outline"
          size="xl"
          className=" h-20 md:h-32 text-2xl border border-yellow-700 bg-transparent hover:bg-yellow-700 transition-all duration-300"
        >
          Job Provider
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
