export const formatTZDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
}

export const generateQueryString = (
    pageSize="", 
    tags:string[]=[],
    search="",
    page=""
    ) => {
    const queryTerms:string[] = [];
    if (pageSize) {
        queryTerms.push(`pagesize=${pageSize}`);
    }
    if (tags.length > 0) {
        queryTerms.push("tags="+tags.join(','));
    }
    if (search) {
        queryTerms.push(`search=${search}`);
    }
    if (page) {
        queryTerms.push(`page=${page}`)
    }
    if (queryTerms.length > 0) {
        return "?" + queryTerms.join('&')
    } else {
        return ""
    }
}