import dynamic from "next/dynamic";

const AccountContent = dynamic(
  () => import("@/app/(master)/master/ui/AccountContent")
);

export const contentMasterMap = {
  "/account": AccountContent,
};
