import dynamic from "next/dynamic";

const AccountContent = dynamic(
  () => import("@/app/(master)/master/ui/AccountContent")
);
const ProgrammingContent = dynamic(
  () => import("@/app/(master)/master/ui/ProgrammingContent")
);

export const contentMasterMap = {
  "/account": <AccountContent />,
  "/programming": <ProgrammingContent />,
};
