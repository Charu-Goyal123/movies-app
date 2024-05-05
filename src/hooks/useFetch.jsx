import { useEffect, useMemo, useState } from "react";
import { fetchDataFromApi } from "../utils/api";
const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useMemo(async()=>{
        console.log(url,'this is url')
        setLoading("loading...");
        setData(null);
        setError(null);

        await fetchDataFromApi(url)
            .then((res) => {
                console.log(url,"this is from function")
                setLoading(false);
                setData(res);
            })
            .catch((err) => {
                setLoading(false);
                setError("Something went wrong!");
            });
    },[url])

    return { data, loading, error };
};

export default useFetch;