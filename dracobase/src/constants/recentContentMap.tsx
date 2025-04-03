import dynamic from "next/dynamic";

const RecentContent = dynamic(
  () => import("@/app/(dashboard)/dashboard/ui/RecentContent")
);

const RecentMaster = dynamic(
  () => import("@/app/(master)/master/ui/RecentMaster")
);

export const recentContentMap = {
  "/dashboard": RecentContent,
  "/master": RecentMaster,
};
