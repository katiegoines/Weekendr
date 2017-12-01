import React from 'react'
import axios from 'axios'


class YelpRestaurants extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ready: false,
            results: {
                yelpRestaurants: {head: "", list: []}
            }
        }        
    }

    componentDidMount() {
        if(this.props.run === true) {
          this.yelpRestaurantRequest()  
        }
        console.log(this.props)
    }

    yelpRestaurantRequest() {
        // console.log(this.props.search)
        axios({method: 'get', url: `/api/search/yelp?term=restaurants&location=${this.props.search}`})                                                 // Run an axios request to the Yelp API for "restaurants" with the location set to whatever was typed in the search bar
        .then((res) => { 
            if(res.data.fullType === "rest-call.response-filters.unhandled-status") {                                                                   // Then, if there is an error, throw an error
                throw new Error("error")
            } else {
                this.setState({results: {
                    yelpRestaurants: {
                        list: res.data, 
                        head: "Restaurants"
                    }
                }})                                                                                          // If there is not an error, store the restaurant data in the state to be rendered
            }
        })
        .then((res) => {
            console.log(this.state.yelpRestaurants)
            const results = this.state.results.yelpRestaurants
            const yrResults = this.props.yrResults
            yrResults(results)
        })
        .catch(e => {
            this.setState({error: true});                                                                                                               // If there's an error, set this.state.error to true, so the "Coming soon..." message appears
        })
    }

	render() {
        return (
            <div className="search-results">
                <div className="search-category">
                    <h3>{this.state.results.yelpRestaurants.head}</h3>
                </div>
                {this.state.results.yelpRestaurants.list.slice(0, 7).map(el => {
                    return (
                        <div key={el.id} className="card-2">
                            <img className="card-img-2 object-fit_cover" src={el.image_url} alt="" />
                            <div className="card-overlay"> 
                                <div className="card-title"><a href={el.url} target="_blank">{el.name}</a></div>
                                <div className="card-info">
                                    <div className="yelp-categories">{el.categories.map((cat, i)=> {
                                        return (
                                            <span key={i}>{` - ${cat.title} - `}</span>
                                        )
                                    })}</div>
                                    <div className="body-text">
                                        <div>{el.location.address1}</div>
                                        <div>{el.location.city}</div>
                                        <div>{`${(el.distance * 0.000621371192).toFixed(2)}mi away`}</div>
                                        <div>{`Price: ${el.price}`}</div>
                                        <div>{`Rating: ${el.rating} (${el.review_count} reviews)`}</div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            
            
        )
    }
}

export default YelpRestaurants