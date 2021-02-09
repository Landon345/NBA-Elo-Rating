export const areAnyLoading = (...queries: any) =>
  queries.some(({ status }: any) => status === "loading");
export const areAnyFailed = (...queries: any) =>
  queries.some(({ error }: any) => !!error);
export const areAllLoaded = (...queries: any) =>
  queries.every(
    ({ status, error, data }: any) => status === "success" && !error && !!data
  );
