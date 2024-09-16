import { Loading, RatingStar } from "@components/icons/Icon";
import StatisticsNumber from "@components/statistics";
import { loadableOverviewRating } from "@stores/state";
import { useAtom } from "jotai";
import React, { useMemo } from "react";
import { Spinner } from "zmp-ui";

const OverviewRating: React.FC = () => {
  const [value] = useAtom(loadableOverviewRating);

  const { total, rating, ratings } = useMemo(() => {
    const total = 0,
      rating = 0;

    if (value.state !== "hasData") {
      return { total, rating };
    }

    return value.data;
  }, [value]);

  return (
    <div>
      {value.state === "loading" ? (
        <div className="h-72 bg-white flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="bg-white flex flex-col items-center justify-center p-4 gap-2">
            <div className="flex items-center gap-2 ">
              <p className="text-4xl">{rating?.toFixed(1)}</p>
              <RatingStar size={32} color="#E8BA02" />
            </div>

            <div className="text-base flex gap-2">
              <StatisticsNumber value={total || 0} suffix=" lượt đánh giá" />
            </div>
          </div>

          <div className="bg-white p-4">
            <div className="font-bold text-[#36383A] text-lg ">Tổng quan</div>

            <div className="pt-4">
              <table className="w-full">
                <thead className="">
                  <tr className="border-b-[1px] border-t-[1px] text-base text-[#36383A]">
                    <th className="w-[30%] text-left p-2 py-4">Đánh giá</th>
                    <th className="text-left p-2 py-4">Tỷ lệ</th>
                  </tr>
                </thead>

                <tbody>
                  {["5", "4", "3", "2", "1"].map((star) => {
                    const val = ratings?.[star] || 0;
                    const ratio = !total || total == 0 ? 0 : val / total;
                    return (
                      <tr key={star} className="border-b-[1px] border-t-[1px]">
                        <td className="flex flex-col gap-1 p-2 text-base">
                          <div className="flex items-center gap-1">
                            {star}
                            <RatingStar size={16} />
                          </div>
                          <StatisticsNumber value={val} />
                        </td>
                        <td className="p-2">
                          <div className="px-2 relative group">
                            <div
                              className="h-7 bg-[#006AF5] transition-all origin-left animation-scale-x rounded-sm"
                              style={{
                                width: `${ratio * 100}%`,
                                animationName: "scale-x",
                              }}
                            />
                            <div
                              className="absolute py-2 px-4 text-left 
                                    rounded-lg left-0 bottom-8 z-10 bg-[rgba(0,0,0,0.8)] invisible opacity-0 text-white group-hover:visible group-hover:opacity-[1]"
                              style={{
                                transition:
                                  " visibility 0s, opacity 0.5s linear",
                              }}
                            >
                              <p className="font-bold">
                                <span className="flex items-center gap-1">
                                  {star}
                                  <RatingStar size={16} />
                                </span>
                              </p>
                              <p>
                                Tỷ lệ:&nbsp;
                                {(ratio * 100).toFixed(2).replace(".", ",")}%
                              </p>
                              <p>Số lượng: {val.toLocaleString()}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewRating;
