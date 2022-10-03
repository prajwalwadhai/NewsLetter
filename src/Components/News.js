import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    articles = []
    constructor(){
        super();
        console.log("Hellow this is constructor from News.js");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=c7501a3ee13240e7bca0c34a5d72974a&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
    }

    handlePrevClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=c7501a3ee13240e7bca0c34a5d72974a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles});
        this.setState({
            page : this.state.page - 1
        })
    }
    handleNextClick = async ()=>{
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
        }
        else{

            let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=c7501a3ee13240e7bca0c34a5d72974a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({articles: parsedData.articles});
            this.setState({
                page : this.state.page + 1
            })
        }
    }

  render() {
    return (
      <>
        <div className='container my-3'>
          <h1 className="text-center my-4">Top News</h1>
          <div className="row">
          {this.state.articles.map((element)=>{
            return <div className="col-md-4" key ={element.url}>
              <NewsItem title={element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,90):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
          })}
          </div>
          <div className="container d-flex justify-content-between">
          <button disabled ={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled ={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
        </div>
        
      </>
    )
  }
}

export default News