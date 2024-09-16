import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import { appsAtom } from "@stores/state";
import { useAtom } from "jotai";
import React, { useEffect, useRef } from "react";
import MiniApp from "./MiniApp";

const Apps: React.FC = () => {
  const [{ data, fetchNextPage, isFetching, hasNextPage }] = useAtom(appsAtom);
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible, hasNextPage]);

  return (
    <div className="bg-white min-h-[85vh]">
      <div className="bg-white">
        {data?.pages.map((page, index) => (
          <div key={index}>
            {page.data.map((app, idx) => (
              <div key={app.id}>
                <MiniApp key={app.id} value={app} />
                {idx < page.data.length - 1 && (
                  <div className="border-b-[0.5px] mx-4" />
                )}
              </div>
            ))}
          </div>
        ))}

        {/* {isFetching &&
          [...Array(3)].map((_, index) => (
            <div
              key={`app-ske-${index}`}
              className="rounded-md max-w-sm w-full m-4"
            >
              <div className="animate-pulse flex gap-2">
                <div className="rounded bg-slate-200 h-14 w-14"></div>
                <div className="flex mt-1 flex-grow flex-col gap-2">
                  <div className="h-5 bg-slate-200 rounded"></div>
                  <div className="h-4 mt-1 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          ))} */}
      </div>
      <div className="h-10" ref={ref}></div>
    </div>
  );
};

export default Apps;
