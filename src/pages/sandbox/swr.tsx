import { Box, CircularProgress } from "@mui/material";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { fetcher } from "@/common/fetcher";
import { Layout } from "@/components/layout/Layout";

const Swr: NextPage = () => {
  const [db, setDb] = useState("asdfg");
  const { data, isLoading, isValidating } = useSWR("/api/swrTest", fetcher, {
    fallbackData: "initial",
    refreshInterval: 10000,
  });
  useEffect(() => {
    setDb(data.key);
  }, [data]);

  const key = data?.key;

  // TODO: muiを撤去
  return (
    <Layout>
      <Box mb={8}>
        <p>現在のstateのデータ: {db}</p>
      </Box>
      <Box mb={4} sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Box>SWRで取得したデータ: </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {isLoading ? <div></div> : <div>{key}</div>}
          {!isLoading && isValidating && <CircularProgress />}
        </Box>
      </Box>
      <p>
        refreshIntervalを 10000 に設定しているため、10秒に一度データ取得を行う
        <br />
        データ取得中（isLoadingがtrue）の間は、ローディングスピナーを表示する
        <br />
        （API側で、レスポンスまで3秒かかるように設定しています）
      </p>
    </Layout>
  );
};

export default Swr;
