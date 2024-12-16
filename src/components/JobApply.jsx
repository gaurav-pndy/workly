import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BeatLoader, CircleLoader } from "react-spinners";
import useFetch from "@/hooks/useFetch";
import { applyToJob } from "@/api/apiApplications";

const schema = z.object({
  experience: z
    .number()
    .min(0, {
      message: "Experience cannot be empty (Enter 0 if you are a Fresher).",
    })
    .int(),
  skills: z.string().refine(
    (value) =>
      value
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0).length >= 2,
    { message: "Add at least 2 skills separated by commas." }
  ),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Please select your highest education.",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      {
        message: "Only PDF or Word files can be uploaded.",
      }
    ),
});

const JobApply = ({ user, job, applied = false, fetchJob }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job?.id,
      candidate_id: user?.id,
      name: user?.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };

  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          disabled={applied || !job?.isOpen}
          size="xl"
          variant="apply"
          className={!job?.isOpen && "border-gray-500"}
        >
          {job?.isOpen
            ? applied
              ? "You have already applied to this job"
              : "Apply Now"
            : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:px-10">
        <DrawerHeader>
          <DrawerTitle className=" text-xl md:text-2xl">
            Applying for {job?.title} at {job?.company?.name}
          </DrawerTitle>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-4 pb-0"
        >
          <div>
            <h3>Experience:</h3>
            <Input
              type="number"
              placeholder="Enter your total years of work experience"
              className="flex-1 mt-1 h-12 placeholder:text-sm"
              {...register("experience", { valueAsNumber: true })}
            />
            {errors.experience && (
              <p className="text-red-600">{errors.experience.message}</p>
            )}
          </div>
          <div>
            <h3>Skills:</h3>
            <Input
              type="text"
              placeholder="Enter your relevant skills (separate skills by comma)"
              className="flex-1 mt-1 h-12 placeholder:text-sm"
              {...register("skills")}
            />
            {errors.skills && (
              <p className="text-red-600">{errors.skills.message}</p>
            )}
          </div>

          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <div>
                <h3>Highest Education:</h3>
                <RadioGroup
                  onValueChange={field.onChange}
                  {...field}
                  className="mt-2 ml-4"
                >
                  <div className="flex items-center space-x-2 ">
                    <RadioGroupItem value="Intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate ( 12th )</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Graduate" id="graduate" />
                    <Label htmlFor="graduate">Graduate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Post Graduate" id="post-graduate" />
                    <Label htmlFor="post-graduate">Post Graduate</Label>
                  </div>
                </RadioGroup>
                {errors.education && (
                  <p className="text-red-600 mt-1">
                    {errors.education.message}
                  </p>
                )}
              </div>
            )}
          />

          <div>
            <h3>Updated Resume:</h3>
            <Input
              type="file"
              accept=".pdf, .doc, .docx"
              className="flex-1 mt-1 file:text-gray-500 cursor-pointer"
              {...register("resume")}
            />
            {errors.resume && (
              <p className="text-red-600">{errors.resume.message}</p>
            )}
            {errorApply?.message && (
              <p className="text-red-600">{errorApply?.message}</p>
            )}
          </div>
          <Button size="lg" disabled={loadingApply} variant="apply">
            {loadingApply ? <BeatLoader color="white" /> : "Apply Now"}
          </Button>
        </form>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button size="lg" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default JobApply;
