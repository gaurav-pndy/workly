import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useFetch from "@/hooks/useFetch";
import { addNewCompany } from "@/api/apiCompanies";
import { BeatLoader } from "react-spinners";

const schema = z.object({
  name: z.string().min(1, { message: "Please enter a valid company name." }),
  logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" || file[0].type === "image/jpeg"),
      { message: "Only png and jpeg files can be uploaded." }
    ),
});

const AddCompany = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fn: fnAddCompany,
  } = useFetch(addNewCompany);

  const onSubmit = (data) => {
    fnAddCompany({
      ...data,
      logo: data.logo[0],
    });
  };

  useEffect(() => {
    if (dataAddCompany?.length > 0) {
      fetchCompanies();
    }
  }, [loadingAddCompany]);
  return (
    <Drawer>
      <DrawerTrigger>
        <Button type="button" variant="outline" className="h-full">
          Add Company
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:px-10">
        <DrawerHeader>
          <DrawerTitle className=" text-xl md:text-2xl">
            Adding a new Company
          </DrawerTitle>
        </DrawerHeader>

        <form className="flex flex-col gap-6 p-4 pb-0">
          <div>
            <h3>Company Name:</h3>

            <Input
              placeholder="Enter the name of your company"
              className="mt-1"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <h3>Company Logo:</h3>

            <Input
              type="file"
              placeholder="Upload the logo of your company"
              accept="image/"
              className="mt-1 file:text-gray-400"
              {...register("logo")}
            />
            {errors.logo && (
              <p className="text-red-500">{errors.logo.message}</p>
            )}
          </div>
          <Button
            type="button"
            disabled={loadingAddCompany}
            onClick={handleSubmit(onSubmit)}
            variant="outline"
            className="mt-2 border-yellow-700 bg-transparent hover:bg-yellow-700"
          >
            {loadingAddCompany ? <BeatLoader color="white" /> : "Add Company"}
          </Button>
        </form>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddCompany;
