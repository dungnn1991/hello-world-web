import { PageContainer } from "@components/container";
import { Button } from "@components/customized";
import React from "react";
import useNavigate from "zmp-ui/useNavigate";

const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer className="bg-white min-h-screen">
      <div className="h-full flex flex-col justify-center p-4 items-center gap-4">
        <p className="font-semibold">Bạn không có quyền truy cập trang này!</p>

        <Button
          onClick={() => navigate("/", { replace: true, animate: false })}
          size="medium"
        >
          Trang chủ
        </Button>
      </div>
    </PageContainer>
  );
};

export default ForbiddenPage;
