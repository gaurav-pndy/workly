import { getCompanies } from "@/api/apiCompanies";
import { addNewJob } from "@/api/apiJobs";
import AddCompany from "@/components/AddCompany";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { State } from "country-state-city";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Job title is required." }),
  description: z.string().min(1, { message: "Job description is required." }),
  location: z.string().min(1, { message: "Job location is required." }),
  company_id: z
    .string()
    .min(1, { message: "Please select or add a new company." }),
  requirements: z.string().min(1, { message: "Job requirements is required." }),
});

const PostJob = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    fn: fnCompanies,
    data: companies,
    loading: loadingCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJob,
    fn: fnCreateJob,
  } = useFetch(addNewJob);

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user?.id,
      isOpen: true,
    });
  };

  useEffect(() => {
    if (dataCreateJob?.length > 0) {
      navigate("/jobs");
    }
  }, [loadingCreateJob]);

  if (!isLoaded || loadingCompanies) {
    return (
      <div className=" h-[80vh] flex justify-center items-center">
        <BeatLoader className="opacity-50" color="purple" />
      </div>
    );
  }

  return (
    <div className="md:px-20">
      <h1 className="gradient-title font-bold text-4xl sm:text-6xl text-center pb-6">
        Post a Job
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4 pb-0"
      >
        <div className="flex flex-col md:flex-row  gap-5">
          <div className="md:w-2/4 flex flex-col gap-4">
            <div>
              <h3>Job Title:</h3>
              <Input
                placeholder="Enter the job title"
                className="flex-1 mt-1 h-12 placeholder:text-sm"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-600">{errors.title.message}</p>
              )}
            </div>

            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <div>
                  <h3>Job Location:</h3>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-12  mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {State.getStatesOfCountry("IN").map(({ name }) => {
                          return (
                            <SelectItem key={name} value={name}>
                              {name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.location && (
                    <p className="text-red-600">{errors.location.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="company_id"
              control={control}
              render={({ field }) => (
                <div>
                  <h3>Company name:</h3>
                  <div className="flex gap-4 mt-1">
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-12  ">
                        <SelectValue>
                          {field.value &&
                            companies?.find(
                              (company) => company.id === Number(field.value)
                            )?.name}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {companies?.map(({ name, id }) => {
                            return (
                              <SelectItem key={id} value={id}>
                                {name}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <AddCompany fetchCompanies={fnCompanies} />
                  </div>
                  {errors.company_id && (
                    <p className="text-red-600">{errors.company_id.message}</p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="md:w-2/4 ">
            <h3>Job Description:</h3>
            <Textarea
              placeholder="Enter a description of the job"
              className="flex-1 mt-1 h-32 md:h-[88%] placeholder:text-sm"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-600">{errors.description.message}</p>
            )}
          </div>
        </div>

        <Controller
          name="requirements"
          control={control}
          render={({ field }) => (
            <div>
              <h3 className="mb-1">Job Requirements: </h3>

              <MDEditor value={field.value} onChange={field.onChange} />
              {errors.requirements && (
                <p className="text-red-600">{errors.requirements.message}</p>
              )}
            </div>
          )}
        />

        <Button
          type="submit"
          variant="outline"
          size="xl"
          disabled={loadingCreateJob}
          className="mt-2 border-yellow-700 mb-10 bg-transparent hover:bg-yellow-700"
        >
          {loadingCreateJob ? <BeatLoader color="white" /> : "Post Job"}
        </Button>
      </form>
    </div>
  );
};

export default PostJob;
