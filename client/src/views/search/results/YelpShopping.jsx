import React from 'react'
import axios from 'axios'


class YelpShopping extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ready: false,
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
        if(this.props.showResults) {
            this.setState({results:{yelpShopping:{head:'', list: []}}})
        }
    }

    yelpShoppingRequest() {
        axios({method: 'get', url: `/api/search/yelp?term=shopping&location=${this.props.search}`})
        .then((res) => { 
            if(res.data.fullType === "rest-call.response-filters.unhandled-status") {
                throw new Error("error")
            } else {
                this.setState({results: {
                    yelpShopping: {
                        list: res.data, 
                        head: "Shopping"
                    }
                }})
            }
        })
        .then(res => {
            this.randomizeColor()
        })
        .catch(e => {
            this.setState({error: true});
        })
    }

    randomizeColor() {
        var x = Math.floor(Math.random() * 4)
        this.color = x
        return x
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
                        
                        {this.state.results.yelpShopping.list.slice(0, this.props.quantity).map(el => {
                            return (
                                <div key={el.id} className="card-2">
                                    <img className={`card-img-${this.randomizeColor()}`} src={el.image_url} alt="" />
                                    <div className={el.image !== null ? `card-overlay-${this.color}` : `card-overlay-${this.randomizeColor()}`}>
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