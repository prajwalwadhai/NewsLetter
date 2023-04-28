import React , {useEffect , useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // constructor(props){          // while using the constructor, super() is always use
    //     super(props);
    //     console.log("Hellow this is constructor from News.js");
    // }

    const  updateNews= async() => {
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true)
        let data = await fetch(url);
      props.setProgress(30);
        let parsedData = await data.json();
      props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.setTotalResults);
        setLoading(false);
      props.setProgress(100);

    }

    useEffect(() => {
      document.title = `${capitalizeFirstLetter(props.category)} - NewsLetter`;
      updateNews();
      // eslint-disable-next-line
    }, [])

    // const handlePrevClick = async ()=>{
    //     setPage(page - 1)
    //     updateNews();
    // }
    // const handleNextClick = async ()=>{
    //     setPage(page + 1)
    //     updateNews();
    // }
    
    const fetchMoreData = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page + 1);    // kiv ki ye async fuction hai to vo time laga raha hai setPage hone me to isliye pehle manualy page update karrenge our fir barme setPage ki help se page update karenge
      // setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };

    return (
      <>
          <h1 className="text-center " style= {{margin : '25px 0px', marginTop:'30px'}}>NewsLetter - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
          <div className="container ">
              {loading && <Spinner/>}
          </div>

          {/* InfiniteScroll Fuction */}
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
          >

          <div className="container">
          <div className="row">
              {articles.map((element)=>{
                return <div className="col-md-4" key ={element.url}>
                  <NewsItem title={element.title?element.title.slice(0,55):""} description = {element.description?element.description.slice(0,100):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
              })}
          </div>
          </div>

          </InfiniteScroll>

          {/* <div className="container d-flex justify-content-between my-3">
          <button disabled ={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled ={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
        
      </>
    )
}

News.defaultProps = {
  country: "in",
  pageSize : 11,
  category: 'general'
}
News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News