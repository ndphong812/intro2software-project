import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    console.log("search", searchParams);
    const name = searchParams.get("name");

    const getSearchResponse = () => {
        const response = axios.post("http://localhost:5000/product/search", {
            name: name
        })
        console.log("response", response);
    }
    useEffect(() => {
        getSearchResponse();
    }, [])
    return (
        <div>
            Search Page
        </div>
    )
}

export default SearchPage;