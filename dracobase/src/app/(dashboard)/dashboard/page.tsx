"use client";
import { recentContentMap } from "@/constants/recentContentMap";
import withUserAuth from "@/hocs/withUserAuth";
export default withUserAuth(recentContentMap);
