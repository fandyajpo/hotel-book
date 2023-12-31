"use client";
import { client } from "@/lib/axios";
import { UpdateMethod } from "@/types";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { NextComponentType } from "next";
import { useParams } from "next/navigation";

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
    const { data, isLoading } = useQuery({
      queryKey: [requirement.queryKey, params?.key, params?.id],
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
        {!isLoading ? (
          <Component
            data={props.method === "UPDATE" ? data?.data : null}
            method={props.method}
          />
        ) : null}
      </>
    );
  };

  WrappedComponent.displayName = `withData(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

export default withData;
