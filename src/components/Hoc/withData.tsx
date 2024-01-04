"use client";
import { client } from "@/lib/axios";
import { UpdateMethod } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { NextComponentType } from "next";
import { useParams } from "next/navigation";
import { LoadingSVG } from "../Icons";

interface Props {
  queryKey: string;
  apiScope: string;
}

const withData = <T,>(
  Component: NextComponentType<UpdateMethod<T>, any, UpdateMethod<T>>,
  requirement: Props
) => {
  const WrappedComponent = (props: UpdateMethod<T>) => {
    const params = useParams();
    const { data, isLoading, isFetching } = useQuery({
      queryKey: [requirement.queryKey, params?.id, params?.key],
      queryFn: () =>
        client.get(
          `api/${requirement?.apiScope}/${params?.id || params?.key}`,
          {
            method: "GET",
          }
        ),
      enabled: props?.method === "UPDATE",
    });

    return (
      <>
        {!isLoading && !isFetching ? (
          <Component
            data={props.method === "UPDATE" ? data?.data : null}
            method={props.method}
          />
        ) : (
          <LoadingSVG className="w-24 h-24 text-white" />
        )}
      </>
    );
  };

  WrappedComponent.displayName = `withData(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

export default withData;
