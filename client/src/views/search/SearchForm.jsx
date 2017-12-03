import React from 'react'

class SearchForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showResults: false,
            submitted: false,
            input: '',
            
            forsubmit: {
                search: '' ,
                startDate: '', 
                endDate: '',
                active: {
                    brunch: true,
                    lunch: true,
                    dinner: true,
                    shopping: true,
                    music: true
                }
            }
        }

        this.submitSearchTerm = this.submitSearchTerm.bind(this)
        this.newSearch = this.newSearch.bind(this)
    }

    componentDidMount() {
    }

    onInputChange(evt) {  
        const fs = this.state.forsubmit
        this.setState({
            forsubmit: {
                search: evt.target.value, 
                startDate: fs.startDate,
                active: {
                    brunch: fs.active.brunch, 
                    lunch: fs.active.lunch, 
                    dinner: fs.active.dinner,
                    shopping: fs.active.shopping,
                    music: fs.active.music
                }
            }
        })        
    }

    onInputChangeStartDate(evt) {  
        const fs = this.state.forsubmit        
        this.setState({
            forsubmit: {
                search: fs.search, 
                startDate: evt.target.value, 
                endDate: fs.endDate, 
                active: {
                    brunch: fs.active.brunch, 
                    lunch: fs.active.lunch, 
                    dinner: fs.active.dinner,
                    shopping: fs.active.shopping,
                    music: fs.active.music
                    
                }
            }
        })        
    }

    onInputChangeEndDate(evt) {  
        const fs = this.state.forsubmit        
        this.setState({
            forsubmit: {
                search: fs.search, 
                startDate: fs.startDate, 
                endDate: evt.target.value, 
                active: {
                    brunch: fs.active.brunch, 
                    lunch: fs.active.lunch, 
                    dinner: fs.active.dinner,
                    shopping: fs.active.shopping,
                    music: fs.active.music
                    
                }
            }
        })        
    }

    checkboxBrunch(evt) {
        const fs = this.state.forsubmit
        var toggle = !fs.active.brunch
        this.setState({
            forsubmit: {
                search: fs.search, 
                startDate: fs.startDate, 
                endDate: fs.endDate, 
                active: {
                    brunch: toggle, 
                    lunch: fs.active.lunch, 
                    dinner: fs.active.dinner,
                    shopping: fs.active.shopping,
                    music: fs.active.music
                }
            }
        })
    }

    checkboxLunch(evt) {
        const fs = this.state.forsubmit 
        var toggle = !fs.active.lunch
        this.setState({
            forsubmit: {
                search: fs.search, 
                startDate: fs.startDate, 
                endDate: fs.endDate, 
                active: {
                    brunch: fs.active.brunch, 
                    lunch: toggle, 
                    dinner: fs.active.dinner,
                    shopping: fs.active.shopping,
                    music: fs.active.music
                    
                }
            }
        })
    }

    checkboxDinner(evt) {
        const fs = this.state.forsubmit 
        var toggle = !fs.active.dinner
        this.setState({
            forsubmit: {
                search: fs.search, 
                startDate: fs.startDate, 
                endDate: fs.endDate, 
                active: {
                    brunch: fs.active.brunch, 
                    lunch: fs.active.lunch, 
                    dinner: toggle,
                    shopping: fs.active.shopping,
                    music: fs.active.music
                    
                }
            }
        })
    }

    checkboxShopping(e) {
        const fs = this.state.forsubmit
        var toggle = !fs.active.shopping
        this.setState({
            forsubmit: {
                search: fs.search, 
                startDate: fs.startDate, 
                endDate: fs.endDate, 
                active: {
                    brunch: fs.active.brunch, 
                    lunch: fs.active.lunch, 
                    dinner: fs.active.dinner,
                    shopping: toggle,
                    music: fs.active.music
                    
                }
            }
        })
    }

    checkboxmusic() {
        const fs = this.state.forsubmit
        var toggle = !fs.active.music
        this.setState({
            forsubmit: {
                search: fs.search, 
                startDate: fs.startDate, 
                endDate: fs.endDate, 
                active: {
                    brunch: fs.active.brunch, 
                    lunch: fs.active.lunch, 
                    dinner: fs.active.dinner,
                    shopping: fs.active.shopping,
                    music: toggle
                    
                }
            }
        })
    }

    submitSearchTerm(evt) {
        evt.preventDefault()
        this.setState({submitted: true})
        const { onSubmit } = this.props
        onSubmit(this.state.forsubmit)
    }

    newSearch() {
        this.setState({
            submitted: false, 
            showResults: true, 
            input: '', 
            forsubmit: {
                search: '', 
                active: {
                    brunch: true, 
                    lunch: true, 
                    dinner: true,
                    shopping: true,
                    music: true
                }
            }
        })
        const {onNewSearch} = this.props
        onNewSearch(this.state.showResults)
    }

	render() {
        return (
            <div className="search-form">
                {this.state.submitted === false
                 ? (<div>
                        <div className="form-box">
                            <form  onSubmit={this.submitSearchTerm.bind(this)} >
                                <input 
                                    type="text" 
                                    name="address" 
                                    placeholder="Address or City, State, Zip" 
                                    value={this.state.forsubmit.search}
                                    onChange={this.onInputChange.bind(this)}  />
                                <div className="dates">
                                    <span className="date-label">from</span>
                                    <input 
                                        type="date" 
                                        name="startDate" 
                                        value={this.state.forsubmit.startDate}
                                        onChange={this.onInputChangeStartDate.bind(this)} />
                                    <span className="date-label">to</span>
                                    <input 
                                        type="date" 
                                        name="endDate" 
                                        value={this.state.forsubmit.endDate}
                                        onChange={this.onInputChangeEndDate.bind(this)} />
                                </div>
                                
                                <div>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="brunch" 
                                            value='' 
                                            onChange={this.checkboxBrunch.bind(this)} 
                                            defaultChecked />
                                        <label className="label-inline" htmlFor="brunch">Brunch</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="lunch" 
                                            value='' 
                                            onChange={this.checkboxLunch.bind(this)} 
                                            defaultChecked />
                                        <label className="label-inline" htmlFor="lunch">Lunch</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="dinner" 
                                            value='' 
                                            onChange={this.checkboxDinner.bind(this)} 
                                            defaultChecked />
                                        <label className="label-inline" htmlFor="dinner">Dinner</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="shopping" 
                                            value='' 
                                            onChange={this.checkboxShopping.bind(this)} 
                                            defaultChecked />
                                        <label className="label-inline" htmlFor="shopping">Shopping</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="music" 
                                            value='' 
                                            onChange={this.checkboxmusic.bind(this)} 
                                            defaultChecked />
                                        <label className="label-inline" htmlFor="music">Music</label>
                                    </span>
                                </div>
                            </form>
                        </div>
                            <button 
                                onClick={this.submitSearchTerm.bind(this)} 
                                className="button button-outline">Go
                            </button>
                    </div>)
                  : <div>
                        <div className="form-box">
                            <h2 className="location-heading">{this.state.forsubmit.search}</h2>
                        </div>
                        <button 
                            className="button button-outline" 
                            onClick={this.newSearch.bind(this)}>New Search
                        </button>
                    </div>
             
                }
                {/* <button className="button button-outline middle-button" onClick={this.saveButton.bind(this)}>Save Search</button>  */}
            </div>
            
        )
    }
}

export default SearchForm