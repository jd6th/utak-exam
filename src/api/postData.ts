// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const useDataApi = (url: string) => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveData = async (body: any) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      return {data: result}
    } catch (err) {
        return {error: "something went wrong..."}
    }
  };

  return {saveData };
};

export default useDataApi;
