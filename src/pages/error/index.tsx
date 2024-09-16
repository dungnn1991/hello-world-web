import { PageContainer } from "@components/container";
import { Button } from "@components/customized";
import { closeMiniApp } from "@services/zalo";
import React from "react";
import useNavigate from "zmp-ui/useNavigate";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer className="min-h-screen bg-white">
      <div className="h-full flex flex-col items-center justify-center px-4">
        <p className="text-lg font-semibold text-center brea">
          Bạn cần cấp quyền để sử dụng ứng dụng Zalo Mini App Analytics
        </p>
        <div className="w-[50%] flex flex-col gap-4 my-4 !font-bold">
          <Button
            variant="secondary"
            className="w-full !bg-red-500 !text-white"
            onClick={() => closeMiniApp()}
          >
            Từ chối và thoát
          </Button>
          <Button
            className="w-full"
            onClick={() => navigate("/", { replace: true, animate: false })}
          >
            Cấp quyền
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default ErrorPage;
