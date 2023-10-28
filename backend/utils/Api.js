class Api {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryStringCopy = { ...this.queryString };

    //* remove all the query params that shouldn't be there in the filter
    const extraQueryParams = ["keyword", "page", "limit"];

    extraQueryParams.forEach(
      (extraQueryParam) => delete queryStringCopy[extraQueryParam]
    );

    //* filter for range values
    let queryStr = JSON.stringify(queryStringCopy);
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultsPerPage) {
    const currentPage = +this.queryString.page || 1;
    this.query = this.query
      .skip(resultsPerPage * (currentPage - 1))
      .limit(resultsPerPage);
    return this;
  }
}

module.exports = Api;
