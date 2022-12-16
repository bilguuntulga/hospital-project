import React from "react";

export default (fetcher, data, options = {}) => (init = {}) => {
  const [result, setResult] = React.useState(init);
  const [loading, setLoading] = React.useState(true);

  const reload = React.useCallback(
    async (signal) => {
      try {
        setLoading(true);
        let res = await fetcher(data, { ...options, signal });
        setResult(res);
        setLoading(false);
      } catch (err) {
        setResult(init);
        setLoading(false);

        throw err;
      }
    },
    [fetcher, options]
  );

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    reload(signal);

    return () => abortController.abort();
  }, [data]);

  const trigger= () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    reload(signal);

    return () => abortController.abort();
  };

  return [result, loading, (value) => {
    setResult(value);
  }, trigger];
};
