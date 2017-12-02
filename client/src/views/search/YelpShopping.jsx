import React from 'react'
import axios from 'axios'


class YelpShopping extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ready: false,
            color: '',
            results: {
                yelpShopping: {head: "", list: []}
            }
        }        
    }

    componentDidMount() {
        if(this.props.showResults) {
          this.yelpShoppingRequest()  
        } 
    }
    
    componentWillReceiveProps() {
        console.log('props: ' + this.props.showResults)
        if(this.props.showResults) {
            this.setState({results:{yelpShopping:{head:'', list: []}}})
        }
    }

    yelpShoppingRequest() {
        axios({method: 'get', url: `/api/search/yelp?term=shopping&location=${this.props.search}`})                                                 // Run an axios request to the Yelp API for "restaurants" with the location set to whatever was typed in the search bar
        .then((res) => { 
            if(res.data.fullType === "rest-call.response-filters.unhandled-status") {                                                                   // Then, if there is an error, throw an error
                throw new Error("error")
            } else {
                this.setState({results: {
                    yelpShopping: {
                        list: res.data, 
                        head: "Shopping"
                    }
                }})                                                                                          // If there is not an error, store the restaurant data in the state to be rendered
            }
        })
        .then(res => {
            this.randomizeColor()
        })
        .catch(e => {
            this.setState({error: true});                                                                                                               // If there's an error, set this.state.error to true, so the "Coming soon..." message appears
        })
    }

    randomizeColor() {
        var x = Math.floor(Math.random() * 3)
        this.setState({color: x})
    }

	render() {
        return (
            <span className="search-results">
                {!this.state.error
                ? (<span>
                        {this.state.results.yelpShopping.head !== ''
                        ? (<div className="search-category">
                            <h3>{this.state.results.yelpShopping.head}</h3>
                        </div>)
                        : null}
                        
                        {this.state.results.yelpShopping.list.slice(0, 7).map(el => {
                            return (
                                <div key={el.id} className="card-2">
                                    <img className="card-img-2 object-fit_cover" src={el.image_url} alt="" />
                                    <div className={`card-overlay-${this.state.color}`}> 
                                        <div className={`card-title-${this.state.color}`}><a href={el.url} target="_blank">{el.name}</a></div>
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
                  </span>)
                : (<span>
                    <div className="search-category">
                        <h3>Shopping <br /> Coming Soon</h3>
                    </div>
                </span>)
                }
                        
                
            </span>
            
            
        )
    }
}

export default YelpShopping