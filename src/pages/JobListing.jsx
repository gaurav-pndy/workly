import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
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
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { Search, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BeatLoader, CircleLoader } from "react-spinners";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();
  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  const handleSearch = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) {
      console.log(query);

      setSearchQuery(query);
      console.log(searchQuery);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setCompany_id("");
  };

  if (!isLoaded) {
    return (
      <div className=" h-[80vh] flex justify-center items-center">
        <BeatLoader className="opacity-50" color="purple" />
      </div>
    );
  }

  return (
    <div className="pb-10">
      <h1 className="gradient-title font-bold text-4xl md:text-6xl text-center pb-8">
        Jobs for you
      </h1>

      <form
        onSubmit={handleSearch}
        className=" h-12 sm:h-14 flex w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs..."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button
          type="submit"
          variant="outline"
          className="h-full sm:w-14 bg-blue-700 bg-opacity-60 hover:bg-transparent  hover:border-blue-700"
        >
          <Search size={18} className=" scale-150" stroke="white" />
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
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
        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
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
        <Button
          onClick={clearFilters}
          variant="destructive"
          className="sm:w-1/2"
        >
          Clear Filters
        </Button>
      </div>

      {loadingJobs && (
        <div className=" h-[60vh] flex justify-center items-center">
          <CircleLoader className="opacity-50" color="purple" />
        </div>
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {jobs?.length ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                savedInit={job?.saved?.length > 0}
              />
            ))
          ) : (
            <div>No Jobs Found !</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
