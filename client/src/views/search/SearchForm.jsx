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
                brunch: true,
                lunch: true,
                dinner: true,
                shopping: true,
                music: true
            }
        }

        this.submitSearchTerm = this.submitSearchTerm.bind(this)
        this.newSearch = this.newSearch.bind(this)
    }

    componentDidMount() {
        console.log(this.state.forsubmit.brunch)
    }

    onInputChange(evt) {  
        const fs = this.state.forsubmit
        // this.setState({
        //     forsubmit: {
        //         search: evt.target.value, 
        //         startDate: fs.startDate,
        //         active: {
        //             brunch: fs.active.brunch, 
        //             lunch: fs.active.lunch, 
        //             dinner: fs.active.dinner,
        //             shopping: fs.active.shopping,
        //             music: fs.active.music
        //         }
        //     }
        // }) 
        this.setState({
            forsubmit: {
                ...this.state.forsubmit,
                [evt.target.name]: evt.target.value
            }
        }) 
    }

    // onInputChangeStartDate(evt) {  
    //     const fs = this.state.forsubmit        
    //     this.setState({
    //         forsubmit: {
    //             ...fs,
    //             [evt.target.name]: evt.target.value
    //         }
    //     })        
    // }

    // onInputChangeEndDate(evt) {  
    //     this.setState({
    //         forsubmit: {
    //             ...this.state.forsubmit,
    //             [evt.target.name]: evt.target.value
    //         }
    //     })        
    // }

    checkbox(evt) {
        if(evt.target.value === "true") {
            this.setState({
                forsubmit: {
                    ...this.state.forsubmit,
                    [evt.target.name]: false
                }
            })
        } else if (evt.target.value === "false") {
            this.setState({
                forsubmit: {
                    ...this.state.forsubmit,
                    [evt.target.name]: true
                }
            })
        }
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
                brunch: true, 
                lunch: true, 
                dinner: true,
                shopping: true,
                music: true
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
                                    name="search" 
                                    placeholder="Address or City, State, Zip" 
                                    value={this.state.forsubmit.search}
                                    onChange={this.onInputChange.bind(this)}  />
                                <div className="dates">
                                    <span className="date-label">from</span>
                                    <input 
                                        type="date" 
                                        name="startDate" 
                                        value={this.state.forsubmit.startDate}
                                        onChange={this.onInputChange.bind(this)} />
                                    <span className="date-label">to</span>
                                    <input 
                                        type="date" 
                                        name="endDate" 
                                        value={this.state.forsubmit.endDate}
                                        onChange={this.onInputChange.bind(this)} />
                                </div>
                                
                                <div>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="brunch" 
                                            value={this.state.forsubmit.brunch}
                                            onChange={this.checkbox.bind(this)} 
                                            defaultChecked />
                                        <label className="label-inline" htmlFor="brunch">Brunch</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="lunch" 
                                            value={this.state.forsubmit.lunch}
                                            onChange={this.checkbox.bind(this)} 
                                            defaultChecked />
                                        <label className="label-inline" htmlFor="lunch">Lunch</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="dinner" 
                                            value={this.state.forsubmit.dinner}
                                            onChange={this.checkbox.bind(this)} 
                                            defaultChecked />
                                        <label className="label-inline" htmlFor="dinner">Dinner</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="shopping" 
                                            value={this.state.forsubmit.shopping}
                                            onChange={this.checkbox.bind(this)} 
                                            defaultChecked />
                                        <label className="label-inline" htmlFor="shopping">Shopping</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="music" 
                                            value={this.state.forsubmit.music}
                                            onChange={this.checkbox.bind(this)} 
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