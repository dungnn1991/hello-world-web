import Pagination from "@components/Pagination";
import { Option, Select } from "@components/customized/Select";
import { Loading, RatingStar } from "@components/icons/Icon";
import { RatingFilter } from "@dts";
import { loadableRatingTable, ratingTableFilterState } from "@stores/state";
import classNames from "classnames";
import { useAtom } from "jotai";
import React, { useCallback, useMemo, useState } from "react";
import Checkbox from "zmp-ui/checkbox";

const TableRating: React.FC = () => {
  const [filter, setFilter] = useAtom(ratingTableFilterState);

  const [value] = useAtom(loadableRatingTable);

  const [total, setTotal] = useState(0);

  const setFilterForField = useCallback(
    (newFilter: RatingFilter) => {
      setFilter({ ...filter, ...newFilter });
    },
    [filter]
  );

  const onPageChange = useCallback(
    (page: number) => {
      setFilterForField({ page });
    },
    [setFilterForField]
  );

  const renderTable = useMemo(() => {
    if (value.state === "loading") {
      return (
        <tr className="">
          <td colSpan={2} className="h-96  text-center">
            <div className="h-full flex items-center justify-center w-full">
              <Loading />
            </div>
          </td>
        </tr>
      );
    }

    if (value.state !== "hasData" || value.data?.total === 0) {
      return (
        <tr>
          <td colSpan={2} className="h-72 text-center">
            Chưa có đánh giá
          </td>
        </tr>
      );
    }
    const { data, total = 0 } = value.data;

    setTotal(total);
    return data?.map((item) => (
      <tr key={item.id} className="border-b-[1px] border-t-[1px] ">
        <td className="p-2 text-base">
          <div className="flex flex-col gap-1.5">
            <p className="line-clamp-1">{item.name}</p>
            <div className="flex gap-1 items-center">
              {item.rating}
              <RatingStar size={16} />
            </div>
          </div>
        </td>
        <td className="p-2">
          <p className="line-clamp-5 break-words">{item.comment}</p>
        </td>
      </tr>
    ));
  }, [value]);

  const onChangeSort = useCallback(
    (value: string) => {
      const splits = value.split("-");
      const fieldSort = splits[0];
      const sort = splits[1];
      setFilterForField({ fieldSort, sort, page: 0, star: 0 });
    },
    [setFilterForField]
  );

  return (
    <div className="bg-white p-2 flex gap-4 flex-col">
      <div className="font-bold text-[#36383A] text-lg">Tất cả đánh giá</div>

      <div className="flex gap-2 justify-between md:justify-start md:gap-4">
        {[5, 4, 3, 2, 1].map((star) => (
          <div
            key={`star=${star}`}
            className={classNames(
              "cursor-pointer text-base flex gap-2 items-center rounded-lg border p-2 py-1.5",
              { "bg-[#E9EBED]": star === filter.star }
            )}
            onClick={() => {
              const newStar = star === filter.star ? 0 : star;
              setFilterForField({ star: newStar, page: 0 });
            }}
          >
            {star} <RatingStar size={24} />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <Select
            label="Sắp xếp theo"
            defaultValue={"CREATED_AT-DESC"}
            closeOnSelect
            onChange={onChangeSort}
          >
            <Option value={"CREATED_AT-DESC"} title="Gần đây nhất" />
            <Option value={"VALUE-DESC"} title="Từ cao đến thấp" />
            <Option value={"VALUE-ASC"} title="Từ thấp đến cao" />
          </Select>
        </div>
      </div>

      <div className="text-base">
        <Checkbox
          label="Đánh giá có review"
          value={1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const hasReview = e.target.checked ? true : undefined;
            setFilterForField({ hasReview, page: 0 });
          }}
        />
      </div>

      <div className="">
        <table className="table-fixed w-full">
          <thead className="">
            <tr className="border-b-[1px] border-t-[1px] text-base text-[#36383A]">
              <th className="w-[45%] text-left p-2 py-4">Đánh giá</th>
              <th className="w-[55%] text-left p-2 py-4">Review</th>
            </tr>
          </thead>

          <tbody>{renderTable}</tbody>
        </table>

        <Pagination
          totalCount={total}
          pageSize={filter.pageSize || 5}
          currentPage={filter.page || 0}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default TableRating;
